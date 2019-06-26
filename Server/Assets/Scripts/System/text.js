var text = {
    onLoad: function() {
        game.dev.text = text;
    },
    createInstance: function() {
        var inst = {
            params: {
                text: {
                    name: 'Text',
                    type: 'text',
                    value: ''
                },
                font: {
                    name: 'Font',
                    type: 'text',
                    value: '30px Arial'
                },
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 10
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 10
                }
            },
            interface: {
                render: function(instance) {
                    var context = game.api.baseStructures.context;

                    var m = game.api.math;
                    var tr = game.api.getComponent(instance.gameObject, game.dev.transform);

                    var dl = tr.interface.getWorldPosition(m.vector.create(-instance.params.width.value / 2.0, -instance.params.height.value / 2.0));
                    var dr = tr.interface.getWorldPosition(m.vector.create(instance.params.width.value / 2.0, -instance.params.height.value / 2.0));
                    var ul = tr.interface.getWorldPosition(m.vector.create(-instance.params.width.value / 2.0, instance.params.height.value / 2.0));


                    var d = m.vector.subtract(dr, dl);
                    var u = m.vector.subtract(ul, dl);
                    var rot = Math.atan2(d.y, d.x);

                    var cos = m.vector.dot(u, d);
                    var sin = m.vector.area(u, d);

                    if (Math.abs(sin) < 0.00001) {
                        return;
                    }

                    var hskew = cos / sin;

                    var w = m.vector.magnitude(d);

                    var perp = m.vector.perp(d);
                    var h = Math.abs(m.vector.dot(u, perp) / m.vector.magnitude(perp));

                    context.translate(dl.x, dl.y);
                    context.rotate(rot);

                    context.transform(1, 0, hskew, 1, 0, 0);

                    context.font = inst.params.font.value;
                    context.fillText(inst.params.text.value, 0, 0);
                    
                    context.rotate(-rot);
                    context.translate(-dl.x, -dl.y);
                }
            }
        };
        return inst;
    }
};

module.exports = text;