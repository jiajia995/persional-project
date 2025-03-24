// 1、防抖
function debounce(func, delay) {
    let timer = null
    return function(...args) {
        const context = this
        if(timer) {
            clearTimeout(timer)
        }
        setTimeout(() => {
            func.apply(context, args)
        }, delay);
    }
}
// 2、节流
function throttle(func, delay) {
    let timer = null
    return function(...args) {
        if(!timer) {
            func.apply(this, args)
            timer = setTimeout(() => {
                clearTimeout(timer)
            }, delay);
        }
    }
}

// 3、实现call
// 把call方法定义在Function上，这样所有函数都可以使用
Function.prototype.customCall = function(context = window, ...args) {
    // 定义一个唯一值作为key，避免与已有属性冲突
    const fnSymbol = Symbol('fn')
    context[fnSymbol] = this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}
Function.prototype.customApply = function(context = window, [...args]) {
    const fnSymbol = Symbol('fn')
    context[fnSymbol] = this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}
Function.prototype.customBind = function(context = window, ...args) {
    const self = this
    return function(...newArgs) {
        return self.apply(context, [...args, ...newArgs])
    }
}
