modules.define('my-form', ['i-bem-dom', 'BEMHTML', 'e-state'], function(provide, BEMDOM, BEMHTML, eState) {

provide(BEMDOM.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
                this.stateName = 'myForm'

                eState.init(this.stateName, {
                    f1: '1111',
                    f2: '2222',
                    nested: {
                        first: '',
                        second: '',
                    },
                    list1: ['123'],
                    list2: []
                })

                this.findChildBlock('printBtn').domElem.on(
                    'click',
                    () => console.log(eState.getState(this.stateName))
                )
            }
        }
    },
}))

})
