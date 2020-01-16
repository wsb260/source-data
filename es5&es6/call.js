Function.prototype.call = function(context){
  context = context ? Object(context):window
  context.fn = this
  let args = [...arguments].slice(1)
  let r = context.fn(args)
  delete context.fn
  return r
}
