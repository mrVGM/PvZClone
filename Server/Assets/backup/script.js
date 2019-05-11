var asd = {
    createInstance: function () {
        var instance = {
            name: 'Asd',
            params: {
                num: {
                    name: 'Number param',
                    type: 'number',
                    value: 5
                },
                text: {
                    name: 'Text param',
                    type: 'text',
                    value: 'text'
                },
                array: {
                    name: 'Array param',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        name: 'Custom param',
                        type: 'custom',
                        value: {
                            num: {
                                name: 'Num',
                                type: 'number',
                                value: 3
                            },
                            tex: {
                                name: 'Tex',
                                type: 'text',
                                value: 'tex'
                            }
                        }
                    }
                },
                gameObject: {
                    name: 'Game Object param',
                    type: 'gameObject',
                    value: undefined,
                },
                fileObject: {
                    name: 'File Object param',
                    type: 'fileObject',
                    value: undefined,
                }
            },
        }
        return instance;
    },
};

module.exports = asd;