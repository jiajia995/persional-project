// 中心管家
// 为了寻求更好的提升业务的方法和方向，需要为各代理区和中心提供一个实时查看各业务线报表的工具，我们开发了【中心管家】项目，
// 该项目中拥有27个报表和10个通知，不同的报表和通知的数据又都来源于不同的业务部门，也就是说报表和通知分别对应不同部门的后端，
// 而前端只是由我主导的3人小团队，为了节省人力成本，我们考虑使用配置化开发，利用配置文件来将封装的卡片汇总成不同报表，
// 具体过程呢，首先通过暴露echarts参数来将图表封装成比较通用、比较细粒度的组件，再把报表中每个模块封装成一个个单独的引入了对应配置的图表的卡片，
// 然后输出一套通用的接口格式给所有后端，跨部门协调后端按照格式来输出接口，最后实现一套前端组件，通过配置控制27个报表，对比其他app，人力成本降低50%；
// 这个过程中，让我觉得比较有难度的就是后端很多，并且都是来自于不同部门，他们部门内部的要求也不一致，有的还是用的鲲鹏来直接生成接口，
// 很难做到统一按照我提供的格式来输出接口，最后也是找上级、产品、直接沟通等方式解决了问题，对于协调沟通能力有很大的考验；
// 在项目开发过程中，也沉淀出了一套组件库，包括利用echarts封装的图表组件、自主研发的table组件、基于vant二次封装的常用组件等等，
// 因为公司做的是全球业务，每个项目基本每个国家都会做一个，将这种通用的最细粒度的组件沉淀到组件库，多个国家共用一套组件，也减少了冗余代码，维护起来也减少了人力成本和时间成本；
// 在折线图等有坐标轴的组件封装过程中，也遇到一些问题，比如echarts的一些属性同时使用会出现bug，像多轴线对齐和利用min和max来计算刻度值不能同时使用，
// 所以刻度值完全是自己计算的，分多种情况来计算实现，在table组件封装过程中，也遇到ios上滑动，表格会抖动问题，最后通过禁用默认滚动，完全靠代码计算距离来滚动的方式解决；
// 因为table组件是完全自主研发的，并且需要支持粘性表头和固定列，比较复杂，最终实现后比较消耗页面性能，造成页面卡顿，采用懒加载方式来优化页面解决页面卡顿问题
// 当时也有想法，想做一个低代码平台，通过可视化页面让业务自己调整报表样式，最后因为一些工时等原因未实现。
//     因为项目中代码量不是特别大，压缩打包后大概2m，而且都是报表和通知，所以在实现离线状态下依然可以查看页面时，我们选用离线包实现；
// 我们h5端将压缩后的dist包上传到oss上，然后发布一个新版本，app端每次打开h5页面时，都会调接口检测是否有新版本，如果有就先加载在线模式，开始下载最新的h5包，
// 如果检测目前就是最新版本，就直接使用插件打开离线包。


// config库、utils库
//     当时是在做业务时候，我们的app因为每个国家都有嘛，工程代码基本都是拷来拷去，一个国家配置有问题，其他国家代码全部都得跟着改，
// 或者一个国家要用到某个工具，基本上其他国家都会用到，所以就为组内开发了config库和utils库，先把目前的配置和常用utils整理进去，
// 后续大家可以自行补充需要用到的内容；
//     我这边就是负责把库从0-1先搭建起来，然后配置这块整理了config、eslint等，有提取整个配置，支持补充plugin、配置默认plugin、补充build属性等，
// 也有只针对vite配置的plugin提取配置，大家可以根据需求灵活使用；
//     另外也有对代码中的依赖做了全面升级，把代码中用到的通用依赖安装合适、跟其他依赖不冲突的高版本到库中，这样可以在安装库时直接安装高版本依赖到代码中，
// 做到既升级了依赖，又保持各项目中依赖版本一致；
//     大家在使用通用配置、utils时需要有说明文档来参考，所以我这边利用VuePress搭建了库的文档网站，输出配置和utils的使用文档供大家参考；


// 智兔(东南亚国家)
//     国外部分国家，像越南、柬埔寨、菲律宾等网络环境相对国内会差一点，而h5页面打开比较依赖网络，就会造成h5页面加载很缓慢，甚至网络不稳定时还会加载失败，
// 所以就考虑对页面的加载速度做一些优化。
//     首先从提高加载速度方面入手，因为智兔的h5项目中，功能模块还是很多的，我们使用vite打包，默认会把css、js打到对应的一个包内，
// 就会导致我们只是打开某个h5页面，加载的却是整个h5的包，页面加载缓慢，所以在打包时进行分包处理，根据类型将包进行分割，
// 这样打开某个h5页面时，只加载对应的模块包，来提高页面加载速度，另外也跟后端约定使用gzip来压缩传输数据体积，有效提高加载速度；
//     然后还有从缩小包体积方向入手，在vite中配置代码压缩plugin，例如vite-plugin-compression、vite-plugin-imagemin等来压缩打包后的代码，
// 我们当时是使用rollup-plugin-visualizer插件来查看打包后的每个包体积大小还有占比，也通过一些按需引入等手段来缩小第三方库的包体积；
// 另外因为智兔是报表类项目，页面上有很多echarts图表，如果打开页面一次渲染出来，就会有页面卡顿问题，我们当时是采用先渲染视图窗口内的图表，
// 等下滑到其他图表位置时，再去渲染对应视图窗口中的图表，来提升页面打开时候的性能问题。
//     由于网络的不稳定，为了提升用户体验，我们是想在无网络时候也能让用户看到页面，当时对比了两种离线方案，离线包和Service Worker，
// 因为离线包一次下载完整的包，不够灵活，离线状态下只能查看页面不能查看数据，而Service Worker可以灵活缓存，也可以将最后一次查询的数据缓存下来，
// 可以做到离线状态下可以查看最后一次有网络时的页面状态，虽然浏览器兼容不好，但是智兔是给代理区和中心的领导们用的，考虑很少会出现老旧机型，所以忽略了这方面问题；
// 最后利用Service Worker拦截网络请求，将请求到的资源缓存到本地，没有网络时，直接取本地缓存内容展示。


