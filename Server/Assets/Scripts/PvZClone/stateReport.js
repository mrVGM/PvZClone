var stateReport = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'StateReport',
            params: {
                eventTag: {
                    name: 'Event Tag',
                    type: 'fileObject',
                    value: undefined
                },
                number: {
                    name: 'Number',
                    type: 'number',
                    value: 0
                },
                fileObject: {
                    name: 'File Object',
                    type: 'fileObject',
                    value: undefined
                },
                gameObject: {
                    name: 'Game Object',
                    type: 'gameObject',
                    value: undefined
                },
            },
            interface: {
                coroutine: function*(inst) {
                    yield;
                    var eventData = { 
                        number: inst.params.number.value,
                        gameObject: inst.params.gameObject.value,
                        fileObject: inst.params.fileObject.value
                    };
                    inst.interface.dispatchEvent(inst, inst.params.eventTag.value, eventData);
                    yield;
                }
            }
        };
        return inst;
    }
};

module.exports = stateReport;