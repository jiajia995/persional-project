// 1、冒泡、捕获、委托
//        捕获：与事件冒泡相反，事件从最不具体的元素（比如document）开始，逐层向下传播到最具体的元素(触发事件的元素)，就像水面深入水底；
//            1、一个事件比如点击触发时候，浏览器会通过父子关系遍历，并且采用深度优先策略，一直往深里遍历，比如先从window进入document对象，document是window的一个重要属性，代表整个html文档，
//               document下有<html>标签，<html>下又有<body>标签，浏览器会逐级向下直到最深层次的叶子，然后回溯到上一节点，继续往下遍历；
//                   如果事件捕获过程中，检查到某个元素绑定了处理方法，会先向下捕获到目标元素，在冒泡过程中执行这些方法；如果想要在捕获过程中检查到处理方法时立即执行方法，
//               可以设置window.addEventListener('click',() => {}， true)第三个参数设为true，会立即执行；
//            2、浏览器在遍历每个元素的时候，都会检查当前元素的位置和大小以及坐标，来判断当前元素是否是事件的触发点，如果是，就一直向下遍历，直到到达最内层元素，这个元素就是目标元素，此时，
//               事件直接作用在目标元素上，捕获阶段结束，进入目标阶段；
//        冒泡：事件是从最具体的元素开始，逐层向上传播到最不具体的元素（通常是document、window），就像水滴的气泡慢慢升到水面一样；
//            3、找到目标元素后，就开始向上传播，从目标元素开始，依次向上传播到父元素、祖先元素，直到window，每到一个祖先元素，就会检查有没有绑定该事件的处理方法，如果有就立即执行，之后再继续传播；
//               如果某个方法中阻止了事件冒泡，冒泡会终止，不再向上传播；
//        委托：委托利用了事件冒泡的原理，将事件处理程序绑定在一个父元素，而不是子元素上，当子元素触发事件时候，事件会冒泡到父元素上，然后触发父元素上绑定的事件处理程序；
//             常用场景：1、比如点击输入框需要弹出选择器，点击范围需要包含文本和输入框，这时候就可以使用委托，把处理程序绑定在文本和输入框的外层div上，就可以在点击文本和输入框时候都能触发同一个事件；
//             不支持场景：focus、blur，因为不支持冒泡；
//             优势：1、通过将事件处理函数绑定在父元素上，来减少事件处理程序的数量，从而降低内存占用；
//                  2、对于动态添加元素的情况，可以避免每次添加新元素时候都重新绑定事件，提高性能；
//        阻止事件：
//            1、event.stopPropagation()
//                  比如有三层元素：outer、middle、inner，在middle元素绑定了click的监听，设置了stopPropagation，那么outer元素、middle元素click时候，向下捕获到了middle时候，
//               终止了继续操作，所以后续就不会进入目标阶段和冒泡阶段；
//            2、event.preventDefault()
//                  阻止默认事件，比如link、a点击会跳转，使用preventDefault，可以阻止这些默认行为，但是事件会继续传播；
//            3、pointer-events
//                  阻止鼠标事件，阻止元素响应鼠标事件，包括点击、悬停等；
//        dom事件流：事件捕获阶段、目标阶段、事件冒泡阶段

// 2、apply、call、bind
//      apply、call
//        相同点：用于调用函数时置顶函数体内的this值，从而实现不同对象之间的方法共享；
//        区别：两者的参数传递方式不同，call是第一个参数是this的指向，后面将需要传递的参数一一传递；apply是第一个是this指向，第二个是数组或者类数组对象，表示所有需要传递的参数；
//             性能上call会相对来说好一点，因为apply还有解析参数数组的步骤；
//      bind
//        用于创建一个新函数，在调用时会将this绑定在第一个参数对象上，可以在执行bind时候，传入部分参数作为预设参数，手动调用新函数执行，会使用绑定的this和预设的参数，同时在调用时也可以继续传入剩余参数；
//      应用场景
//          1、需要在不同都西昂上下文中调用函数时，三者都可以用来改变函数内部的this指向’
//          2、可以让一个对象借用另一个对象的方法，例如类数组对象借用数组的方法const arrayLike = { 0: 'a', 1: 'b', length: 2 }; Array.prototype.push.call(arrayLike, 'c');

