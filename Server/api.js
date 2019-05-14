var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var canvas = document.getElementById('canvas');

if (!document.game) {
    document.game = {};
}

if (!document.game.api) {
    document.game.api = {};
}

document.game.api.baseStructures = {
    canvas: canvas,
    context: canvas.getContext('2d'),
    liveObjects: [],
};
document.game.api.instantiate = function (prefabStr, parent) {
    var prefab = JSON.parse(prefabStr);

    function setParent(go, parent) {
        go.parent = parent;
        for (var i = 0; i < go.children.length; ++i) {
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
            go.components[i].instance = document.game.api.createInstance(scripts[go.components[i].script]);
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
    console.log(prefab.children[0].parent);
};

document.game.api.lastTick = undefined;
document.game.api.lastFrame = 0;
document.game.api.startGame = function () {
    var game = document.game;
    var prefab = game.library[game.gameSettings.scriptableObject.component.instance.params.initialPrefab.value];
    document.game.api.instantiate(prefab.prefabStr);

    var d = new Date();
    document.game.api.lastTick = d.getTime();
    document.game.api.lastFrame = -1;

    document.game.api.gameLoop();
};
document.game.api.getComponent = function (go, componentName) {
    for (var i = 0; i < go.components.length; ++i) {
        if (go.components[i].instance.name === componentName) {
            return go.components[i].instance;
        }
    }
};

document.game.api.render = function () {
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

            imageComponent.interface.render(imageComponent);
        }

        for (var i = 0; i < go.children.length; ++i) {
            render(go.children[i]);
        }
    }

    for (var i = 0; i < document.game.api.baseStructures.liveObjects.length; ++i) {
        render(document.game.api.baseStructures.liveObjects[i]);
    }
};

document.game.api.gameLoop = function () {
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
};

document.game.api.require = function (path) {
    var lib = document.game.library;
    for (var feId in lib) {
        if (lib[feId].path === path) {
            return document.game.scripts[feId];
        }
    }
};

document.game.api.createInstance = function (script) {
    if (!script.extendsFrom) {
        return script.createInstance();
    }
    var baseScript = document.game.api.require(script.extendsFrom);
    var baseInstance = document.game.api.createInstance(baseScript);
    var instance = script.createInstance();

    //baseInstance.name = instance.name;

    for (var p in instance.params) {
        baseInstance.params[p] = instance.params[p];
    }
    for (var m in instance.interface) {
        baseInstance.interface[m] = instance.interface[m];
    }
    baseInstance.name = instance.name;
    return baseInstance;
};