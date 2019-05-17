var customProgram = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Custom Program',
            stop: false,
            params: { },
            interface: {
                coroutine: function (inst) {
                    var cnt = 0;
                    function crt() {
                        console.log('From Custom:', cnt++);
                        if (cnt < 20)
                            return crt;
                    }
                    return crt;
                },
                finish: function (inst) {
                    var cnt = 0;
                    function crt() {
                        console.log('From Custom:', cnt++);
                        if (cnt < 20)
                            return crt;
                    }
                    return crt;
                },
            },
        };
        return inst;
    }
};

module.exports = customProgram;