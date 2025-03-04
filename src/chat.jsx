// Socket.IO工作原理
// 1、建立连接
//        当客户端调用io尝试与服务端建立连接时候，先发送一个http请求到服务端，请求包含了几个查询参数：EIO表示SocketIo的协议的版本、transport是客户端首先尝试使用的传输协议，
//    初始是polling，因为polling的浏览器兼容性比较广泛，及时浏览器不支持websocket也可以工作；
//        服务器接收到请求后，会进行一些检查，比如协议版本，根据请求中的EIO参数，检查服务器是否支持这个版本，如果版本太旧了或者自身不支持会拒绝连接，然后返回错误信息，还有传输协议检查，
//    根据请求中的transport参数，检查自身是否支持这个协议，不支持的话会返回错误或者建议客户端尝试其他协议，最后还有安全性、资源限制、身份验证等检查，检查是否来自合法的来源、连接数是否已经达到最大连接限制等，
//    ，然后返回一个json，其中包含sid：标识本次连接的id、upgrades：服务器支持的协议列表、pingInterval：心跳检测的发送时间间隔、pingTimeout：心跳检测的超时时间；
//        客户端接收到响应后，如果支持的协议列表中包含websocket，就检查自身是否支持websocket，如果支持，客户端会重新发送一个请求，携带sid参数，sid是服务端分配的会话id，transport升级成websocket来建立连接;
//    当然在一些特殊情况下，及时服务器协议列表没有包含websocket，自身也会检查，比如在线教育平台、移动游戏应用，因为需要不断优化来支持网络授课，游戏等内容。
//        服务端接收到客户端的握手请求后，进行验证，如果验证通过就返回一个握手响应，表明已经升级到websocket连接了，这时候，连接就建立成功了。
// 2、数据传输
//        框架是通过时间驱动架构来实现数据传输的，使用emit和on来触发和监听事件实现数据交互，框架提供了默认事件，比如connect等，连接建立成功时候，可以通过监听connect来拿到回调，也可以自定义事件，
//    然后通过emit触发；
//        在传输过程中，使用心跳机制检测连接是不是稳定工作的，客户端使用服务端返回的pingInterval来间隔向服务端发送ping数据包，在超出pingTimeout间隔后，如果还没有接收到服务端的pong数据包，
//    说明连接已经断开了，否则说明连接正常工作；如果客户端或者服务端主动关闭，会触发disconnect事件，如果像网络故障、服务器崩溃等是不会触发disconnect事件的，我们可以使用心跳包检测到，
//    socketio就会自动进行重连，我们可以设置重连次数来控制重连的行为。

// 对于实时消息收发功能，包括表情包、位置、图片等不同类型消息的处理，在前端是如何实现的？如何确保各种类型消息的正确显示和交互？
//        位置：我们通过定位通过拿到用户的经纬度，然后发送给服务端，在聊天记录中显示时候，是调用了高德地图的位置显示api，国内用高德，国外用谷歌；
//        图片：先上传到oss，再把图片链接发送到服务器，聊天记录中使用image组件显示图片链接的图片；
//        表情包：我们是让ui设计了针对我们公司自己风格的表情，将图片上传到oss，再给每个表情定义一个对应的code，在数据库中存储code和图片的映射关系，选择表情发送的实际上是表情的code；

// 当用户接收消息但不在该 tab 页面时，你是如何利用浏览器推送通知来提醒用户的？有没有考虑过兼容性问题？
//        1、请求用户权限：在页面打开时候就会执行Notification.requestPermission()请求通知权限；
//        2、使用showNotification的api来推送具体消息；
//        3、监听浏览器提供的visibilitychange事件，如果visibilityState值为'hidden'说明不在该页面了

// 当遇到网络波动或连接中断的情况时，Socket.IO 是如何保证消息的完整性和一致性的？你在项目中有没有做额外的处理来增强这种稳定性？
//        1、Socket.IO会自动重连；
//        2、比如遇到网络故障时，会有一个自动重连的过程，大概有几分钟时间，在这个时间内发送的消息，会处于pending状态，等连接恢复时候，框架会自动重新发送这部分消息，但是超过这个时间，连接
//    就处于断开状态了，需要手动重新连接，在断开期间的消息是不会重新发送的；
//        3、客户端向服务端发送消息，或者服务端向客户端发送消息，都会收到一个确认消息来证明消息发送成功了，如果超时没有收到回调，就一直重新发送直到收到回调，或者连接断开；
//        4、通过浏览器的navigator.onLine检测网络连接状态，如果网络中断，检测到网络重新连接后，就发起重连，增强连接稳定性；
//        5、在网络中断时候，已经发送但未得到确认响应的消息，我们把这些消息缓存起来，在连接重新建立时候重新发送；

// 