var beatPlayer = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Beat Player',
            params: {
                zombieTransform: {
                    name: 'Zombie Transform',
                    type: 'gameObject',
                    value: undefined
                },
                homeZoneTag: {
                    name: 'Home Zone Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var tr = inst.params.zombieTransform.gameObjectRef;
                    tr = game.api.getComponent(tr, game.dev.transform);

                    var colliders = game.api.getAllComponents(game.dev.collider);
                    homeZoneCollider = undefined;
                    for (var i = 0; i < colliders.length; ++i) {
                        var curGo = colliders[i].gameObject;
                        var taggedComponent = game.api.getComponent(curGo, game.dev.taggedComponent);
                        if (taggedComponent && taggedComponent.params.tag.value === inst.params.homeZoneTag.value) {
                            homeZoneCollider = colliders[i];
                            break;
                        }
                    }
                    
                    while (true) {
                        var pos = tr.interface.getWorldPosition({x: 0, y: 0});
                        
                        if (homeZoneCollider.interface.isInside(homeZoneCollider, pos)) {
                            game.api.baseStructures.levelState.result = 'lost';
                            return;
                        }
                        yield;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = beatPlayer;