const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const frontView = document.querySelector('.shirt-front-view');
const backView = document.querySelector('.shirt-back-view');

nextBtn.addEventListener('click', () => {
  frontView.classList.remove('active');
  backView.classList.add('active');
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'block';
});

prevBtn.addEventListener('click', () => {
  backView.classList.remove('active');
  frontView.classList.add('active');
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'block';
});