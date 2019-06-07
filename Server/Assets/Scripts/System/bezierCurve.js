var bezierCurve = {
    onLoad: function () {
        game.dev.bezierCurve = bezierCurve;
    },
    createInstance: function () {
        var inst = {
            name: 'Bezier curve',
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
                    var points = [leftCP.point, leftCP.rightHandle, rightCP.leftHandle, rightCP.point];
                    if (!points[1]) {
                        points[1] = leftCP.point;
                    }
                    if (!points[2]) {
                        points[2] = rightCP.point;
                    }

                    var m = inst.interface.getMath();

                    var tmp = [];
                    tmp.push(m.vector.add(m.vector.multiply((1 - localWeigth), points[0]), m.vector.multiply(localWeigth, points[1])));
                    tmp.push(m.vector.add(m.vector.multiply((1 - localWeigth), points[1]), m.vector.multiply(localWeigth, points[2])));
                    tmp.push(m.vector.add(m.vector.multiply((1 - localWeigth), points[2]), m.vector.multiply(localWeigth, points[3])));

                    points = tmp;

                    tmp = [];
                    tmp.push(m.vector.add(m.vector.multiply((1 - localWeigth), points[0]), m.vector.multiply(localWeigth, points[1])));
                    tmp.push(m.vector.add(m.vector.multiply((1 - localWeigth), points[1]), m.vector.multiply(localWeigth, points[2])));
                    points = tmp;

                    return m.vector.add(m.vector.multiply((1 - localWeigth), points[0]), m.vector.multiply(localWeigth, points[1]));
                },
                cpToRealPoints: function (inst) {
                    var res = [];
                    for (var i = 0; i < inst.params.controlPoints.value.length; ++i) {
                        var cur = inst.params.controlPoints.value[i].value;
                        var p = cur.point.gameObjectRef;
                        var tr = game.api.getComponent(p, game.dev.transform);
                        p = tr.interface.getWorldPosition({ x: 0, y: 0 });

                        var l = cur.leftHandle.gameObjectRef;
                        if (l) {
                            tr = game.api.getComponent(l, game.dev.transform);
                            l = tr.interface.getWorldPosition({ x: 0, y: 0 });
                        }

                        var r = cur.rightHandle.gameObjectRef;
                        if (r) {
                            tr = game.api.getComponent(r, game.dev.transform);
                            r = tr.interface.getWorldPosition({ x: 0, y: 0 });
                        }

                        res.push({
                            weight: cur.weight.value,
                            point: p,
                            leftHandle: l,
                            rightHandle: r
                        });
                    }
                    return res;
                },
                getPosition: function (inst, weight) {
                    var allPoints = inst.interface.cpToRealPoints(inst);
                    var enclosing = inst.interface.getEnclosingPointsAndLocalWeight(inst, allPoints, weight);
                    return inst.interface.getPoint(inst, enclosing.left, enclosing.right, enclosing.localWeight);
                },
                getEnclosingPointsAndLocalWeight: function (inst, allPoints, weight) {
                    var sorted = [].concat(allPoints);
                    for (var i = 0; i < sorted.length - 1; ++i) {
                        for (var j = i + 1; j < sorted.length; ++j) {
                            if (sorted[j].weight < sorted[i].weight) {
                                var tmp = sorted[i];
                                sorted[i] = sorted[j];
                                sorted[j] = tmp;
                            }
                        }
                    }
                    var left = 0;
                    for (var i = 1; i < sorted.length; ++i) {
                        if (sorted[i].weight >= weight) {
                            left = i - 1;
                            break;
                        }
                    }
                    return {
                        left: sorted[left],
                        right: sorted[left + 1],
                        localWeight: (weight - sorted[left].weight) / (sorted[left + 1].weight - sorted[left].weight),
                    };
                },
            },
        };
        return inst;
    },
};

module.exports = bezierCurve;