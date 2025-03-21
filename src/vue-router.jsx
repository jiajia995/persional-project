// 1、vue-router工作原理
//        我们传统的多页面应用每次跳转都会向服务端发送http请求，打开新页面会重新下载页面css、js等资源，比较消耗性能，而且需要服务端配合路由的切换，服务器压力也会比较大，
//    为了解决这些问题，出现了SPA单页应用，整个应用只有一个index.html文件，其他的全是js、css等静态资源，在单页应用中实现跳转，不需要依赖服务端，不需要刷新页面，只更新替换
//    页面局部容器的内容。
//        vue-router就是vue官方给我们提供的实现单页应用页面跳转的前端路由，通过app.use扩展到我们的vue实例中，实现无需刷新页面就实现页面跳转；
//        工作原理：
//            1、首先我们需要定义路由配置，包含路径和组件等路由信息；
//            2、监听url的变化；
//                   hash模式、history模式
//                   1、hash模式是利用url中的hash值来切换的，也就是#后面的部分，在vue内部，使用window.addEventListener('hashchange', callback)的方式来监听hash值变化，
//               然后根据变化后的hash值匹配路由path，触发后续切换页面流程；
//                   2、history模式是使用history API来管理页面的，通过监听popstate事件，url有变化，就通过pushState和replaceState方法来不刷新页面的改变url；
//               浏览器维护了一个历史记录栈，用来记录用户的浏览历史，当用户访问一个页面，会在栈中添加一个新的条目，后退页面时会去除一个最新条目，pushState 和 replaceState
//               就是浏览器提供的用来给开发者直接操作栈的API；
//            3、监听到url变化时，vue router会根据新的url在路由配置中查找匹配的路由路径，过程中会根据路由前缀、参数、通配符等来匹配；
//            4、匹配到路径后，开始做页面切换，切换时会触发导航守卫；
//            5、通过导航守卫后，如果当前有激活的组件就先卸载该组件，然后创建挂载新组建，vue router会将匹配到的组件渲染到<router-view>组件所在的位置，view只是一个占位符组件，
//               用来显示当前路由对应的组件。
//            6、vue router支持使用<transition>标签来为页面切换添加过渡效果；
//            7、vue router会将当前的路由信息存储在一个响应式对象中，路由变化时，相关组件都能够自动更新，vue2中是在this.$router中，vue3是通过useroute函数返回一个route对象来存储。