class Compile{
    constructor(el, vm) {
        this.$vm = vm

        this.compile(el)
    }
    compile(el) {
        const templete = document.querySelector(el)
        const frag = this.nodeToFrag(templete)
        this.compileTemplate(frag)
        templete.appendChild(frag)
    }
    nodeToFrag(node) {
        let frag = document.createDocumentFragment()
        let child
        while(child = node.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }
    compileTemplate(el) {
       const childNodes = el.childNodes 
       Array.from(childNodes).forEach(node => {
           if (this.isElement(node)) {
            //    console.log(`元素${node.nodeName}`)
            const nodeAttr = node.attributes
            Array.from(nodeAttr).forEach(attr => {
               const attrName = attr.name
               const attrvalue = attr.value
               if (this.isDirective(attrName)) {
                   const dir = attrName.substring(2)

                   this[dir] && this[dir](node, this.$vm, attrvalue)
               } else if (this.isEvent(attrName)) {

               }
            });
           } else if (this.isInterpolation(node)) {
               this.compileText(node)
           }

           if (node.childNodes && node.childNodes.length > 0) {
               this.compileTemplate(node)
           }
       })
    }
    update(node, vm, exp, type) {
        const updateFn = this[type + "Update"]
        updateFn && updateFn(node, vm.$data[exp])

        new Watcher(vm, exp, function(value) {
            updateFn && updateFn(node, value)
        })

    }
    text(node, vm, exp) {
        this.update(node, vm, exp, "text") 
    }
    textUpdate(node, value) {
        node.textContent = value
    }
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, "text")
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
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

}


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

class Watcher{
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('gengxingl')
    }
}

class mVue{
    constructor(option) {
        this.$el = option.el
        this.$data = option.data

        //数据响应
        this.observe(this.$data)

        //编译模板
        new Compile(this.$el, this)
        // new Watcher()
        // this.$data.name
    }
    observe(data) {
        if (typeof data !== "object") {
            return
        }

        Object.keys(data).forEach( key => {
            this.definedActive(data, key, data[key])
        })

    }
    //数据劫持
    definedActive(obj, key, value) {

        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return value
            },
            set(newVal) {
                if (newVal === value) {
                    return
                }
                value = newVal
                dep.notify()
            }
        })
    }
}