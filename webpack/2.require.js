// d => defineProperty 通过getter方式增加属性
function d(obj,name,get){
    Object.defineProperty(obj,name,{
        get
    })
}

// r => 让obj具有__esModule属性和 Object.property.toString.call(obj) === [Object Module]
function r(obj) {
    Object.defineProperty(obj,Symbol.toStringTag,{
        value:'Module'
    })
    
    Object.defineProperty(obj,'__esModule',{
        value:true
    })
}

// n => module可能是一个commonjs模块，也可能是一个es6模块
// es模块 会有一个 __esModule = true
function n(mod) {
   let getter = mod.__esModule ? function () {
        return mod.default
    } : function () {
        return mod
    }
}

// t => 创建一个命名空间对象
// mode & 1 : value可能是一个模块ID，也可能是一个模块对象,需要加载
// mode & 8 : 直接返回value，不需要包装成es6.module
// mode & 4 : 如果value是一ge es6Module,b也就是_esModule=true,不需要包装直接返回
// mode & 2 : 拷贝一个对象返回
function t(value,mode) {
    if(mode & 1) {
        value = __webpack_require__(value)
    }
    if(mode & 8) {
        return value
    }
    if(mode & 4) {
        if(value.__esModule){
            return value
        }
    }
    var ns = Object.create(null)
    ns.__esModule = true
    ns.default = value
    if(mode & 2) { // 如果2为true，就把value的所有属性都拷贝到ns对象上
        for(let key in value) {
            ns[key] = value[key]
        }
    }
    return ns
}