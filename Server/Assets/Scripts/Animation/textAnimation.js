var textAnimation = {
    extendsFrom: 'Assets\\Scripts\\Animation\\animatedProperty.js',
    createInstance: function () {
        var inst = {
            name: 'Text Animation',
            params: {
                keys: {
                    name: 'Keys',
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
                            keyValue: {
                                name: 'Text',
                                type: 'text',
                                value: undefined
                            }
                        }
                    },
                }
            },
            interface: {
                getValue: function (inst, frame) {
                    var left = inst.params.keys.value[0];
                    for (var i = 1; i < inst.params.keys.value.length; ++i) {
                        var cur = inst.params.keys.value[i];
                        if (cur.value.keyNumber.value <= frame) {
                            left = cur;
                        }
                        else {
                            break;
                        }
                    }
                    return left.value.keyValue.value;
                },
                getDuration: function (inst) {
                    var res = inst.params.keys.value[inst.params.keys.value.length - 1];
                    res = res.value.keyNumber.value + 1;
                    return res;
                }
            }
        };
        return inst;
    }
};

module.exports = textAnimation;