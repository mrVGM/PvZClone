var math = {
    onLoad: function () {
        game.api.math = math.math;
    },
    math: {
        vector: {
            create: function (x, y) {
                return { x: x, y: y };
            },
            add: function (v, w) {
                return math.math.vector.create(v.x + w.x, v.y + w.y);
            },
            negate: function (v) {
                return math.math.vector.create(-v.x, -v.y);
            },
            subtract: function (v, w) {
                return math.math.vector.add(v, math.math.vector.negate(w));
            },
            dot: function (v, w) {
                return v.x * w.x + v.y * w.y;
            },
            perp: function (v) {
                return math.math.vector.create(-v.y, v.x);
            },
            multiply: function (c, v) {
                return math.math.vector.create(c * v.x, c * v.y);
            },
            squareMagnitude: function (v) {
                var squareMagnitude = math.math.vector.dot(v, v);
                return squareMagnitude;
            },
            magnitude: function (v) {
                return Math.sqrt(math.math.vector.squareMagnitude(v));
            },
            area: function (v, w) {
                return -v.x * w.y + v.y * w.x;
            },
        },
        transform: function (component, vector) {
            var m = math.math;

            var scale = m.vector.create(component.params.scaleX.value, component.params.scaleY.value);

            var res = m.vector.create(component.params.x.value, component.params.y.value);
            res = m.vector.add(res, vector);
            res = m.vector.create(res.x * scale.x, res.y * scale.y);

            var rot = component.params.rotation.value;
            rot = 2 * Math.PI * rot / 360.0;

            var x = m.vector.create(Math.cos(-rot), Math.sin(-rot));
            var y = m.vector.perp(x);

            res = m.vector.add(m.vector.multiply(res.x, x), m.vector.multiply(res.y, y));
            return res;
        },
        inverseTransform: function (component, vector) {
            var m = math.math;

            res = vector;
            var rot = -component.params.rotation.value;
            rot = 2 * Math.PI * rot / 360.0;

            var x = m.vector.create(Math.cos(-rot), Math.sin(-rot));
            var y = m.vector.perp(x);

            res = m.vector.add(m.vector.multiply(res.x, x), m.vector.multiply(res.y, y));

            var scale = m.vector.create(1 / component.params.scaleX.value, 1 / component.params.scaleY.value);
            res = m.vector.create(res.x * scale.x, res.y * scale.y);

            var offset = m.vector.create(component.params.x.value, component.params.y.value);
            res = m.vector.subtract(res, offset);

            return res;
        }
    },
};

module.exports = math;