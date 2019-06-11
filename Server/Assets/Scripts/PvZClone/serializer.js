var serializer = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Serializer',
            params: {
                selectedSiteTag: {
                    name: 'Selected Site Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function*(inst) {
                    var site = inst.context[inst.params.selectedSiteTag.value];
                    game.api.baseStructures.saveGame[inst.params.selectedSiteTag.value] = site.params.level.value;
                }
            }
        };
        return inst;
    }
};

module.exports = serializer;