modules.define('my-input', ['i-bem-dom', 'BEMHTML', 'e-state', 'input', 'events__channels'], function(provide, BEMDOM, BEMHTML, eState, Input, channels) {

provide(BEMDOM.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
                this._input = this.findChildBlock(Input)
                this._stateName = this.params.stateName
                this._model = this.params.model

                this._input._events().on('change', this.sendVal.bind(this))
                channels(this._stateName).on('read', this.updateVal.bind(this))

                this._input.setVal(eState.getState(this._stateName, this._model))
            }
        }
    },

    sendVal() {
        channels(this._stateName).emit(
            'write',
            {
                path: this._model,
                val: this._input.getVal()
            }
        )
    },

    updateVal(e, data) {
        if (data.path !== this._model) return

        this._input.setVal(data.val)
    },
}))

})
