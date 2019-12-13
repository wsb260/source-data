class Vue {
	constructor(options){
		this.$el = options.el
		this.$data = options.data
		let computed = options.computed
		let methods = options.methods
		if(this.$el){
			new Observer(this.$data)
			// 挂载computed
			for(let key in computed){
				Object.defineProperty(this.$data,key,{
					get:()=>{
						return computed[key].call(this.$data)
					}
				})
			}
			// 挂载方法methods
			for(let key in methods){
				Object.defineProperty(this,key,{
					get:()=>{
						return methods[key]
					}
				})
			}
			// vm代理vm.$data
			this.proxyVm(this.$data)
			// 核心编译
			new Compiler(this.$el,this)
		}    
	}
	proxyVm(data){
		for(let key in data){
			Object.defineProperty(this,key,{
				get(){
					return data[key]
				},
				set(newVal){
					if(data[key] !== newVal){
						data[key] = newVal
					}
				}
			})
		}
	}
}

class Compiler {
	constructor(el, vm) {
		this.el = this.isElementNode(el) ? el : document.querySelector(el)
		this.vm = vm

		let fragment = this.node2Fragment(this.el)

		this.compiler(fragment)

		this.el.appendChild(fragment)
	}
	isElementNode(node) {
		return node.nodeType === 1
	}
	node2Fragment(node) {
		let fragment = document.createDocumentFragment()
		let firstChild
		while ((firstChild = node.firstChild)) {
			// appendChild具有移除性
			fragment.appendChild(firstChild)
		}
		return fragment
	}
	compiler(node) {
		let childs = node.childNodes;
		[...childs].forEach(child => {
			if (this.isElementNode(child)) {
				this.compilerElement(child)

				this.compiler(child)
			} else {
				this.compilerText(child)
			}
		})
	}
	isDirect(node) {
		return node.startsWith("v-")
	}
	compilerElement(node) {
		let attrs = node.attributes;
		[...attrs].forEach(attr => {
			let { name, value: expr } = attr
			if(this.isDirect(name)){
				let [, directive] = name.split("-")
				// eslint-disable-next-line no-undef
				compilerUtil[directive](node, expr, this.vm)
			}
		})
	}
	compilerText(node){
		let content =node.textContent
		if(/\{\{.+?\}\}/.test(content)){
			compilerUtil["text"](node,content,this.vm)
		}
	}
}
// eslint-disable-next-line no-undef
compilerUtil = {
	getVal(vm, expr) {
		return expr.split(".").reduce((data, current) => {
			return data[current]
		}, vm.$data)
	},
	setVal(vm, expr, value) {
		return expr.split(".").reduce((data, current, index, arr) => {
			if (index === arr.length - 1) {
				return (data[current] = value)
			}
			return data[current]
		}, vm.$data)
	},
	model(node, expr, vm) {
		let fn = this.updater["modelUpdater"]
		new Watcher(vm, expr, function(newVal) {
			fn(node, newVal)
		})
		node.addEventListener("input", e => {
			let value = e.target.value
			this.setVal(vm, expr, value)
		})
		let value = this.getVal(vm, expr)
		fn(node, value)
	},
	getContentValue(vm, expr) {
		// 遍历表达式，将内容重新替换一个完整的内容
		return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
			return this.getVal(vm, args[1])
		})
	},
	text(node, expr, vm) {
		let fn = this.updater["textUpdater"]
		let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
			new Watcher(vm, args[1], () => {
				fn(node, this.getContentValue(vm, expr))
			})
			return this.getVal(vm, args[1])
		})
		fn(node, content)
	},
	html() {},
	updater: {
		modelUpdater(node, value) {
			node.value = value
		},
		textUpdater(node, value) {
			node.textContent = value
		},
		htmlUpdater(node, value) {
			node.innerHTML = value
		}
	}
}

class Observer{
	constructor(data){
		this.observer(data)
	}
	observer(data){
		
		if(data && typeof data === "object"){
			for (let key in data) {
				this.defineReactive(data, key, data[key])
			}
		}
	}
	defineReactive(obj,key,value){
		this.observer(value)
		this.dep = new Dep()
		Object.defineProperty(obj,key,{
			get:()=>{
				Dep.target && this.dep.addSubs(Dep.target)
				return value
			},
			set:(newVal)=>{
				if(value !== newVal){
					this.observer(newVal)
					value = newVal
					this.dep.notify()
				}
			}
		})
	}
}

class Watcher{
	constructor(vm,expr,cb){
		this.vm = vm
		this.expr = expr
		this.cb = cb
		this.oldValue = this.getVal(this.vm,this.expr)
	}
	getVal(){
		Dep.target = this
		let value = compilerUtil.getVal(this.vm,this.expr)
		Dep.target = null
		return value
	}
	updater(){
		let newVal = compilerUtil.getVal(this.vm,this.expr)
		if(this.oldValue !== newVal){
			this.cb(newVal)
		}
	}
}

class Dep{
	constructor(){
		this.watchers = []
	}
	addSubs(watcher){
		this.watchers.push(watcher)
	}
	notify(){
		this.watchers.forEach(watcher => {
			watcher.updater()
		})
	}
}