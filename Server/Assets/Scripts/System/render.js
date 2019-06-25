var render = {
    onLoad: function () {
        if (game) {
            game.api.renderGameObjects = render;
        }
    },
    render: function (liveGameObjects) {
        function render(go) {
            function loadImage(id) {
                var img = new Image();
                img.src = game.library[id].path;
                img.onload = function () {
                    game.library[id].image = img;
                };
            }

            var imageComponent = game.api.getComponent(go, game.dev.image);

            if (imageComponent) {
                var fileId = imageComponent.params.image.value;

                if (!game.library[fileId].image) {
                    loadImage(fileId);
                    return;
                }

                imageComponent.interface.render(imageComponent);
            }

            for (var i = 0; i < go.children.length; ++i) {
                render(go.children[i]);
            }
        }
        function renderText(go) {
            var textComponent = game.api.getComponent(go, game.dev.text);

            if (textComponent) {
                textComponent.interface.render(textComponent);
            }

            for (var i = 0; i < go.children.length; ++i) {
                renderText(go.children[i]);
            }
        } 

        game.api.baseStructures.context.clearRect(0, 0, game.api.baseStructures.canvas.width, game.api.baseStructures.canvas.height);

        for (var i = 0; i < liveGameObjects.length; ++i) {
            render(liveGameObjects[i]);
        }
        for (var i = 0; i < liveGameObjects.length; ++i) {
            renderText(liveGameObjects[i]);
        }
    }
};

module.exports = render;