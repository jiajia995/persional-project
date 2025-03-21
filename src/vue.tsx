// 1、为什么template中不需要加.value
//        根据源代码，我们能看到，针对响应式对象的处理是在proxyRefs函数中实现的，函数中针对不是reactive或者shallowReactive创建的对象加了层Proxy代理，
//    在对象的get方法中加了unRef处理，也就是先判断下我们要取的val是不是ref创建的，是的话自动加上.value返回，否则直接返回val。

// 2、响应式原理
//  对象类型-----reactive
const targetMap = new WeakMap()

// 副作用函数
let activeEffect;
function effect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}
// 收集依赖
const track = (target, key) => {
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if(!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    // 这里假设 activeEffect 是当前正在执行的副作用函数
    if(activeEffect) {
        dep.add(activeEffect)
    }
}

// 触发更新
const trigger = (target, key) => {
    const depsMap = targetMap.get(target)
    if(!depsMap) return
    const dep = depsMap.get(key)
    if(!dep) return
    dep.forEach(effect  => effect());
}

const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            track(target, key)
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value,  receiver) {
            const oldVal = Reflect.get(target, key, receiver)
            const result = Reflect.set(target, key, value,  receiver)
            if(oldVal !== value && result) {
                trigger(target, key)
            }
            return result
        }
    })
}

//  基本数据类型------ref
const ref = (initialValue) => {
    const refObject = {
        __v_isRef: true,
        get value() {
            track(refObject, 'value')
            return initialValue
        }
        set value(value) {
            if(initialValue !== value) {
                initialValue = value
                trigger(refObject, 'value')
            }
        }
    }
    return refObject
}

// 3、app.use()原理
//       主要是用来安装插件，扩展应用功能的方法，第一个参数可以是一个包含install方法的对象，也可以是一个函数，是对象的时候，执行对象的install方法，函数的话直接执行函数，
//    将vue实例和use中剩余参数一起传入执行的函数中；
//         1、Vue应用实例会维护一个已安装插件的列表，在安装过程中，会先检查列表中是否已存在该插件，若存在不会重复安装，不存在再往下执行；
//         2、执行对象的install方法或者直接执行函数；
//         3、安装成功后，将该插件记录到安装列表中。

// 4、create(APP)原理
//        通过分析vue.global.js文件源码，可以看出来，createApp函数是用来创建一个vue实例的，将传入的App页面作为根节点，也就是入口文件传入到render函数中渲染成dom，然后再
//    执行app.mount(#app)来挂载到app节点上；
//        在创建实例的过程中，源码中通过content.config等合并全局配置、为实例初始化像beforeCreate、created等生命周期的钩子、通过初始化reactive、ref等函数来为实例创建响应式
//    对象，同时也为实例初始化了响应式系统；
//        在创建的vue实例上，也初始化了一些函数，比如use、component、directive、mount、unmount、provide等等，我们可以使用app.use()这样的方式来调用这些提供的函数，实现
//    在创建的vue实例上扩展一些插件、组件、指令等。


