// 1、使用Promise实现红绿灯交替亮
function redLight() {
    return new Promise((resolve) => {
        console.log('红灯亮')
        setTimeout(() => {
            console.log('红灯暗')
            resolve()
        }, 3000);
    })
}
function greenLight() {
    return new Promise((resolve) => {
        console.log('绿灯亮')
        setTimeout(() => {
            console.log('绿灯暗')
            resolve()
        }, 2000);
    })
}
function yellowLight() {
    return new Promise((resolve) => {
        console.log('黄灯亮')
        setTimeout(() => {
            console.log('黄灯暗')
            resolve()
        }, 1000);
    })
}
function trafficLights() {
    redLight().then(greenLight).then(yellowLight).then(trafficLights)
}
trafficLights()

// 2、