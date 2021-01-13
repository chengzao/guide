Function.prototype._bind = function(context) {
  let func = this;
  let params = [].slice.call(arguments, 1);
  let Nop = function() {};
  let bound = function() {
    params = params.concat([].slice.call(arguments, 0));
    return func.apply(this instanceof Nop ?
      this : context, params);
  }
  Nop.prototype = func.prototype;
  bound.prototype = new Nop();
  return bound;
}
