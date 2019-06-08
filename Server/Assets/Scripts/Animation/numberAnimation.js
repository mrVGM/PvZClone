var numberAnimation = {
    extendsFrom: 'Assets\\Scripts\\Animation\\animatedProperty.js',
    createInstance: function () {
        var inst = {
            name: 'Number Animation',
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
                                name: 'Key Value',
                                type: 'number',
                                value: 0
                            },
                            leftHandle: {
                                name: 'Left Handle',
                                type: 'custom',
                                value: {
                                    x: {
                                        name: 'X',
                                        type: 'number',
                                        value: 0
                                    },
                                    y: {
                                        name: 'Y',
                                        type: 'number',
                                        value: 0
                                    }
                                }
                            },
                            rightHandle: {
                                name: 'Right Handle',
                                type: 'custom',
                                value: {
                                    x: {
                                        name: 'X',
                                        type: 'number',
                                        value: 0
                                    },
                                    y: {
                                        name: 'Y',
                                        type: 'number',
                                        value: 0
                                    }
                                }
                            }
                        }
                    },
                }
            },
            interface: {
                getValue: function (inst, frame) {
                    var leftIndex = 0;
                    var left = inst.params.keys.value[0];
                    for (var i = 1; i < inst.params.keys.value.length; ++i) {
                        var cur = inst.params.keys.value[i];
                        if (cur.value.keyNumber.value <= frame) {
                            left = cur;
                            leftIndex = i;
                        }
                        else {
                            break;
                        }
                    }
                    var right = undefined;
                    if (leftIndex < inst.params.keys.value.length - 1) {
                        right = inst.params.keys.value[leftIndex + 1];
                    }
                    if (!right) {
                        return left.value.keyValue.value;
                    }
                    var t = (frame - left.value.keyNumber.value) / (right.value.keyNumber.value - left.value.keyNumber.value);
                    var m = game.api.math;

                    var leftPoint = m.vector.create(left.value.keyNumber.value, left.value.keyValue.value);
                    var rightHandle = m.vector.add(leftPoint, m.vector.create(left.value.rightHandle.value.x.value, left.value.rightHandle.value.y.value));

                    var rightPoint = m.vector.create(right.value.keyNumber.value, right.value.keyValue.value);
                    var leftHandle = m.vector.add(rightPoint, m.vector.create(right.value.leftHandle.value.x.value, right.value.leftHandle.value.y.value));

                    var points = [leftPoint, rightHandle, leftHandle, rightPoint];
                    points = [
                        m.vector.add(m.vector.multiply(1 - t, points[0]), m.vector.multiply(t, points[1])),
                        m.vector.add(m.vector.multiply(1 - t, points[1]), m.vector.multiply(t, points[2])),
                        m.vector.add(m.vector.multiply(1 - t, points[2]), m.vector.multiply(t, points[3]))
                    ];
                    points = [
                        m.vector.add(m.vector.multiply(1 - t, points[0]), m.vector.multiply(t, points[1])),
                        m.vector.add(m.vector.multiply(1 - t, points[1]), m.vector.multiply(t, points[2]))
                    ];
                    return m.vector.add(m.vector.multiply(1 - t, points[0]), m.vector.multiply(t, points[1])).y;
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

module.exports = numberAnimation;