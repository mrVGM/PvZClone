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
                                    console.log("I'm hovered!");
                                    return crt;
                                }
                            }
                        }
                    }
                    return crt;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverSite;