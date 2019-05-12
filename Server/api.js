var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var canvas = document.getElementById('canvas');

if (!document.game) {
    document.game = {};
}

document.game.api = {
    baseStructures: {
        canvas: canvas,
        context: canvas.getContext('2d'),
        liveObjects: [],
    },
    instantiate: function (prefabStr, parent) {
        var prefab = JSON.parse(prefabStr);

        function setParent(go, parent) {
            go.parent = parent;
            for (var i = 0; i < go.children; ++i) {
                setParent(go.children[i], go);
            }
        }

        function copyParam(p) {
            var res = {
                name: p.name,
                type: p.type,
            };
            if (p.type === 'array') {
                p.value = [];
                res.defaultElement = copyParam(p.defaultElement);
                for (var i = 0; i < p.value.length; ++i) {
                    res.value.push(copyParam(p.value[i]));
                }
                return res;
            }
            if (p.type === 'custom') {
                res.value = {};
                for (var prop in p.value) {
                    res.value[prop] = copyParam(p.value[prop]);
                }
                return res;
            }
            res.value = p.value;
            return res;
        }

        function updateParams(fromScript, fromData) {
            for (var p in fromData) {
                if (!fromScript[p]) {
                    continue;
                }

                var script = fromScript[p];
                var data = fromData[p];

                if (script.type !== data.type) {
                    continue;
                }

                if (data.type === 'array' && data.defaultElement.type === script.defaultElement.type) {
                    script.value = [];
                    for (var i = 0; i < data.value.length; ++i) {
                        var elem = copyParam(script.defaultElement);
                        updateParams(elem, data.value[i]);
                        script.value.push(elem);
                    }
                    return;
                }
                if (data.type === 'custom') {
                    for (var prop in data.value) {
                        if (script.value[prop]) {
                            updateParams(script.value[prop], data.value[prop]);
                        }
                    }
                    return;
                }

                script.value = data.value;
            }
        }
        var scripts = document.game.scripts;

        function setComponents(go) {
            for (var i = 0; i < go.components.length; ++i) {
                var params = go.components[i].instance.params;
                go.components[i].instance = scripts[go.components[i].script].createInstance();
                updateParams(go.components[i].instance.params, params);
                go.components[i].instance.gameObject = go;
            }
            for (var i = 0; i < go.children.length; ++i) {
                setComponents(go.children[i]);
            }
        }

        function searchGO(go, id) {
            if (go.id === id) {
                return go;
            }
            for (var i = 0; i < go.children.length; ++i) {
                var res = searchGO(go.children[i], id);
                if (res) {
                    return res;
                }
            }
        }

        function setGOParams(params) {
            for (var p in params) {
                var cur = params[p];
                if (cur.type === 'gameObject') {
                    cur.gameObjectRef = searchGO(data, cur.value);
                    continue;
                }
                if (cur.type === 'array') {
                    for (var i = 0; i < cur.value.length; ++i) {
                        setGOParams(cur.value[i]);
                    }
                    continue;
                }
                if (cur.type === 'custom') {
                    for (var subParam in cur.value) {
                        var sp = cur.value[subParam];
                        setGOParams(sp);
                    }
                }
            }
        }

        function processComponents(go) {
            setComponents(go);
            for (var i = 0; i < go.components.length; ++i) {
                setGOParams(go.components[i].instance.params);
            }

            for (var i = 0; i < go.children.length; ++i) {
                processComponents(go.children[i]);
            }
        }

        setParent(prefab, parent);
        processComponents(prefab);

        if (parent) {
            parent.children.push(prefab);
        }
        else {
            document.game.api.baseStructures.liveObjects.push(prefab);
        }

        function executeStart(go) {
            function getComponents(gameObject) {
                if (gameObject.children.length === 0) {
                    return gameObject.components;
                }

                var res = [];
                res = res.concat(gameObject.components);
                for (var i = 0; i < gameObject.children.length; ++i) {
                    res = res.concat(getComponents(gameObject.children[i]));
                }
                return res;
            }
            
            var components = getComponents(go);

            for (var i = 0; i < components.length; ++i) {
                var cur = components[i];
                if (cur.instance.start) {
                    cur.instance.start();
                }
            }
        }
        executeStart(prefab);
    },
    lastTick: undefined,
    lastFrame: 0,
    startGame: function () {
        var game = document.game;
        var prefab = game.library[game.gameSettings.scriptableObject.component.instance.params.initialPrefab.value];
        document.game.api.instantiate(prefab.prefabStr);

        var d = new Date();
        document.game.api.lastTick = d.getTime();
        document.game.api.lastFrame = -1;

        document.game.api.gameLoop();
    },
    getComponent: function (go, componentName) {
        for (var i = 0; i < go.components.length; ++i) {
            if (go.components[i].instance.name === componentName) {
                return go.components[i].instance;
            }
        }
    },
    render: function () {
        function render(go) {
            function loadImage(id) {
                var img = new Image();
                img.src = document.game.library[id].path;
                img.onload = function () {
                    document.game.library[id].image = img;
                };
            }

            var imageComponent = document.game.api.getComponent(go, 'Image');
            if (imageComponent) {
                var fileId = imageComponent.params.image.value;

                if (!document.game.library[fileId].image) {
                    loadImage(fileId);
                    return;
                }

                var pos = { x: 0, y: 0, z: 0 };
                var transformComponent = document.game.api.getComponent(go, 'Transform');
                if (transformComponent) {
                    pos = transformComponent.getWorldPosition();
                }
                var image = document.game.library[fileId].image;
                ctx.drawImage(image, pos.x, pos.y, 100, 100);
            }

            for (var i = 0; i < go.children.length; ++i) {
                render(go.children[i]);
            }
        }

        for (var i = 0; i < document.game.api.baseStructures.liveObjects.length; ++i) {
            render(document.game.api.baseStructures.liveObjects[i]);
        }
    },
    gameLoop: function () {
        function getComponents(gameObject) {
            if (gameObject.children.length === 0) {
                return gameObject.components;
            }

            var res = [];
            res = res.concat(gameObject.components);
            for (var i = 0; i < gameObject.children.length; ++i) {
                res = res.concat(getComponents(gameObject.children[i]));
            }
            return res;
        }

        document.game.api.render();

        var liveObjects = document.game.api.baseStructures.liveObjects;
        var components = [];
        for (var i = 0; i < liveObjects.length; ++i) {
            components = components.concat(getComponents(liveObjects[i]));
        }

        var date = new Date();
        var time = date.getTime();
        var dt = time - document.game.api.lastTick;
        document.game.api.lastTick = time;
        ++document.game.api.lastFrame;


        for (var i = 0; i < components.length; ++i) {
            if (components[i].instance.update) {
                components[i].instance.update(dt);
            }
        }

        setTimeout(document.game.api.gameLoop);
    }
};
