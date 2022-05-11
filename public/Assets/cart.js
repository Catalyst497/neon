const   cartItems = document.querySelector('.cartitems'),
        cIChildren = document.querySelectorAll('.CI-L1'),
        otherCommodities = document.querySelector('#othercommodities'),
        show = document.querySelector('.show'),
        flashMessage = document.querySelector('.flash'),
        checkoutForm = document.querySelector('[checkout-form]'),
        otherItems = document.querySelector('.otheritems');
        let loading = document.querySelector('.loading');


   AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 70, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

AOS.init();
window.addEventListener('load', function(){
    loading.style.display = "none";
    cIChildren.forEach(function(child) {
  setInterval(() =>{
    child.classList.add('open-opacity');
  }, 10)
   setTimeout(() => {
      flashMessage.classList.remove('flash-trans');
   }, 5000)
})
})

cIChildren.forEach(function(image){
  image.querySelector('.cart-image').addEventListener('click', function(){
    show.innerHTML = '';
    show.insertAdjacentHTML('afterbegin', image.querySelector('.imposter').innerHTML);
    show.style.display = "flex";
    show.classList.add('show-show');
    let closer = show.querySelector('.close-modal');
    closer.addEventListener('click', function(){
      show.classList.remove('show-show');
      setTimeout(() => {
        show.style.display = "none";
      }, 300)
    }) 
    let minus = show.querySelector('.minus'),
        add = show.querySelector('.plus'),
        QN = show.querySelector('.number'),
        update = show.querySelector('.update');
    minus.addEventListener('click', function(){
      QN.value--;
      maths();
    })
    add.addEventListener('click', function(){
      QN.value++;
      maths();
    })
    function maths(){
      QN.value = QN.value < 1 ? 1 : Math.round(QN.value);
      update.classList.add('open');
      image.querySelector('.number').value = QN.value;
    }
  })
})

const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function checkEmail(value){
  if(!value.match(emailValidator)){
    checkoutForm.querySelector('button[type="submit"]').classList.add('remove-button');
  }else{
    checkoutForm.querySelector('button[type="submit"]').classList.remove('remove-button');
  }
}