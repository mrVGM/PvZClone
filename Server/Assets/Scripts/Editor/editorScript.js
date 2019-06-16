var editorScript = {
    editorMethod: function(inst, controller, model) {
        console.log(inst);
        var root = model.root;
        function getComponent(go, componentId) {
            for (var i = 0; i < go.components.length; ++i) {
                if (go.components[i].script === componentId) {
                    return go.components[i].instance;
                }
            }
        }
        function find(go) {
            var res = [];
            var comp = getComponent(go, inst.params.pointerTargetScript.value);
            if (comp) {
                res.push({comp: comp, go: go});
            }
            for (var i = 0; i < go.children.length; ++i) {
                res = res.concat(find(go.children[i]));
            }
            return res;
        }
        var found = find(root);
        var tiles = [];
        for (var i = 0; i < found.length; ++i) {
            if (found[i].comp.params.targetType.value === inst.params.tileTag.value) {
                tiles.push(found[i]);
            }
        }

        for (var i = 0; i < tiles.length; ++i) {
            var curGo = tiles[i].go;
            curGo.components.push({script: inst.params.componentToAdd.value, 
                instance: {params: {}, interface: {}}});
        }
    },
    createInstance: function() {
        var inst = {
            name: 'Editor Script',
            params: {
                tileTag: {
                    name: 'TileTag',
                    type: 'fileObject',
                    value: undefined
                },
                pointerTargetScript: {
                    name: 'PointerTargetScript',
                    type: 'fileObject',
                    value: undefined
                },
                componentToAdd: {
                    name: 'Component To Add',
                    type: 'fileObject',
                    value: undefined
                },
            },
            insterface: {}
        };
        return inst;
    }
};

module.exports = editorScript;