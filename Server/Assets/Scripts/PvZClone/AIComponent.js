var forwardMove = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'AI Component',
            selectedAbility: undefined,
            params: {
                selectedAbilityTag: {
                    name: 'aiActionTag',
                    type: 'fileObject',
                    value: undefined
                },
                player: {
                    name: 'Player',
                    type: 'gameObject',
                    value: undefined
                },
                abilities: {
                    name: 'Abilities',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'fileObject',
                        value: undefined
                    }
                }
            },
            interface: {
                chooseAbility: function(inst) {
                    var player = inst.params.player.gameObjectRef;
                    player = game.api.getComponent(player, game.dev.programs.programPlayer);
                    for (var i = 0; i < inst.params.abilities.value.length; ++i) {
                        var id = inst.params.abilities.value[i].value;
                        var cur = game.library[id].scriptableObject.component.instance;
                        if (cur.interface.isEnabled(cur, player)) {
                            return { scriptableObject: cur, id: id };
                        }
                    }
                    return undefined;
                },
                coroutine: function* (inst) {
                    if (!inst.selectedAbility) {
                        yield;
                        var tmp = inst.interface.chooseAbility(inst);
                        inst.selectedAbility = tmp.id;
                        inst.context[inst.params.selectedAbilityTag.value] = tmp.scriptableObject;
                        return;
                    }
                    while (true) {
                        yield;
                        var tmp = inst.interface.chooseAbility(inst);
                        if (inst.selectedAbility !== tmp.id) {
                            inst.selectedAbility = tmp.id;
                            inst.context[inst.params.selectedAbilityTag.value] = tmp.scriptableObject;
                            return;
                        }
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = forwardMove;