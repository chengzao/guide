const p1 = new Promise((resolve, reject) => {
  console.log('promise1'); // 1
  resolve();
})
  .then(() => {
    console.log('then11'); // 3
    new Promise((resolve, reject) => {
      console.log('promise2'); // 4
      resolve();
    })
      .then(() => {
        console.log('then21'); // 6
      })
      .then(() => {
        console.log('then23'); // 8
      });
  })
  .then(() => {
    console.log('then12'); // 7
  });

const p2 = new Promise((resolve, reject) => {
  console.log('promise3'); // 2
  resolve();
}).then(() => {
  console.log('then31'); // 5
});
