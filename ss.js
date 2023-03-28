const desplegable = document.querySelector('.desplegable');

desplegable.addEventListener('mouseover', function() {
  desplegable.classList.add('mostrar');
});

desplegable.addEventListener('mouseout', function() {
  desplegable.classList.remove('mostrar');
});