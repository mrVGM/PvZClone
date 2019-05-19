var bezierCurve = {
    createInstance: function () {
        var inst = {
            params: {
                controlPoints: {
                    name: 'Control Points',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        name: 'Control Point',
                        type: 'custom',
                        value: {
                            weight: {
                                name: 'Weight',
                                type: 'number',
                                value: 0,
                            },
                            point: {
                                name: 'Point',
                                type: 'gameObject',
                                value: undefined
                            },
                            leftHandle: {
                                name: 'Left Handle',
                                type: 'gameObject',
                                value: undefined
                            },
                            rightHandle: {
                                name: 'Right Handle',
                                type: 'gameObject',
                                value: undefined
                            },
                        }
                    }
                },
            },
            interface: {
                getMath: function (inst) {
                    return game.api.math;
                },
                getPoint: function (inst, leftCP, rightCP, localWeigth) {
                    var points = [leftCP.point, leftCP.rightHandle, rightCP.leftCP, rightCP.point];
                    if (!points[1]) {
                        points[1] = leftCP.point;
                    }
                    if (!points[2]) {
                        points[2] = rightCP.point;
                    }

                    var m = inst.interface.getMath();
                    var tmp = [];

                    var tmp = m.vector.multiply((1 - localWeigth), points[0])
                }
            },
        };
        return inst;
    },
};

module.exports = bezierCurve;