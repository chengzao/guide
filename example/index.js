const options = {
  threshold: 1.0,
};
const target = document.querySelector('.target');
const callback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(target);
