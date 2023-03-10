
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 24
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });
//   var app = document.getElementById('app');

// var typewriter = new Typewriter(app, {
//     loop: true
// });

// typewriter.typeString('분야별 <strong>코딩 전문가들</strong>이 모여 결성된 팀')
//     .pauseFor(2500)
//     .deleteAll()
//     .typeString('<strong>기업, 세계 명문대들</strong>과 함께하는 캡스톤 프로그램')
//     .pauseFor(2500)
//     .deleteAll()
//     .typeString('<strong>Python, Java, C++ 등 </strong>, 다양한 분야의 강의')
//     .pauseFor(2500)
//     .start();

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
 const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(';')
    new Typed('.typed', {
      strings: typed_strings,
      loop: false,
      cursorChar: '|',
      typeSpeed: 75,
      startDelay: 1200,
  onStringTyped: function() {
    return elem.siblings('.typed-cursor').remove();
  }
    });
  }
var elem;

elem = $('.typed');


 const typed2 = select('.typed2')
  if (typed2) {
    let typed_strings = typed2.getAttribute('data-typed-items2')
    typed_strings = typed_strings.split(';')
    new Typed('.typed2', {
      strings: typed_strings,
      loop: false,
      cursorChar: '|',
      typeSpeed: 75,
      startDelay: 5000,

    });
  }
      
  /**
   * Initiate Pure Counter 
   */
  // new PureCounter();
      const startAnimation = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barOne", entry.isIntersecting);
        });
      };

      const observer = new IntersectionObserver(startAnimation);
      const options = { root: null, rootMargin: '0px', threshold: 1 }; 

      const elements = document.querySelectorAll('.firstBar');
      elements.forEach(el => {
        observer.observe(el, options);
      });


            const startAnimation2 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barTwo", entry.isIntersecting);
        });
      };
      const observer2 = new IntersectionObserver(startAnimation2);

      const elements2 = document.querySelectorAll('.secondBar');
      elements2.forEach(el => {
        observer2.observe(el, options);
      });

                  const startAnimation3 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barThree", entry.isIntersecting);
        });
      };
      const observer3 = new IntersectionObserver(startAnimation3);

      const elements3 = document.querySelectorAll('.thirdBar');
      elements3.forEach(el => {
        observer3.observe(el, options);
      });

                  const startAnimation4 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barFour", entry.isIntersecting);
        });
      };
      const observer4 = new IntersectionObserver(startAnimation4);

      const elements4 = document.querySelectorAll('.fourthBar');
      elements4.forEach(el => {
        observer4.observe(el, options);
      });

                  const startAnimation5 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barFive", entry.isIntersecting);
        });
      };
      const observer5 = new IntersectionObserver(startAnimation5);

      const elements5 = document.querySelectorAll('.fifthBar');
      elements5.forEach(el => {
        observer5.observe(el, options);
      });

                        const startAnimation6 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barSix", entry.isIntersecting);
        });
      };
      const observer6 = new IntersectionObserver(startAnimation6);

      const elements6 = document.querySelectorAll('.sixthBar');
      elements6.forEach(el => {
        observer6.observe(el, options);
      });

                        const startAnimation7 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barSeven", entry.isIntersecting);
        });
      };
      const observer7 = new IntersectionObserver(startAnimation7);

      const elements7 = document.querySelectorAll('.seventhBar');
      elements7.forEach(el => {
        observer7.observe(el, options);
      });

                              const startAnimation8 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barEight", entry.isIntersecting);
        });
      };
      const observer8 = new IntersectionObserver(startAnimation8);

      const elements8 = document.querySelectorAll('.eigthBar');
      elements8.forEach(el => {
        observer8.observe(el, options);
      });


                              const startAnimation9 = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("barNine", entry.isIntersecting);
        });
      };
      const observer9 = new IntersectionObserver(startAnimation9);

      const elements9 = document.querySelectorAll('.ninthBar');
      elements9.forEach(el => {
        observer9.observe(el, options);
      });

        let countdown = select('.countdown');
  const output = countdown.innerHTML;

  const countDownDate = function() {
    let timeleft = new Date(countdown.getAttribute('data-count')).getTime() - new Date().getTime();

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdown.innerHTML = output.replace('%d', days).replace('%h', hours).replace('%m', minutes).replace('%s', seconds);
  }
  countDownDate();
  setInterval(countDownDate, 1000);
})()

