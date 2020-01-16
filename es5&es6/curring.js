function curring(fn,length){
  length = length || fn.length
  return function(..args){
    if(args.length >= length) {
      return fn(...args)
    }
    return curring(fn.bind(null,..args),length-args.length)
  }
}
