// 1、原型链式继承
function Parent() {
    this.name = '张三'
}
Parent.prototype.age = function() {
    console.log('')
}

function Child() {}
Child.prototype = new Parent()
Child.prototype.contructor = Child

const child = new Child()

// 2、借用构造函数继承
function Parent1() {
    this.name = '张三'
}
Parent1.prototype.age = function() {
    console.log('')
}

function Child(name) {
    Parent1.call(this, name)
    this.age = 12
}

// 3、组合式继承
function Parent2() {
    this.name = '张三'
}
Parent2.prototype.age = function() {
    console.log('')
}

function Child(name) {
    Parent2.call(this, name)
    this.age = 12
}
Child.prototype = new Parent2()
Child.prototype.contructor = Child

// 4、原型式继承
const person1 = {
    name: 'defaultName',
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const child1 = Object.create(person1)

function createObject(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}
const child2 = createObject(person1)

// 5、寄生式继承
const person = {
    name: 'defaultName',
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
function createObj(obj) {
    const child1 = Object.create(obj)
    child1.age = 12
    return child
}
const child3 = createObj(person)

// 6、寄生组合式继承
function Parent5() {
    this.name = '张三'
}
Parent5.prototype.age = function() {
    console.log('')
}
function createObj2(child, parent) {
    const prototype = Object.create(parent.prototype)
    prototype.contructor = child
    child.prototype = prototype
}
function Child() {
    Parent5.call(this)
}
createObj2(Child, Parent5)

// 7、类 继承
class Parent {
    constructor() {
        this.value = 10
    }
    getValue() {
        return this.value
    }
}
class Child extends Parent {
    constructor() {
        super()
        this.value = 20
    }
    getValue() {
        // 调用父类的 getValue 方法
        const parentValue = super.getValue();
        return `Parent value: ${parentValue}, Child value: ${this.value}`;
    }
}