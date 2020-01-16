Function.prototype.bind = function(context) {
  let _self = this
  let bindArgs = [].slice.call(arguments,1)
  return function(...args){
    return self.call(context,...args.concat(fnArgs))
  }
}
