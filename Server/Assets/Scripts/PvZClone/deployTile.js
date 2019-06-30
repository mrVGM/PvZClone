var deployTile = {
    onLoad: function() {
        game.dev.deployTile = deployTile;
    },
    createInstance: function() {
        var inst = {
            name: 'Deploy Tile',
            params: {
                lane: {
                    name: 'Lane',
                    type: 'number',
                    value: 1,
                }
            },
            interface: {
                canDeploy: function(inst) {
                    return inst.gameObject.children.length === 0;
                }
            }
        };
        return inst;
    }
};

module.exports = deployTile;