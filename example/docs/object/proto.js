// __proto__ 兼容
function getProto(attr) {
  if (attr.__proto__) {
    return attr.__proto__;
  } else {
    return attr.constructor.prototype;
  }
}

/*example:
    function Hello(){}
    var hello = new Hello();
    getProto(hello).sayHello=function(){
      console.log('hello');
    }
    hello.sayHello();

 */
