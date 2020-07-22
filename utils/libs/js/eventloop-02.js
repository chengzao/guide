const p1 = new Promise((resolve, reject) => {
  console.log('1'); // 1
  resolve();
})
  .then(() => {
    console.log('2'); // 2
    return new Promise((resolve, reject) => {
      console.log('3'); // 3
      resolve();
    })
      .then(() => {
        console.log('4'); // 4
      })
      .then(() => {
        console.log('5'); // 5
      });
  })
  .then(() => {
    console.log('6'); //6
  });
// 1 2 3 4 5 6
