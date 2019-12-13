// 简单的订阅发布
class Event{
	constructor(){
		this.callbacks = {}
	}
	$on(name,fn){
		(this.callbacks[name] || (this.callbacks[name]=[])).push(fn)
	}
	$once(name,fn){
		const on = (...args) => {
			this.$off(name,on)
			fn.apply(name, args)
		}
		on.fn = fn
		this.$on(name,on)
	}
	$emit(name,arg){
		let cbs = this.callbacks[name]
		if(cbs){
			cbs.forEach(c=>{
				c(arg)
			})
		}
	}
	$off(name){
		this.callbacks[name] = null
	}
}

let event = new Event()
event.$once("event1",function(arg) {
	console.log("事件", arg)
})
event.$emit("event1",{name:"molong"})
event.$emit("event1", { name: "molong2" })