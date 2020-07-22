const p1 = new Promise((resolve, reject) => {
  console.log('1'); // 1
  resolve();
})
  .then(() => {
    console.log('2'); // 3
    new Promise((resolve, reject) => {
      console.log('3'); // 4
      resolve();
    })
      .then(() => {
        console.log('4'); // 6
      })
      .then(() => {
        console.log('5'); // 8
      });
  })
  .then(() => {
    console.log('6'); // 7
  });

const p2 = new Promise((resolve, reject) => {
  console.log('7'); // 2
  resolve();
}).then(() => {
  console.log('8'); // 5
});
// 1 7 2 3 8 4 6 5
