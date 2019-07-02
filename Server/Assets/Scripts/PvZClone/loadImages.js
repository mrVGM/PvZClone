var loadAllImages = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Load All Images',
            params: {},
            interface: {
                coroutine: function* (inst) {
                    var ballance = 0;

                    function loadImage(id) {
                        if (game.library[id].image) {
                            ballance--;
                            return;
                        }
                        ballance++;
                        var img = new Image();
                        img.src = game.library[id].path;
                        img.onload = function () {
                            game.library[id].image = img;
                            ballance--;
                        };
                    }

                    for (var id in game.library) {
                        var ext = game.library[id].path.split('.');
                        ext = ext[ext.length - 1];
                        if (ext === 'png') {
                            loadImage(id);
                        }
                    }

                    while (ballance > 0) {
                        yield;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = loadAllImages;