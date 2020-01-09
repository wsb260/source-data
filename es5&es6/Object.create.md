### Object.create()实现原理
> Object.create(obj)方法创建一个空对象,然后把该对象的__proto__指向obj 

+ 第一种写法
```
Object.create = function(obj){
  function Fn(){}
  Fn.prototype = obj
  return new Fun()
}
```

+ 第二种写法(ie不兼容__proto__)

```
Object.create = function(obj){
  let oo = {}
  oo.__proto__ = obj
  return oo
}
```
