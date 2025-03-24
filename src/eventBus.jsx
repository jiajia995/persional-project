class EventBus {
    constructor() {
        this.events = {}
    }

    on(eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }

    emit(eventName, ...args) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                if(callback && callback instanceof Function) {
                    callback(args)
                } 
            });
        }
    }

    off(eventName, callback) {
        if(this.events[eventName]) {
            const arr = [...this.events[eventName]]
            this.events[eventName] = arr.fill(e => e !== callback)
        }
    }
}