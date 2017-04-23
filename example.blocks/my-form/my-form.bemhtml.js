block('my-form')(
    content()(function() {
        const stateName = 'myForm'

        return [
            { elem: 'title', content: 'f2' },
            {
                block: 'my-input',
                js: {
                    stateName,
                    model: 'f1',
                },
            },
            { elem: 'title', content: 'f2' },
            {
                block: 'my-input',
                js: {
                    stateName,
                    model: 'f2',
                },
            },
            { elem: 'title', content: 'f2' },
            {
                block: 'my-input',
                js: {
                    stateName,
                    model: 'f2',
                },
            },
            { elem: 'title', content: 'nested.first' },
            {
                block: 'my-input',
                js: {
                    stateName,
                    model: 'nested.first',
                },
            },
            { elem: 'title', content: 'nested.second' },
            {
                block: 'my-input',
                js: {
                    stateName,
                    model: 'nested.second',
                },
            },
            { elem: 'title', content: 'list1' },
            {
                block: 'editable-list',
                js: {
                    stateName,
                    model: 'list1'
                }
            },
            { elem: 'title', content: 'list2' },
            {
                block: 'editable-list',
                js: {
                    stateName,
                    model: 'list2'
                }
            },
            {
                block: 'button',
                mix: { block: this.block, elem: 'printBtn' },
                text: 'print'
            },
        ]
    })
)
