// 项目名称：中心管家
// 担任角色：owner、前端开发
// 主要职责：负责项目0-1的搭建，整体配置化开发的设计与落地，主导3人团队参与开发，团队整体进度的把控和推进，各模块代码的开发与维护工作，
// 项目成果：获得业务部门的高度认可
// 技术栈：vue、vite、vant、echarts、组件库、h5
// 项目概述：
// 中心管家是一个供各代理区查看报表数据的app，共有27个报表，10个通知页面，报表和通知数据分别由公司内不同业务部门提供，涉及公司内所有业务部门；
// 采用配置化开发，并通过将报表不同模块封装成不同卡片，同时使用config文件将不同卡片汇总成不同报表；
// 抽取通用组件到组件库中，包括二次封装echarts、从0-1封装支持固定表头和固定列的table、二次封装vant等组件；
// 采用懒加载方式汇总图表成报表，解决页面引入组件过多造成的卡顿问题；
// 采用离线包解决离线状态下无法访问页面，以及弱网情况下页面加载缓慢问题；
// 难点：27个报表和10个通知均有不同后端支持，协调所有后端配合给出所要求的接口格式难度很大，最终通过直接会议沟通、寻求多方协助等方式解决


// 项目名称：配置库
// 担任角色：owner
// 主要职责：负责项目0-1的搭建，代码的开发与维护工作
// 项目成果：组内各vue项目中大面积接入使用，提高各项目中配置维护效率
// 技术栈：Monorepo、pnpm、rollup、VuePress
// 项目概述：
// 组内项目的配置基本大差不差，为了解决代码冗余、配置维护繁琐问题，开发出配置库供组内接入使用
// 抽取vite、eslint、ts配置等到配置库中
// 利用VuePress，从0-1搭建配置库使用文档页面，并输出使用文档，配置库维护文档等
// 难点：组内项目众多，不同项目配置版本可能不同，推动大家修改代码，主动接入配置库有点难度，最终采用自己先在多个项目中接入，给大家展示优点并且可以稳定运行，再借助上级力量推动大家接入


// 项目名称：log平台
// 担任角色：前端页面开发
// 主要职责：负责页面的开发和页面大数据情况下的性能优化
// 项目成果：组内app项目全面接入log平台，并稳定使用，正在逐步推往公司层面app
// 技术栈：vue、vite、vant
// 项目概述：
// 为解决app端看日志不方便问题，与团队协作开发出类似vConsole的日志查看工具
// 开发log展示页面，并使用懒加载、列高不固定虚拟滚动等方式优化页面大数据量时性能
// 开发vite插件，捕获h5日志通过WebSocket发送到app端插件起的websocket服务上，然后统一显示在log页面上
// 难点：每条日志内容长度不固定，数据量又可能会产生几千条，没有找到好用的虚拟滚动组件，只能自行封装虚拟滚动组件解决

// 项目名称：官网、收款平台
// 担任角色：前端页面开发
// 主要职责：负责在线客服功能的开发与维护工作
// 项目成果：在公司的openday被评为优秀项目
// 技术栈：vue、vite、vant
// 项目概述：
//     公司为了提高产品品质，比较注重售后质量，所以打开做一款在线客服聊天工具；
//     对比websocket和socketio，最终选用socketio来搭建聊天工具；
//     支持实时消息收发，包括表情包、位置、图片等，同时支持处理离线状态下消息完整不丢失；
//     用户接收消息，但是不在该tab页面时，浏览器推送通知提醒；
//     使用非对称算法加密消息来防止敏感信息泄露；
//     将工具封装在npm包中，可以安装在官网、crm等平台，并且通过配置实现售前、售后客服功能。


// 项目名称：广告投放活动页
// 担任角色：前端页面开发
// 主要职责：负责app内h5活动页的开发和维护工作
// 项目成果：
// 技术栈：vue、webpack
// 项目概述：
//     为了给app增加新用户，同时提高用户转化率，我们在app中推出例如抽奖等多款活动，

// 项目名称：马来外场h5
// 担任角色：owner、前端开发
// 主要职责：负责项目从0-1的搭建
// 项目成果：沉淀组内首个react项目
// 技术栈：react、vite、zustand、antd-mobile
// 项目概述：
// 为马来国家的外场app开设h5项目，向上级申请使用react语言来开发
// 低代码开发：封装通用axios、storage等utils，分页查询、倒计时等hook，在antd-mobile上二次封装通用组件等
// 难点：组内首个react项目，需要做合适技术选型、运维发布平台协调、组内成员支持等工作，经由技术选型对比、多方协调等解决