// 3、h5适配低端机
//      1、使用@vitejs/plugin-legacy插件，配置target来做浏览器兼容；
//      2、使用flex布局，让布局自使用不同手机屏幕大小；
//      3、使用postcss-pxtorem将px转换为rem，而且还有autoprefixer功能，可以自动为css属性添加适应不同浏览器的前缀，来适应不同主流浏览器；
//         但是postcss-pxtorem无法转换内联样式的px，
//      4、通过设置 <meta> 标签的 viewport 属性，控制页面在不同设备上的缩放和布局
//      5、低端机因为硬件性能是有限的，所以在代码开发时候要考虑性能方便，避免一些比较复杂、逻辑嵌套比较深的计算；
//      6、使用vite-plugin-imagemin插件来压缩图片，使用vite-plugin-compression来压缩代码，以减少代码体积，在弱网情况下，网络差，同时我们也采用离线包来解决弱网问题；

// 4、0.1+0.2!==0.3，js精度丢失问题
//        原因：
//            js中的数字是采用IEEE 754双精度64位浮点数标准来存储的，数字被分为符号位、指数位还有尾数位(用于表示位数的是52位)；js在计算时候，是先将十进制转换为二进制在计算，许多小数比如0.1转为二进制，
//        没办法用有限的位数来表示，计算机存储空间又是有限的嘛，所以尾数超出52位的都会被截取，那我们在计算0.1+0.2，两个都是截取的近似数，计算的结果必然也是近似数，转换回十进制必然会有美景度丢失问题。
//        解决：
//            将小数转换为整数计算，或者使用例如math.js的第三方库。

// 5、跨域解决方案
//        1、JSONP
//              JSONP这种跨域技术比较古老了，他是利用script标签的src属性不受tongyuancelve显示的特点，将回调函数添加在数据请求的url后面，服务端将需要返回的数据作为参数传递给回调函数，来实现数据传输，
//           只能使用get方式，不安全，容易被攻击
//        2、Cors
//              现在比较主流的处理方式，
//        3、代理服务器
//               一般在本地调试阶段用的多
//        4、WebSocket

// 6、Service Worker、Web Worker
//        Web Worker：是html5提供的一种在浏览器中实现多线程的机制，可以在主线程之外创建一个独立的工作线程，在这个线程上执行一些比较耗时的操作，避免影响主线程；
//              const worker = new Worker('worker.js');
//              向工作线程发送消息：worker.postMessage('Hello, Worker!');
//              监听主线程发送的消息：worker.onmessage = function (event) { console.log('接收到工作线程的消息:', event.data); }
//              监听错误： worker.onerror = function (error) { console.error('工作线程发生错误:', error.message); }
//              终止web worker：worker.terminate();
//              工作线程代码：self.onmessage = function (event) { console.log('接收到主线程的消息:', event.data); self.postMessage('Hello, Main Thread!'); }
//              使用console、onerror来调试错误
//        Service Worker：是一种在浏览器后台运行的脚本，独立于网页，页面关闭后也能持续运行，拥有自己的生命周期，其实本质上，他算是web应用程序、浏览器、网络之间的代理服务器；
//              1、可以缓存网站资源，比如html、css、js等文件，网络离线时候，Service Worker可以拦截请求直接从缓存中获取资源，比如新闻类页面，没有网络依然可以访问；
//              2、拦截请求，然后做一些请求优化处理，比如优先取缓存资源，提高页面加载速度；
//              3、可以结合浏览器的推送API，接收服务器推送的消息，及时web应用没有在前台打开也可以接收；

