var animEventReceiver = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'AnimEventReceiver',
            params: {
                receivedEventsTag: {
                    name: 'Received Events Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                eventsThisFrame: [],
                addEvent: function(inst, event) {
                    inst.interface.eventsThisFrame.push(event);
                },
                coroutine: function* (inst) {
                    while (true) {
                        if (inst.interface.eventsThisFrame.length > 0) {
                            inst.interface.dispatchEvent(inst, inst.params.receivedEventsTag.value, inst.interface.eventsThisFrame);
                        }
                        inst.interface.eventsThisFrame = [];
                        yield;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = animEventReceiver;