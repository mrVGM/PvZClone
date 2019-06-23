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
                isDeploymentDone: function(inst) {
                    if (inst.interface.recvEvents.length === 0) {
                        return false;
                    }
                    var sum = 0;
                    for (var i = 0; i < inst.interface.recvEvents.length; ++i) {
                        sum += inst.interface.recvEvents[i];
                    }
                    return sum === 0;
                },
                coroutine: function* (inst) {
                    while(true) {
                        if (typeof inst.events[inst.params.deployingTag.value] !== 'undefined') {
                            if (Array.isArray(inst.events[inst.params.deployingTag.value])) {
                                inst.interface.recvEvents = inst.interface.recvEvents.concat(inst.events[inst.params.deployingTag.value]);
                            }
                            else {
                                inst.interface.recvEvents.push(inst.events[inst.params.deployingTag.value]);
                            }
                        }
                        if (inst.interface.isDeploymentDone(inst)) {
                            console.log('Deployment done');
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