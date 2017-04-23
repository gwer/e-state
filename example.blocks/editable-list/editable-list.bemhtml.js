block('editable-list')(
    content()(function() {
        return [
            {
                elem: 'list',
                js: {
                    list: this.ctx.js.list || [],
                    stateName: this.ctx.js.stateName,
                    mode: this.ctx.js.model
                },
            },
            {
                block: 'button',
                mix: { block: this.block, elem: 'addBtn' },
                text: 'Add',
            }
        ]
    }),

    elem('list')(
        content()(function() {
            const stateName = this.ctx.js.stateName
            const model = this.ctx.js.model

            return this.ctx.js.list.map((el, inx) => ({
                block: 'my-input',
                js: {
                    stateName,
                    model: `${model}.${inx}`
                }
            }))
        })
    )
)
