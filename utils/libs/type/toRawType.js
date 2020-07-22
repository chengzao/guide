function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

toRawType(null); // "Null"
toRawType(/sdfsd/); //"RegExp"
