modules.define('editable-list', ['i-bem-dom', 'BEMHTML', 'events__channels', 'e-state'], function(provide, BEMDOM, BEMHTML, channels, eState) {

provide(BEMDOM.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
                this._stateName = this.params.stateName
                this._model = this.params.model

                channels(this._stateName).on('read', this.update.bind(this))
                this.findChildBlock('addBtn').domElem.on('click', this.addItem.bind(this))

                this.reRender(eState.getState(this._stateName, this._model))
            }
        }
    },

    update(e, data) {
        if (data.path !== this._model) return

        this.reRender(data.val)
    },

    reRender(list) {
        BEMDOM.replace(this.findChildElem('list').domElem, BEMHTML.apply({
            block: 'editable-list',
            elem: 'list',
            js: {
                stateName: this._stateName,
                model: this._model,
                list
            }
        }))
    },

    addItem() {
        const oldVal = eState.getState(this._stateName, this._model)
        const newVal = [...oldVal, '']

        channels(this._stateName).emit(
            'write',
            {
                path: this._model,
                val: newVal
            }
        )
    },
}))

})
