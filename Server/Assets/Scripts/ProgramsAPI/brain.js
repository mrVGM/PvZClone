var brain = {
    onLoad: function () {
        game.dev.programs.brain = brain;
    },
    createInstance: function () {
        var inst = {
            name: 'Brain',
            params: {},
            coroutines: [],
            interface: {
                addCoroutine: function (inst, c) {
                    inst.coroutines.push(c);
                },
                update: function (inst, dt) {
                    var tmp = inst.coroutines;
                    inst.coroutines = [];
                    
                    for (var i = 0; i < tmp.length - 1; ++i) {
                        for (var j = i + 1; j < tmp.length; ++j) {
                            if (tmp[j].updateTime < tmp[i].updateTime) {
                                var t = tmp[i];
                                tmp[i] = tmp[j];
                                tmp[j] = t;
                            }
                        }
                    }
                    for (var i = 0; i < tmp.length; ++i) {
                        var res = tmp[i].crt.next();
                        if (!res.done) {
                            inst.interface.addCoroutine(inst, { updateTime: tmp[i].updateTime, crt: tmp[i].crt });
                        }
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = brain;