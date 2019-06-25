var sunStore = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Sun Store',
            params: {
                sunCollected: {
                    name: 'Sun Collected',
                    type: 'number',
                    value: 0
                },
                textToUpdate: {
                    name: 'Text To Update',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function*(inst) {
                    var text = inst.params.textToUpdate.gameObjectRef;
                    text = game.api.getComponent(text, game.dev.text);
                    while(true) {
                        text.params.text.value = inst.params.sunCollected.value;
                        yield;
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = sunStore;