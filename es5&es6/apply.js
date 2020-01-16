Function.prototype.apply = function(context){
  context = context ? Object(context) : window
  context.fn = this
  let args = [...arguments][1]
  if(!args) {
    return context.fn()
  }
  let r = context.fn(args)
  delete context.fn
  return r
}
