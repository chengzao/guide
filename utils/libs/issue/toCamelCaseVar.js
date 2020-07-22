const toCamelCaseVar = (variable) => {
  variable = variable.replace(/[\_|-](\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return variable.slice(0, 1).toLowerCase() + variable.slice(1)
}

// console.log(toCamelCaseVar('Foo_style_css')) // fooStyleCss
