window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  let leftImage = document.querySelector('.presentation-image-left');
  let rightImage = document.querySelector('.presentation-image-right');


  leftImage.style.transform = 'translate(' + (-50 + scrollPosition * 0.05) + '%, -50%) rotate(-10deg)';
  rightImage.style.transform = 'translate(' + (50 - scrollPosition * 0.05) + '%, -50%) rotate(10deg)';
});