
//编译
class Compile{
    constructor(el, vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el)
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }
    }
    nodeToFragment(el) {
        const frag = document.createDocumentFragment()
        let child
        while(child = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach( node => {
            if (this.isElement(node)) {
                // console.log(node.nodeName + '元素')
                //查找m-, @
                const nodeAttrs = node.attributes
                // console.log(Array.from(nodeAttrs))
                Array.from(nodeAttrs).forEach( attr => {
                    const attrName = attr.name
                    const exp = attr.value
                    // 指令的处理
                    if (this.isDirective(attrName)) {
                        // m-text
                        const dir = attrName.substring(2)
                        //执行指令
                        this[dir] && this[dir](node, this.$vm, exp)
                    }
                    if (this.isEvent(attrName)) {
                        //@click
                        const dir = attrName.substring(1)
                        //为dom节点绑定事件，事件名称为dir
                        this.eventHandler(node, this.$vm, exp, dir)
                    }
                })
            } else if(this.isInterpolation(node)) {
                // console.log(node + "插值")
                this.compileText(node)

            }

            //递归子节点 (有的元素里可能还有孩子节点)
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    } 
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, "text")
    }
    // 更新函数
    // dir  是一个指令 如： m-text dir-> text
    update(node, vm, exp, dir) {
        const updateFn = this[dir + "Updater"]
        //初始化
        updateFn && updateFn(node, vm[exp]) //vm[exp] 就会触发get
        //依赖收集 exp属性
        new Watcher(vm, exp, function(value) {
            updateFn && updateFn(node, value)
        })
        //观察者实例化后，在里面自主触发了get，将实例添加到收集起来
    }
    // m-text指令
    text(node, vm, exp) {
        this.update(node, vm, exp, "text") 
    }
    textUpdater(node, value) {
        node.textContent = value;
    }
    //事件处理器
    // vm 当前实例  exp当前方法名 dir当前的事件类型
    eventHandler(node, vm, exp, dir) {
        let fn = vm.$option.methods && vm.$option.methods[exp]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }

    //双向绑定的处理
    //v-model 是  v-bind:vlue = "value"  @input = "change"  的语法糖。
    model(node, vm, exp) {
        //指定input的value属性
        this.update(node, vm, exp, "model")

        //视图对模型的响应
        node.addEventListener("input", e => {
            vm[exp] = e.target.value
        })
    }
    modelUpdater(node, value) {
        node.value = value
    }

    //m-html
    html(node, vm, exp) {
        this.update(node, vm, exp, "html")
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }


    isDirective(attr) {
        return attr.indexOf("m-") === 0
    }
    isEvent(attr) {
        return attr.indexOf("@") === 0
    }
    isElement(node) {
        return node.nodeType === 1
    }
    //插值
    isInterpolation(node) {
        console.log(node.textContent)
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}

class mVue{
    constructor(option) {
        this.$option = option

        //数据响应式
        this.$data = option.data
        this.observe(this.$data)


        //模拟watcher 创建
        // new Watcher()
        // this.$data.test
        new Compile(option.el, this)

        //执行create
        if (option.created) {
            option.created.call(this)
        }


    }
    observe(value) {
        if (!value || typeof value != "object") {
            return 
        }

        //数据响应化
        Object.keys(value).forEach( key => {
            this.defineReaction(value, key, value[key])

            //属性代理 将data的属性代理到vm上
            this.proxyData(key)
        })
    }

    defineReaction(obj, key, val) {

        this.observe(val)

        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {  
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal === val) {
                    return 
                }
                val = newVal
                dep.notify()

            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}


// Dep 用来管理Watcher 依赖收集
class Dep{
    constructor() {
        this.deps = []
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

//Watcher
class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb


        Dep.target = this

        this.vm[this.key]   //触发geter 添加依赖
        Dep.target = null
    }
    update() {
        // console.log('geng')
        this.cb.call(this.vm, this.vm[this.key])
    }
}


