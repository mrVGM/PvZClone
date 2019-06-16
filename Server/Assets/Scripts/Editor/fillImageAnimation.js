var fillImageAnimation = {
    editorMethod: function(inst, hierarchyControler, hierarchyModel, projectModel) {
        var folder = projectModel.fileEntries[inst.params.imagesFolder.value];
        var imageFes = [];
        for (var i = 0; i < folder.children.length; ++i) {
            imageFes.push(projectModel.fileEntries[folder.children[i]]);
        }
        imageFes.sort(function(a, b){
            if(a.path < b.path) { return -1; }
            if(a.path > b.path) { return 1; }
            return 0;
        });
        var animatedProperty = projectModel.fileEntries[inst.params.animatedProperty.value];
        var fs = require('fs');
        fs.readFile(animatedProperty.getAbsolutePath(), function(err, data) {
            var content = JSON.parse(data.toString());
            var keys = content.component.instance.params.keys.value;

            for (var i = 0; i < keys.length; ++i) {
                var curKey = keys[i].value;
                curKey.keyNumber.value = i;
                curKey.keyValue.value = imageFes[i].id;
            }

            fs.writeFileSync(animatedProperty.getAbsolutePath(), JSON.stringify(content));
            console.log(content);
        });
    },
    createInstance: function() {
        var inst = {
            params: {
                animatedProperty: {
                    name: 'AnimatedProperty',
                    type: 'fileObject',
                    value: undefined
                },
                imagesFolder: {
                    name: 'imagesFolder',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = fillImageAnimation;