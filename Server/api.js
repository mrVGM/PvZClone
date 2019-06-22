var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var canvas = document.getElementById('canvas');

var frameMinDT = 16;

game.api.baseStructures = {
    canvas: canvas,
    context: canvas.getContext('2d'),
    liveObjects: [],
    saveGame: {
        levelCompleted: 0
    },
};

game.api.updateParams = function (fromScript, fromData) {
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

    function updateSingleParam(fromScript, fromData) {
        if (fromData.type !== fromData.type)
            return;

        if (fromData.type === 'array') {
            fromScript.value = [];
            for (var i = 0; i < fromData.value.length; ++i) {
                var elem = copyParam(fromScript.defaultElement);
                updateSingleParam(elem, fromData.value[i]);
                elem.name = fromData.value[i].name;
                fromScript.value.push(elem);
            }
            return;
        }

        if (fromData.type === 'custom') {
            game.api.updateParams(fromScript.value, fromData.value);
            return;
        }

        fromScript.value = fromData.value;
    }

    for (var p in fromData) {
        if (!fromScript[p]) {
            continue;
        }

        updateSingleParam(fromScript[p], fromData[p]);
    }
};

game.api.destroy = function(go) {
    function callOnDestroy(go) {
        for (var i = 0; i < go.components.length; ++i) {
            if (go.components[i].instance.interface.onDestroy) {
                go.components[i].instance.interface.onDestroy(go.components[i].instance);
            }
        }
        for (var i = 0; i < go.children.length; ++i) {
            callOnDestroy(go.children[i]);
        }
    }

    callOnDestroy(go);

    var arrToExcludeFrom = game.api.baseStructures.liveObjects;
    if (go.parent) {
        arrToExcludeFrom = go.parent.children;
    }
    var index = -1;
    for (var i = 0; i < arrToExcludeFrom.length; ++i) {
        var curObj = arrToExcludeFrom[i];
        if (curObj.id === go.id) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        arrToExcludeFrom.splice(index, 1);
    }
};

game.api.destroyAllLiveObjects = function() {
    var liveObjects = [].concat(game.api.baseStructures.liveObjects);
    for (var i = 0; i < liveObjects.length; ++i) {
        game.api.destroy(liveObjects[i]);
    }
};

game.api.guid = 1;
game.api.getGuid = function() {
    return game.api.guid++;
}

