var viewportSettings = {
    createInstance: function () {
        var instance = {
            params: {
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 800,
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 600,
                },
                imageScript: {
                    name: 'Image Script',
                    type: 'fileObject',
                    value: undefined,
                },
                transformScript: {
                    name: 'Transform Script',
                    type: 'fileObject',
                    value: undefined,
                },
                bezierCurveScript: {
                    name: 'Bezier Curve Script',
                    type: 'fileObject',
                    value: undefined,
                },
                mathScript: {
                    name: 'Math Script',
                    type: 'fileObject',
                    value: undefined,
                },
            }
        };
        return instance;
    }
};

module.exports = viewportSettings;