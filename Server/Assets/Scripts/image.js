var image = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
        game.dev.image = image;
    },
    createInstance: function () {
        var instance = {
            name: 'Image',
            params: {
                image: {
                    name: 'ImageFile',
                    type: 'fileObject',
                    value: undefined,
                },
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 100
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 100
                }
            },
            interface: {
                render: function (instance) {
                    var tr = document.game.api.getComponent(instance.gameObject, game.dev.transform);
                    var m = document.game.api.math;

                    var center = m.vector.create(0, 0);
                    var x = m.vector.create(1, 0);
                    var y = m.vector.create(0, 1);

                    center = tr.interface.getWorldPosition(center);
                    x = tr.interface.getWorldPosition(x);
                    y = tr.interface.getWorldPosition(y);

                    var sX = m.vector.magnitude(m.vector.subtract(x, center));
                    var sY = m.vector.magnitude(m.vector.subtract(y, center));

                    x = m.vector.subtract(x, center);
                    x = m.vector.multiply(1 / m.vector.magnitude(x), x);

                    y = m.vector.subtract(y, center);
                    y = m.vector.multiply(1 / m.vector.magnitude(y), y);

                    var rot = -Math.atan2(x.y, x.x);

                    var image = document.game.library[instance.params.image.value].image;
                    var context = document.game.api.baseStructures.context;

                    context.translate(center.x, center.y);
                    context.rotate(-rot);
                    context.drawImage(image, -sX * instance.params.width.value / 2.0, -sY * instance.params.height.value / 2.0,
                        sX * instance.params.width.value, sY * instance.params.height.value);
                    context.rotate(rot);
                    context.translate(-center.x, -center.y);
                }
            }
        };
        return instance;
    },
};

module.exports = image;