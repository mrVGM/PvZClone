var program = {
    onLoad: function () {
        console.log('ProgramLoaded');
        game.dev.programs.program = program;
    },
    createInstance: function () {
        var inst = {
            name: 'Program',
            stop: false,
            finished: false,
            params: {
                updateTime: {
                    name: 'Update Time',
                    type: 'number',
                    value: 0,
                },
            },
            interface: {
                coroutine: function (inst) {
                    var cnt = 0;
                    function crt() {
                        console.log(cnt++);
                        if (cnt < 20)
                            return crt;
                    }
                    return crt;
                },
                finish: function (inst) {
                    var cnt = 0;
                    function crt() {
                        console.log(cnt++);
                        if (cnt < 20)
                            return crt;
                    }
                    return crt;
                },
                createCoroutine: function (inst) {
                    var c = inst.interface.coroutine(inst);
                    var f = inst.interface.finish;
                    var permanentStop = false;
                    function crt() {
                        if (!permanentStop && !inst.stop && c) {
                            c = c();
                            return crt;
                        }
                        if (!permanentStop) {
                            f = f(inst);
                        }
                        permanentStop = true;
                        if (f) {
                            f = f();
                            if (!f) {
                                inst.finished = true;
                            }
                            return crt;
                        }
                        inst.finished = true;
                    }
                    return crt;
                }
            },
        };
        return inst;
    }
};

module.exports = program;