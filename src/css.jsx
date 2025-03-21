// align-items: stretch;是什么意思
//    保证在父元素没有设置具体高度时候，子元素可以随着父元素高度的变化而撑满父元素

// 2、动画
//       1、关键帧动画 @keyframe+animation
//              关键帧动画使用@keyframes规则来定义动画的不同阶段，通过指定动画名称和不同时间点的样式，结合animation可以创建出复杂的动画效果。
//              比如：@keyframe slide {0%: {初始状态} 50% {中间状态} 100% {结束状态}}  .box{animation: slide 2s infinite}表示使用animation 属性将slide动画应用到.box元素上，持续2s循环播放；
//                   animation：不需要特定的状态改变来触发，一旦应用到元素上就会触发；比较适合于复杂的、有多个阶段的动画，比如加载动画、特效动画等；
//                             2、属性值：name duration timing-function delay iteration-count direction fill-mode play-state;
//                                       name：一般时@keyframe定义的name
//                                       duration：一个动画完成一个周期需要的时间，单位可以是s或者ms；
//                                       timing-function：动画的速度曲线，控制动画在不同阶段的播放速度，值：linear、ease、ease-in、ease-out、ease-in-out 等；
//                                       delay：动画开始前的延迟时间，单位为s或者ms；
//                                       iteration-count：动画播放的次数，可以是数字或者infinite(无限循环)
//                                       direction：动画的播放方向，值：normal（正常播放）、reverse（反向播放）、alternate（先正常播放，再反向播放，交替进行）、alternate-reverse（先反向播放，再正常播放，交替进行）
//                                       fill-mode：动画在播放前后元素的样式状态，值： none（默认值，动画播放前后元素样式不变）、forwards（动画结束后保持最后一帧的状态）、backwards（动画开始前应用第一帧的样式）、both（同时应用 forwards 和 backwards 的效果）
//                                       play-state：动画的播放状态，值：running（播放）或 paused（暂停），可以通过js来控制
//       2、过度动画：
//              过渡动画使用transition主要用于在两个状态之间创建平滑的过度效果，依赖于元素状态的改变，例如：
//              transition: .box {width: 100px; background-color: blue; transition: width 2s, background-color 2s;} .box:hover {width: 200px; background-color: red;}
//                         表示鼠标悬停在.box元素上时，宽度和背景颜色会发生过渡变化，如果没有状态变化，过渡动画就不会被触发；
//                         2、而且transition只能在元素的初始和结束状态之间创建过渡效果，没办法定义多个中间状态，只能简单的从一个属性值平滑的过渡到另一个属性值，适合简单的状态变化过过渡；
//                         3、属性值：property(要过度的css属性)、duration(过渡的持续时间)、timing-function(过渡的时间函数，例如linear、ease )、delay(过渡的延迟时间)
//       3、混合动画：
//              结合关键帧动画和过渡动画，实现复杂的动画效果；

// 4、transform 
//         transform是一种高效的视觉变换方式，不会改变元素在文档流中的位置，适合需要动态效果但不影响布局的场景；
//         1、2D
//         1.1、平移：translate
//                 translate(50px, 100px)：元素向右偏移50px，向下偏移100px、translate(50px)：元素向右平移50px
//         1.2、缩放：scale
//                 transform: scale(1.5)表示水平和垂直都放大1.5倍，也可以接受两个参数，表示水平和垂直的缩放比例；
//         1.3、旋转：rotate
//                 transform: rotate(45deg);表示元素旋转角度45deg；
//         1.4、倾斜：skew
//                 transform: skew(30deg, 20deg);表示水平倾斜30，垂直倾斜20，如果只有一个参数，只会在水平倾斜；
//         2、3D
//         2.1、平移：translate3d：表示在x、y、z轴的偏移量
//                  transform: translate3d(50px, 100px, 20px); 表示元素在x轴移动50px，在y轴移动100px，在z轴移动20px；
//         2.2、缩放：scale3d 表示x、y、z轴的缩放比例
//                  transform: scale3d(1.5, 1.5, 1.5);表示在x、y、z轴都缩放为原来的1.5倍；
//         2.3、旋转：rotate3d：表示在三维空间中旋转元素，接受四个参数，前三个分别表示x、y、z轴的方向向量，第四个表示旋转的角度；