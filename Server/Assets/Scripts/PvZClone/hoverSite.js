var hoverSite = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Hover Site',
            params: {
                pointedTargetsTag: {
                    name: 'PointedTargetsTag',
                    type: 'fileObject',
                    value: undefined
                },
                site: {
                    name: 'Site',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function (inst) {
                    function crt() {
                        var pointed = inst.events[inst.params.pointedTargetsTag.value];
                        if (pointed) {
                            for (var i = 0; i < pointed.length; ++i) {
                                if (pointed[i].gameObject.id === inst.params.site.gameObjectRef.id) {
                                    var tr = game.api.getComponent(inst.params.site.gameObjectRef, game.dev.transform);
                                    tr.params.scaleX.value = 1.1;
                                    tr.params.scaleY.value = 1.1;
                                    return crt;
                                }
                            }
                        }
                    }
                    return crt;
                },
                finish: function (inst) {
                    var tr = game.api.getComponent(inst.params.site.gameObjectRef, game.dev.transform);
                    tr.params.scaleX.value = 1;
                    tr.params.scaleY.value = 1;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverSite;