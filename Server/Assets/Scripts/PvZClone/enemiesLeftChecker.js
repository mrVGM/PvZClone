var enemiesLeft = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Enemies Left',
            params: {
                deployingTag: {
                    name: 'Deploying Tag',
                    type: 'fileObject',
                    value: 0
                }
            },
            interface: {
                recvEvents: [],
                coroutine: function* (inst) {
                    while(true) {
                        if (typeof inst.events[inst.params.deployingTag.value] !== 'undefined') {
                            inst.interface.recvEvents.push(inst.events[inst.params.deployingTag.value]);
                        }
                        yield;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = enemiesLeft;