var frameRateMonitor = {
    createInstance: function() {
        var inst = {
            name: 'FrameRate Monitor',
            params: {
                text: {
                    name: 'Text',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                prev: undefined,
                update: function(inst) {
                    var now = (new Date()).getTime();
                    if (!inst.interface.prev) {
                        inst.interface.prev = now;
                        return;
                    }
                    var t = game.api.getComponent(inst.params.text.gameObjectRef, game.dev.text);
                    t.params.text.value = Math.floor(1000 / (now - inst.interface.prev));
                    inst.interface.prev = now;
                }
            }
        };
        return inst;
    }
};

module.exports = frameRateMonitor;