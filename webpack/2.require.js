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