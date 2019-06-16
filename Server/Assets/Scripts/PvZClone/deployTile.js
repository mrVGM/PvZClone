var deployTile = {
    onLoad: function() {
        game.dev.deployTile = deployTile;
    },
    createInstance: function() {
        var inst = {
            name: 'Deploy Tile',
            params: {},
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