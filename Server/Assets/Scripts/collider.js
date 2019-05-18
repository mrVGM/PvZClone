var collider = {
    onLoad: function () {
        game.dev.collider = collider;
    },
    createInstance: function () {
        var inst = {
            name: 'Collider',
            params: {
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 100,
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 100,
                }
            },
            interface: {
                verteces: function (inst) {
                    var m = game.api.math;
                    var res = [
                            m.vector.create(-inst.params.width.value / 2.0, -inst.params.height.value / 2.0),
                            m.vector.create(-inst.params.width.value / 2.0, inst.params.height.value / 2.0),
                            m.vector.create(inst.params.width.value / 2.0, inst.params.height.value / 2.0),
                            m.vector.create(inst.params.width.value / 2.0, -inst.params.height.value / 2.0),
                    ];
                    var tr = game.api.getComponent(inst.gameObject, game.dev.transform);
                    for (var i = 0; i < res.length; ++i) {
                        res[i] = tr.interface.getWorldPosition(res[i]);
                    }
                    return res;
                },
                isInside: function (inst, p) {
                    var verts = inst.interface.verteces(inst);
                    var m = game.api.math;

                    var sides = [
                        m.vector.subtract(verts[1], verts[0]),
                        m.vector.subtract(verts[2], verts[1]),
                        m.vector.subtract(verts[3], verts[2]),
                        m.vector.subtract(verts[0], verts[3]),
                    ];

                    var relPos = [
                        m.vector.subtract(p, verts[0]),
                        m.vector.subtract(p, verts[1]),
                        m.vector.subtract(p, verts[2]),
                        m.vector.subtract(p, verts[3]),
                    ];

                    if (m.vector.area(sides[0], relPos[0]) < 0)
                        return false;

                    if (m.vector.area(sides[1], relPos[1]) < 0)
                        return false;

                    if (m.vector.area(sides[2], relPos[2]) < 0)
                        return false;

                    if (m.vector.area(sides[3], relPos[3]) < 0)
                        return false;

                    return true;
                },
            },
        };
        return inst;
    },
};

module.exports = collider;