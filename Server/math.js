if (!document.game) {
    document.game = {};
}

if (!document.game.api) {
    document.game.api = {};
}

document.game.api.math = {
    vector: {
        create: function (x, y) {
            return { x: x, y: y };
        },
        add: function (v, w) {
            return document.game.api.math.vector.create(v.x + w.x, v.y + w.y);
        },
        negate: function (v) {
            return document.game.api.math.vector.create(-v.x, -v.y);
        },
        subtract: function (v, w) {
            return document.game.api.math.vector.add(v, document.game.api.math.vector.negate(w));
        },
        dot: function (v, w) {
            return v.x * w.x + v.y * w.y;
        },
        perp: function (v) {
            return document.game.api.math.vector.create(-v.y, v.x);
        },
        multiply: function (c, v) {
            return document.game.api.math.vector.create(c * v.x, c * v.y);
        },
        squareMagnitude: function (v) {
            var squareMagnitude = document.game.api.math.vector.dot(v, v);
            return squareMagnitude;
        },
        magnitude: function (v) {
            return Math.sqrt(document.game.api.math.vector.squareMagnitude(v));
        },
        area: function (v, w) {
            return -v.x * w.y + v.y * w.x;
        },
    },
    transform: function (component, vector) {
        var m = document.game.api.math;

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
};
