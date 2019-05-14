var module = {};

var game = undefined;

function onLoadLibrary(lib, callback) {
    lib = JSON.parse(lib);

    if (!document.game) {
        document.game = {};
    }
    game = document.game;

    document.game.library = lib;
    document.game.scripts = {};

    var scriptIndeces = [];
    var assetIndeces = [];
    var prefabIndeces = [];

    for (var fileEntry in lib) {
        var fe = lib[fileEntry];
        var name = fe.path.split('\\');
        name = name[name.length - 1];
        var ext = name.split('.');
        if (ext.length === 1) {
            continue;
        }
        if (ext[1] === 'js') {
            scriptIndeces.push(fe.id);
        }
        else if (ext[1] === 'asset') {
            assetIndeces.push(fe.id);
        }
        else if (ext[1] === 'prefab') {
            prefabIndeces.push(fe.id);
        }
    }

    var prefabIndex = 0;
    function loadPrefabs() {
        if (prefabIndex === prefabIndeces.length) {
            console.log('ready');
            document.game.api.startGame();
            return;
        }

        var curPrefab = document.game.library[prefabIndeces[prefabIndex]];
        loadJSON(curPrefab.path, function (json) {
            curPrefab.prefabStr = json;
            ++prefabIndex;
            loadPrefabs();
        });
    }

    var assetIndex = 0;
    function loadAssets() {
        if (assetIndex === assetIndeces.length) {

            for (var fe in document.game.library) {
                var cur = document.game.library[fe];
                if (cur.scriptableObject && cur.scriptableObject.component.instance.name === 'GameSettings') {
                    document.game.gameSettings = cur;
                    break;
                }
            }

            loadPrefabs();

            return;
        }

        var curAsset = document.game.library[assetIndeces[assetIndex]];
        var asset = loadJSON(curAsset.path, function (json) {
            curAsset.scriptableObject = JSON.parse(json);
            ++assetIndex;
            loadAssets();
        });
    }

    var scriptIndex = 0;
    function loadScripts() {
        if (scriptIndex === scriptIndeces.length) {
            loadAssets();
            return;
        }

        var script = document.createElement('script');
        script.setAttribute('src', lib[scriptIndeces[scriptIndex]].path);
        document.body.appendChild(script);
        script.addEventListener('load', function () {
            document.game.scripts[scriptIndeces[scriptIndex]] = module.exports;
            if (module.exports.onLoad) {
                module.exports.onLoad();
            }
            module.exports.id = scriptIndeces[scriptIndex];
            ++scriptIndex;
            loadScripts();
        });
    }
    loadScripts();
}

function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

console.log('Loading ...');

loadJSON('library.json', onLoadLibrary);