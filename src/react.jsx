// 1、生命周期(类组件)
//        1、挂载阶段
//               static getDerivedStateFromProps：在组件实例化和接收到新props时调用，用来根据props更新state，返回一个对象来更新state，返回null表示不更新；
//               render：是一个纯函数，用来返回一个JSX元素来描述组件的UI结构；
//               componentDidMount：在组件挂载到DOM之后调用，经常用来处理一些比较依赖dom的操作，比如像echarts绑定配置等；
//        2、更新阶段
//               static getDerivedStateFromProps(props, state)：在接收到新props时调用，来更新state；
//               shouldComponentUpdate(nextProps, nextState)：用来判断组件是否需要更新，返回true表示更新，false表示不更新，可以用来做组件性能优化；
//               render：重新渲染组件
//               getSnapshotBeforeUpdate(prevProps, prevState)：在render之后，dom即将更新但未更新时候调用，可以获取更新前的dom信息，可以返回任意类型的值，返回的数据会作为第三个参数传入componentDidUpdate
//                       使用场景：比如更新后想保持在更新前的list滚动位置，可以在该生命周期中返回当前list滚动位置，在componentDidUpdate中将新的list滚动到该位置；
//               componentDidUpdate：在组建更新完成后调用，可以用来操作更新后的dom或者一些其他操作
//        3、卸载阶段
//               componentWillUnmount：在组件卸载之前调用，可以用来清理掉一些闭包、定时器、取消网络请求等操作；
//        react16及以后：
//               componentDidCatch：用来捕获子组件中抛出的错误；
//               static getDerivedStateFromError(error)：错误发生后调用，用来更新state显示错误界面；
//   函数组件：没有生命周期，使用hooks来实现类似效果
//       1、useEffect(() => {}, [])表示在组件挂载后执行一次，实现了componentDidMount的效果；
//       2、useEffect(() => {}, [aa])表示在aa更新时执行回调，实现了componentDidUpdate的效果；
//       3、useEffect(() => { return {} }, [])中的return表示在组件卸载时执行的回调，实现componentWillUnmount的效果；
//       4、const [stateValue, setStateValue] = useState(propValue); useEffect(() => {setStateValue(props)}, [props]);表示在props变化后更新state的值，实现了getDerivedStateFromProps的效果；
//       5、const prevCountRef = useRef();prevCountRef.current的值是持久化的，所以可以使用current来保存一个需要保存的数据，在更新之后来使用，达到getSnapshotBeforeUpdate的效果；