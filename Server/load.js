document.game = {};

var module = {};

function onLoadLibrary(lib, callback) {
    lib = JSON.parse(lib);
    document.game.library = lib;
    document.game.scripts = {};

    var scriptIndeces = [];
    var assetIndeces = [];

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
        } else if (ext[1] === 'asset') {
            assetIndeces.push(fe.id);
        }
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

            console.log('ready');

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