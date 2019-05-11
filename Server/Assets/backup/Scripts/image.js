var image = {
    createInstance: function () {
        var instance = {
            name: 'Image',
            params: {
                image: {
                    name: 'ImageFile',
                    type: 'fileObject',
                    value: undefined,
                },
                pivotX: {
                    name: 'pivotX',
                    type: 'number',
                    value: 0
                },
                pivotY: {
                    name: 'pivotY',
                    type: 'number',
                    value: 0
                },
            },
        }
        return instance;
    },
};

module.exports = image;