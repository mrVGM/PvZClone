var collectSun = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Collect Sun',
            params: {
                pointedObjectsTag: {
                    name: 'Pointed Objects',
                    type: 'fileObject',
                    value: undefined
                },
                sunPointerTargetTag: {
                    name: 'Sun Pointer Target tag',
                    type: 'fileObject',
                    value: undefined
                },
                collectedSunTag: {
                    name: 'Collected Sun Tag',
                    type: 'fileObject',
                    value: undefined
                },
                sunStoreTag: {
                    name: 'Sun Store Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function getPointedSun(pointed, sunTag) {
                        if (!pointed) {
                            return undefined;
                        }
                        for (var i = 0; i < pointed.length; ++i) {
                            if (pointed[i].params.targetType.value === sunTag) {
                                var proxy = game.api.getComponent(pointed[i].gameObject, game.dev.proxy);
                                var sun = game.api.getComponent(proxy.params.gameObject.gameObjectRef, game.dev.sun);
                                return sun;
                            }
                        }
                    }
                    var sunStore = inst.context[inst.params.sunStoreTag.value];
                    while (true) {
                        while (!game.input.mouseDown || game.input.mouseButton !== 0) {
                            yield undefined;
                        }
                        var pointedTargets = inst.events[inst.params.pointedObjectsTag.value];
                        var pointedSun = getPointedSun(pointedTargets, inst.params.sunPointerTargetTag.value);
                        if (!pointedSun) {
                            yield;
                            continue;
                        }
                        while (game.input.mouseDown) {
                            yield undefined;
                        }
                        pointedTargets = inst.events[inst.params.pointedObjectsTag.value];
                        var sunOnMouseUp = getPointedSun(pointedTargets, inst.params.sunPointerTargetTag.value);
                        if (sunOnMouseUp && sunOnMouseUp.gameObject.id === pointedSun.gameObject.id) {
                            inst.interface.dispatchEvent(inst, inst.params.collectedSunTag.value, pointedSun.gameObject);
                            sunStore.params.sunCollected.value += pointedSun.params.sunAmount.value;
                            return;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = collectSun;