// log平台
//     我们h5有vConsole这种实时查看日志的工具，而我们组内的app端目前只能通过pc端筛选日志方式查看日志，并且使用不够友好，为了提升开发者开发体验，
// 以及产品和测试的验收测试体验，我们决定为app端开发一个可以直接在app上点开查看日志的log平台。
//     抓取日志是由app同学来做的，我这边主要负责显示页面的搭建，有些复杂页面或者长时间使用未关闭，会产生大量的日志，大概几千条，并且长短不一，
// 就导致页面在数据量非常大时，切换日志tab还有滚动时候产生卡顿问题，我们使用懒加载加载每个日志tab页面来解决切换tab卡断问题，然后是滚动卡顿问题；
//     因为日志不是像接口一次取出大量数据，而是不断往list里面追加，所以没办法利用分页来减轻页面渲染压力，经过对比选择使用虚拟滚动来优化长列表加载性能，
// 我们当时也找了几个虚拟滚动插件，效果都不是很好，所以最终决定自主开发虚拟滚动组件。
//     首先第一步，在往list中追加新日志时候，利用虚拟容器计算出新日志渲染后的高度，然后把所有日志的高度信息存在高度list中；因为每条日志渲染的容器样式都是固定的，
// 初始状态也渲染出日志item的容器放在日志池中，避免反复创建dom节点消耗性能；第二步，计算出显示区域的startIndex和endIndex，
// 从索引0开始，叠加高度list中的item，叠加到总和大于等于容器的滚动高度scrollTop为止，startIndex为叠加最后高度的index；然后从startIndex开始往下叠加高度list中的高度item，
// 直到叠加高度大于等于视口高度停止，目前的位置为endIndex；第三步，使用日志池中的日志项的虚拟dom，遍历渲染出startIndex到endIndex之间的日志项，然后容器总高度设为
// 高度list中总和的高度，将startIndex之前的所有高度和设为偏移量做出滚动效果。另外为了解决滚动位置可能位于某个日志项中间问题，在计算出startIndex之前的所有日志项高度和后，
// 在将scrollTop-计算的高度和，来得到偏移量offset，最后在为渲染视口日志设置偏移量的时候，将offset也加到偏移量里。
//     利用上面步骤是实现了虚拟滚动的效果，也解决了页面卡顿问题，但是用户的体验不是很好，滑动过快时候会有页面闪动问题，所以我们想出在渲染的视口日志区域前后增加缓冲区，
// 各自增加1/2视口高度的距离，解决了滑动过快出现空白导致闪动的问题。
//     因为这个log平台是给app端使用的嘛，所以捕获日志是app端同学做的，针对h5捕获日志也是可以做的，我们可以截取window.console来重写console方法，利用websocket来向页面
// 输出捕获到的日志。


// 官网、收款平台
//     因为我们公司比较注重售后质量，所以决定在官网和收款平台做一个在线客服聊天工具。经过调研，我们做了两个技术选型：websocket和socketio。
//     我们对比了分别使用websocket和socketio正常通信的过程，使用websocket的话，我们需要自行封装消息接收和发送事件、封装确认消息是否送到、
// 对弱网做兼容，消息发送失败自动重新发送、断网自动重连等操作，我们的聊天工具并没有很多需要自主定义的websocket内容，做这些封装比较耗时耗力，
// 而且websocket对老旧浏览器支持度也比较低，所以我们最终选用socketio库，socketio已经把这些操作封装在底层，我们只需要安装库，使用库的api即可
// 实现以上所有功能，对于低版本浏览器，会有http长轮询兜底，让我们可以更专注于业务。
//     我们的聊天工具中，有一些基础的核心功能，比如：实时消息收发，包括表情包、图片等、离线消息处理，网络不佳或者未登录时候错过的消息，我们会存储在数据库中，
// 检测到用户建立socket连接后，再批量向用户推送消息，保证消息不会丢失；发送表情包其实就是把表情包的文本发送出去，消息内容显示时，再去适配对应表情包显示；
// 另外也支持收发地理位置，先用浏览器获取到当前位置，再利用socketio来推送经纬度坐标，聊天记录中，国内使用高德API显示，国外使用谷歌显示。
//     为了提高用户体验，我们在用户切换页面tab后，给用户的会话连接保持一段时间，长时间未发送消息就断开socket连接；在这段时间内，如果用户收到消息，
// 我们会使用浏览器的消息推送功能为用户推送一条消息提醒，接收到消息时，让tab高亮来提示用户，提高用户与客服沟通效率和用户体验；
//     因为我们是售后聊天工具嘛，担心聊天过程中会有敏感信息被截取，所以采用非对称算法加密以及只能注册用户才能聊天等方法来避免敏感信息泄露；