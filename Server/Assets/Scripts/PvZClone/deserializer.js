var deserializer = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Deserializer',
            params: {
                selectedSiteTag: {
                    name: 'Selected Site Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function*(inst) {
                    var site = game.api.baseStructures.saveGame[inst.params.selectedSiteTag.value];
                    if (!site) {
                        return;
                    }
                    var sites = game.api.getAllComponents(game.dev.site);
                    for (var i = 0; i < sites.length; ++i) {
                        if (site === sites[i].params.level.value) {
                            inst.context[inst.params.selectedSiteTag.value] = sites[i];
                            break;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = deserializer;