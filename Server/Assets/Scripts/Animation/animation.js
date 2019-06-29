var animation = {
    createInstance: function () {
        var inst = {
            name: 'Animation',
            params: {
                looped: {
                    name: 'Looped',
                    type: 'number',
                    value: 0
                },
                properties: {
                    name: 'Properties',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'custom',
                        value: {
                            goPath: {
                                name: 'GO Path',
                                type: 'text',
                                value: ''
                            },
                            component: {
                                name: 'Component',
                                type: 'fileObject',
                                value: undefined
                            },
                            propertyPath: {
                                name: 'Property Path',
                                type: 'text',
                                value: ''
                            },
                            propertyAnimation: {
                                name: 'Property Animation',
                                type: 'fileObject',
                                value: undefined
                            }
                        }
                    }
                },
                eventsToRaise: {
                    name: 'Events To Raise',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'custom',
                        value: {
                            keyNumber: {
                                name: 'Key Number',
                                type: 'number',
                                value: 0
                            },
                            data: {
                                name: 'Data',
                                type: 'fileObject',
                                value: undefined
                            }
                        }
                    }
                }
            },
            interface: {
                getDuration: function (inst) {
                    var res = 0;
                    for (var i = 0; i < inst.params.properties.value.length; ++i) {
                        var cur = inst.params.properties.value[i].value.propertyAnimation.value;
                        var animInstance = game.library[cur].scriptableObject.component.instance;
                        var duration = animInstance.interface.getDuration(animInstance);
                        if (res < duration) {
                            res = duration;
                        }
                    }
                    return res;
                }
            }
        };
        return inst;
    }
};

module.exports = animation;