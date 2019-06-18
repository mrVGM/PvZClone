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
                coroutine: function* (inst) {
                    if (!inst.selectedAbility) {
                        inst.selectedAbility = inst.params.abilities.value[0].value;
                        inst.selectedAbility = game.library[inst.selectedAbility].scriptableObject.component.instance;
                        inst.context[inst.params.selectedAbilityTag.value] = inst.selectedAbility;
                        return;
                    }
                    while (true) {
                        yield;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = forwardMove;