var programStarter = {
    onLoad: function () {
        game.dev.programs.programStarter = programStarter;
        game.api.startProgram = function (program, context) {
            program.context = context;
            program.started = true;
            program.finished = false;

            function findBrain(go) {
                var comp = game.api.getComponent(go, game.dev.programs.brain);
                if (comp) {
                    return comp;
                }
                for (var i = 0; i < go.children.length; ++i) {
                    comp = findBrain(go.children[i]);
                    if (comp) {
                        return comp;
                    }
                }
            }
            var brain = undefined;
            var liveObjects = game.api.baseStructures.liveObjects;
            for (var i = 0; i < liveObjects.length; ++i) {
                brain = findBrain(liveObjects[i]);
                if (brain) {
                    break;
                }
            }
            if (brain) {
                var crt = program.interface.createCoroutine(program);
                if (crt) {
                    brain.interface.addCoroutine(brain, { updateTime: program.params.updateTime, crt: crt });
                }
            }
            else {
                console.log('Brain not found!');
            }
        };
    },
    createInstance: function () {
        var inst = {
            name: 'ProgramStarter',
            params: {
                program: {
                    name: 'Program',
                    type: 'gameObject',
                    value: undefined,
                },
            },
            interface: {
                start: function (inst) {
                    var program = game.api.getComponent(inst.params.program.gameObjectRef, game.dev.programs.program);
                    if (!program) {
                        console.log('Program not found!');
                    }
                    game.api.startProgram(program, {});
                }
            },
        };
        return inst;
    }
};

module.exports = programStarter;