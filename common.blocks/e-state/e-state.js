modules.define('e-state', ['i-bem', 'events__channels'], function(provide, BEM, channels) {

provide(BEM.declBlock(this.name, {}, {
    init(stateName, state, needPublish = true) {
        if (!this.states) this.states = {}

        this.states[stateName] = this.clone(state)
        needPublish && this.publishState(stateName, state)
        channels(stateName).on('write', this.getWriteHandler(stateName))
    },

    getWriteHandler(stateName) {
        return (e, data) => this.setState(stateName, data.path, data.val)
    },

    publishState(stateName, state) {
        // Должно ли тут что-то публиковаться? Может, исключительно элементы должны опрашивать?
    },

    getState(stateName, pathStr = null) {
        if (!pathStr) return this.clone(this.states[stateName])

        let cur = this.states[stateName]
        const path = pathStr.split('.')

        while (path.length > 0) {
            const key = path.shift()

            if (!cur.hasOwnProperty(key)) return void 0

            cur = cur[key]
        }

        return this.clone(cur)
    },

    setState(stateName, pathStr, val) {
        let cur = this.states[stateName]
        const old = this.getState(stateName, pathStr)
        const path = pathStr.split('.')

        while (path.length > 1) {
            const subKey = path.shift()

            if (!cur.hasOwnProperty(subKey)) cur[subKey] = {}

            if (!isObject(cur[subKey])) {
                throw new Error(`Part of path ${pathStr} is not an object`)
            }

            cur = cur[subKey]
        }

        cur[path.shift()] = val

        channels(stateName).emit('read', { path: pathStr, val, old })

        function isObject(val) {
            return val === Object(val)
        }
    },

    clone(obj) {
        if (!obj) return obj

        return JSON.parse(JSON.stringify(obj))
    },
}))

})
