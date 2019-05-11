var data = {};
var scripts = {};
var module = {};

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var gameHierarchy = [];

function getComponent(go, componentName) {
    for (var i = 0; i < go.components.length; ++i) {
        if (go.components[i].instance.name === componentName) {
            return go.components[i].instance;
        }
    }
}

function render(go) {
    var imageComponent = getComponent(go, 'Image');
    if (imageComponent) {
        var fileId = imageComponent.params.image.value;
        function loadImage(id) {
            var img = new Image();
            img.src = data[id].path;
            img.onload = function() {
                data[id].image = img;
            };
        }
        if (!data[fileId].image) {
            loadImage(fileId);
            return;
        }
        
        var pos = {x: 0, y: 0, z: 0};
        var transformComponent = getComponent(go, 'Transform');
        if (transformComponent) {
            pos = transformComponent.getWorldPosition();
        }
        var image = data[fileId].image;
        ctx.drawImage(image, pos.x, pos.y, 100, 100);
    }

    for (var i = 0; i < go.children.length; ++i) {
        render(go.children[i]);
    }
}

function gameTick() {
    function update(go) {
        for (var i = 0; i < go.components.length; ++i) {
            var cur = go.components[i].instance;
            if (cur.update) {
                cur.update();
            }
        }
        for (var i = 0; i < go.children.length; ++i) {
            update(go.children[i]);
        }
    }
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < gameHierarchy.length; ++i) {
        render(gameHierarchy[i]);
    }
    for (var i = 0; i < gameHierarchy.length; ++i) {
        update(gameHierarchy[i]);
    }
    setTimeout(gameTick);
}

function startGame() {
    console.log('Start Game');

    var fe;
    for (var i in data) {
        var fe = data[i];
        var path = fe.path;
        var name = path.split('\\');
        name = name[name.length - 1];
        var ext = name.split('.');
        if (ext.length === 1) {
            continue;
        }
        ext = ext[1];

        if (ext === 'prefab') {
            break;
        }
    }
    loadJSON(fe.path, function (data) {
        console.log(data);

        data = JSON.parse(data);


        function setParent(go, parent) {
            go.parent = parent;
            for (var i = 0; i < go.children; ++i) {
                setParent(go.children[i], go);
            }
        }

        setParent(data, undefined);

        function setComponents(go) {
            for (var i = 0; i < go.components.length; ++i) {
                var params = go.components[i].instance.params;
                go.components[i].instance = scripts[go.components[i].script].createInstance();
                go.components[i].instance.params = params;
                go.components[i].instance.gameObject = go;
            }
            for (var i = 0; i < go.children.length; ++i) {
                setComponents(go.children[i]);
            }
        }

        setComponents(data);

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
                    cur.value = searchGO(data, cur.value);
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

        function setComponentsGOParams(go) {
            for (var i = 0; i < go.components.length; ++i) {
                setGOParams(go.components[i].instance.params);
            }
            for (var i = 0; i < go.children.length; ++i) {
                setComponentsGOParams(go.children[i]);
            }
        }

        setComponentsGOParams(data);

        gameHierarchy.push(data);

        gameTick();
    });
}

function onLoadLibrary(lib) {
    lib = JSON.parse(lib);
    data = lib;

    var indeces = [];

    for (var fe in lib) {
        var fe = lib[fe];
        var name = fe.path.split('\\');
        name = name[name.length - 1];
        var ext = name.split('.');
        if (ext.length === 1) {
            continue;
        }
        if (ext[1] === 'js') {
            indeces.push(fe.id);
        }
    }

    var index = 0;
    function load() {
        if (index == indeces.length) {
            startGame();
            return;
        }

        var script = document.createElement('script');
        script.setAttribute('src', lib[indeces[index]].path);
        document.body.appendChild(script);
        script.addEventListener('load', function () {
            scripts[indeces[index]] = module.exports;
            ++index;
            load();
        });
    }
    load();
}

function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

loadJSON('library.json', onLoadLibrary);