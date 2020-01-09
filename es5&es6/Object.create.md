### Object.create()实现原理
> Object.create(obj)方法创建一个空对象,然后把该对象的__proto__指向obj 

```
Object.create = function(obj){
  function Fn(){}
  Fn.prototype = obj
  return new Fun()
}
```