game.api.instantiate = function (prefabStr, parent) {
    var prefab = JSON.parse(prefabStr);

    function setParent(go, parent) {
        go.parent = parent;
        for (var i = 0; i < go.children.length; ++i) {
            setParent(go.children[i], go);
        }
    }

    var scripts = game.scripts;

    function setComponents(go) {
        for (var i = 0; i < go.components.length; ++i) {
            var params = go.components[i].instance.params;
            go.components[i].instance = game.api.createInstance(scripts[go.components[i].script]);
            game.api.updateParams(go.components[i].instance.params, params);
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

    function setGOParam(param) {
        if (param.type === 'gameObject') {
            param.gameObjectRef = searchGO(prefab, param.value);
            return;
        }
        if (param.type === 'array') {
            for (var i = 0; i < param.value.length; ++i) {
                setGOParam(param.value[i]);
            }
            return;
        }
        if (param.type === 'custom') {
            setGOParams(param.value);
        }
    }

    function setGOParams(params) {
        for (var p in params) {
            setGOParam(params[p]);
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

    function setUniqueIds(go) {
        go.id = game.api.getGuid();
        for (var i = 0; i < go.children.length; ++i) {
            setUniqueIds(go.children[i]);
        }
    }

    setUniqueIds(prefab);
    
    if (parent) {
        parent.children.push(prefab);
    }
    else {
        game.api.baseStructures.liveObjects.push(prefab);
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
            if (cur.instance.interface.start) {
                cur.instance.interface.start(cur.instance);
            }
        }
    }
    executeStart(prefab);
    return prefab;
};

game.api.lastTick = undefined;
game.api.lastFrame = 0;
game.api.startGame = function () {
    var prefab = game.library[game.gameSettings.scriptableObject.component.instance.params.initialPrefab.value];
    game.api.instantiate(prefab.prefabStr);

    var d = new Date();
    game.api.lastTick = d.getTime();
    game.api.lastFrame = -1;

    game.api.gameLoop();
};
game.api.getComponent = function (go, component) {
    function assignable(fromId, toId) {
        if (fromId === toId)
            return true;

        var script = game.scripts[fromId];
        if (!script.extendsFrom)
            return false;

        var base = game.api.require(script.extendsFrom);
        return assignable(base.id, toId);
    }

    for (var i = 0; i < go.components.length; ++i) {
        if (assignable(go.components[i].script, component.id)) {
            return go.components[i].instance;
        }
    }
};

game.api.render = function () {
    game.api.renderGameObjects.render(game.api.baseStructures.liveObjects);
};

game.api.gameLoop = function () {
    var frameStart = (new Date()).getTime();

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

    game.api.render();

    var liveObjects = game.api.baseStructures.liveObjects;
    var components = [];
    for (var i = 0; i < liveObjects.length; ++i) {
        components = components.concat(getComponents(liveObjects[i]));
    }

    var date = new Date();
    var time = date.getTime();
    var dt = time - game.api.lastTick;
    game.api.lastTick = time;
    ++game.api.lastFrame;

    for (var i = 0; i < components.length; ++i) {
        if (components[i].instance.interface.update) {
            components[i].instance.interface.update(components[i].instance, dt);
        }
    }

    var frameDuration = (new Date()).getTime() - frameStart;
    var timeOut = 0;
    if (frameDuration < frameMinDT) {
        timeOut = frameMinDT - frameDuration;
    }
    setTimeout(game.api.gameLoop, timeOut);

    game.inputEvents = [];
};

game.api.require = function (path) {
    var lib = game.library;
    for (var feId in lib) {
        if (lib[feId].path === path) {
            return game.scripts[feId];
        }
    }
};

game.api.createInstance = function (script) {
    if (!script.extendsFrom) {
        return script.createInstance();
    }
    var baseScript = game.api.require(script.extendsFrom);
    var baseInstance = game.api.createInstance(baseScript);
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

game.input = {
    mouseButton: undefined,
    mousePos: undefined,
    mouseDown: undefined,

    keysDown: {},
};

game.inputEvents = [];

canvas.addEventListener('mousedown', function (e) {
    game.input.mouseButton = e.button;
    game.input.mouseDown = true;
    game.input.mousePos = game.api.math.vector.create(e.offsetX, e.offsetY);

    game.inputEvents.push(e);
});

canvas.addEventListener('mouseup', function (e) {
    game.input.mouseButton = undefined;
    game.input.mouseDown = false;
    game.input.mousePos = game.api.math.vector.create(e.offsetX, e.offsetY);

    game.inputEvents.push(e);
});

game.api.getAllComponentsIn = function (go, component) {
    var res = [];
    var comp = game.api.getComponent(go, component);
    if (comp)
        res = [comp];
    for (var i = 0; i < go.children.length; ++i) {
        res = res.concat(game.api.getAllComponentsIn(go.children[i], component));
    }
    return res;
};

game.api.getAllComponents = function (component) {
    var res = [];
    var liveObjects = game.api.baseStructures.liveObjects;
    for (var i = 0; i < liveObjects.length; ++i) {
        res = res.concat(game.api.getAllComponentsIn(liveObjects[i], component));
    }
    return res;
};

canvas.addEventListener('mousemove', function (e) {
    game.input.mousePos = game.api.math.vector.create(e.offsetX, e.offsetY);
});
canvas.addEventListener('mouseout', function (e) {
    game.input.mouseButton = undefined;
    game.input.mouseDown = undefined;
    game.input.mousePos = undefined;
});

window.addEventListener('keydown', function (e) {
    game.input.keysDown[e.keyCode] = { code: e.code, key: e.key };
});
window.addEventListener('keyup', function (e) {
    game.input.keysDown[e.keyCode] = undefined;
});

canvas.addEventListener('contextmenu', function (e) {
    return false;
});
