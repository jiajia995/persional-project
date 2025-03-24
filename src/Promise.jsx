const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class CustomPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulFilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            this.status = FULFILLED
            this.value = value
            this.onFulFilledCallbacks.forEach(cb => cb())
        }
        const reject = (reason) => {
            this.status = REJECTED
            this.reason = reason
            this.onRejectedCallbacks.forEach(cb => cb())
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

        const newPromise = new Promise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value)
                    resolvePromise(newPromise, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }
            const handleRejected = () => {
                try {
                    const result = onRejected(this.reason)
                    resolvePromise(newPromise, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }
    
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    handleFulfilled()
                }, 0);
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    handleRejected()
                }, 0);
            }
            if(this.status === PENDING) {
                this.onFulFilledCallbacks.push(onFulfilled)
                this.onRejectedCallbacks.push(onRejected)
            }
        })

        return newPromise
    }

    catch(reject) {
        return this.then(null, reject)
    }

    static resolve(value) {
        return new CustomPromise((resolve) => resolve(value))
    }
    static reject(reason) {
        return new CustomPromise((_, reject) => reject(reason))
    }
}
function resolvePromise(promise, result, resolve, reject) {
    if(promise === result) {}
    if(result instanceof CustomPromise) {
        result.then(resolve, reject)
    } else {
        resolve(result)
    }
}