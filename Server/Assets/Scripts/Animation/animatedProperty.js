var animatedProperty = {
    onLoad: function () {
        game.dev.animation.animatedProperty = animatedProperty;
    },
    createInstance: function () {
        var inst = {
            params: {},
            interface: {
                getValue: function (inst, frame) { },
                getDuration: function (inst) { }
            }
        };
        return inst;
    }
};

module.exports = animatedProperty;