// 7、js脚本延迟加载
//        defer：<script src="script1.js" defer></script> 浏览器遇到带有defer属性的<script>标签时，会继续解析html文档，同时并行下载脚本文件，文档解析完成后，再按照脚本
//               出现的顺序依次执行这些脚本；
//               适用于需要在文档解析完成后执行，并且脚本之间有依赖关系，需要按顺序执行的情况；
//        async：<script src="script1.js" async></script> 浏览器遇到带async属性的<script>标签时，会继续解析html文档同时并行下载脚本文件，下载完成后会立即执行，执行过程会阻塞文档解析，
//               多个async文件不会按照html中的顺序执行，哪个文件先下载好就先执行哪个；
//               适用于那些独立的，不依赖文档内容和脚本顺序的脚本，比如第三方广告脚本；
//        动态创建<script>标签：通过js创建，然后添加到文档中，使用js控制业务逻辑，可以在需要的时候再加载脚本；

// 8、web应用中如何对静态资源加载失败情况做降级处理
//         1、在加载js脚本时候，可以监听onerror事件，一旦失败立即切换备用资源路径；
//         2、使用浏览器缓存策略，通过设置资源的Cache-Control头字段，从缓存中取资源；
//         3、使用Service Worker拦截网络请求，资源加载失败时候，就返回备用资源；

// 9、html中前缀为data-开头的元素是什么
//        1、html规范中有一些对元素的预定义属性，比如id、class、href等，而data-是为了用户满足特定业务需求，存储一些非标准的额外数据，比如用户id、配置参数、状态等等；
//    我们可以先获取到元素，再使用div.dataset.userName来存储，获取数据也可以使用dataset获取，也可以直接使用div.getAttribute('data-user-name')来获取；同样，在设置css样式时候，
//    也可以[data-user-status="active"] {}为该特定元素赋值。
//        2、为什么使用data-user-id='123'，而不使用id='123'？
//        因为id是用来为元素设置唯一标识的。相当于元素的身份证，如果为id设置数据，会导致id不唯一，破坏html结构，甚至会引发ccss/js错误；而data-user-id相当于元素的“背包”，专门
//    用来携带数据的，读取数据高效，并且语义清晰。

// 10、图片懒加载
//         延迟图片加载，等到图片即将进入用户可见区域，也就是浏览器视口才加载，这样减少初始页面加载时候的资源消耗，来提高初始页面加载速度，提高用户体验；
//         1、原生html实现
//                 <img src="placeholder.jpg" loading="lazy">
//                 html5为img标签提供了loading="lazy"，浏览器支持该属性时，浏览器会自动实现图片的懒加载，存在兼容性问题；
//         2、InterSection Observer API
//                 通过这个API可以检测元素是否进入视口，const imageObserver = new IntersectionObserver((entries, observer) => {entries.forEach(entry => { if (entry.isIntersecting) }}
//            通过entry.isIntersecting判断元素是否进入视口，进入后，把图片src替换成真是路径，而且该API是异步的，不会阻塞主线程，浏览器兼容也好，现代浏览器基本都支持。
//         3、监听页面scroll事件，元素即将滚动到视口，就替换图片路径，但是监听scroll事件比较影响页面性能。

// 11、cookie由哪些部分组成
//        名称(Name唯一标识符)+值(Value与名称相关联的数据)+域(Domain指定cookie所属域名，只有在指定域名和其子域名下可以访问cookie，防止不同域名之间访问和篡改cookie)+路径(Path可以访问cookie的路径)+
//        过期时间(Expire/Max-Age Cookie的有效期限 Expire：过期时间点 Max-Age开始到过期的事件间隔)+安全标志(Secure只能通过https发送)+HttpOnly标志(加了标志后js脚本无法读取，可以避免XSS攻击)

// 12、为什么spa应用都会提供一个hash路由

// 13、package.json中的devDependencies和dependencies有什么区别
//         dependencies：生产环境中正常运行必须的依赖包；
//               1、使用npm install eslint 默认安装到dependencies
//               2、部署到生产时，该字段的依赖包是必须被安装的，执行npm install --production 可以只安装改字段的依赖包；
//               3、NODE_ENV 环境变量设置为production时，执行npm install默认安装改字段依赖；
//         devDependencies：开发和测试阶段需要的依赖包，在生产环境非必须，比如：eslint；
//               1、使用npm install eslint --save-dev  安装到dev依赖中
//               2、直接执行npm install，会默认安装两个字段的依赖包。

// 14、什么是CI/CD

// 15、Babel的原理是什么