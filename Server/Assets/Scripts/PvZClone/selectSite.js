var selectSite = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            params: {
                selectedSiteTag: {
                    name: 'Selected Site Tag',
                    type: 'fileObject',
                    value: undefined
                },
                pointedObjectsTag: {
                    name: 'Pointed Objects',
                    type: 'fileObject',
                    value: undefined
                },
                levelSiteTag: {
                    name: 'Level site tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function getPointedSite(pointed, siteTag) {
                        if (!pointed) {
                            return undefined;
                        }
                        for (var i = 0; i < pointed.length; ++i) {
                            if (pointed[i].params.targetType.value === siteTag) {
                                return game.api.getComponent(pointed[i].gameObject, game.dev.site);
                            }
                        }
                    }
                    while (true) {
                        while (!game.input.mouseDown || game.input.mouseButton !== 0) {
                            yield undefined;
                        }
                        var pointedTargets = inst.events[inst.params.pointedObjectsTag.value];
                        var pointedSite = getPointedSite(pointedTargets, inst.params.levelSiteTag.value);
                        if (!pointedSite || game.api.baseStructures.saveGame.levelCompleted + 1 < pointedSite.params.level.value) {
                            yield undefined;
                            continue;
                        }
                        while (game.input.mouseDown) {
                            yield undefined;
                        }
                        pointedTargets = inst.events[inst.params.pointedObjectsTag.value];
                        var site = getPointedSite(pointedTargets, inst.params.levelSiteTag.value);
                        if (site && site.id === pointedSite.id) {
                            inst.context[inst.params.selectedSiteTag.value] = site;
                            return;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = selectSite;