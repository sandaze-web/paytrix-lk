const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.main')
const header = document.querySelector('.header')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')


const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}
// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
          let burger = document.querySelector('.lk-header-burger')
          if(burger) burger.classList.remove('active')

        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
      let burger = document.querySelector('.lk-header-burger')
      if(burger) burger.classList.remove('active')
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}


// Включить/выключить FLS (Full Logging System) (в работе)


document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    if(window.innerWidth > 800) {
        document.querySelector('.sidebar').addEventListener('mouseover', () => {
            document.querySelector('.sidebar').style.maxWidth =  document.querySelector('.sidebar').scrollWidth + 'px';
            document.querySelector('.sidebar').classList.add('show')

            document.querySelectorAll('.sidebar-menu__link').forEach(el => {
                el.style.maxWidth = '100%'
                el.querySelector('span').style.maxWidth = el.scrollWidth + 'px'
                el.querySelector('span').style.opacity = 1
                el.querySelector('span').style.paddingLeft = '16px'
            })
        })
        document.querySelector('.sidebar').addEventListener('mouseout', () => {
            document.querySelector('.sidebar').style.maxWidth =  '112px';
            document.querySelector('.sidebar').classList.remove('show')

            document.querySelectorAll('.sidebar-menu__link').forEach(el => {
                el.style.maxWidth = '60px'
                el.querySelector('span').style.maxWidth = 0
                el.querySelector('span').style.opacity = 0
                el.querySelector('span').style.paddingLeft = '0px'
            })
        })
    }

    if(document.querySelector('.set_data')) {
        let maxButtons = document.querySelectorAll('.set_data')
        maxButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.parentNode.querySelector('input').value = button.dataset.max
            })
        })
    }

    if(document.querySelector('.content-conditions')) {
        let programItems = document.querySelectorAll('.content-conditions')

        programItems.forEach(item => {
            item.addEventListener('click', () => {
                let content = item.querySelector('.content-conditions-answer');

                if(content.style.maxHeight){
                    content.style.maxHeight = null;
                    item.classList.remove('active');
                }else{
                    document.querySelectorAll('.content-conditions-answer').forEach(el => el.style.maxHeight = null);
                    document.querySelectorAll('.content-conditions').forEach(el => el.classList.remove('active'));
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.classList.add('active');
                }

            })
        })
    }

    if(document.querySelector('.show-password')) {
        let buttonShowPassword = document.querySelector('.show-password')
        buttonShowPassword.addEventListener('mousedown', () => {
            buttonShowPassword.parentNode.querySelector('input').type = 'text'
        })
        buttonShowPassword.addEventListener('mouseup', () => {
            buttonShowPassword.parentNode.querySelector('input').type = 'password'
        })
    }

    if(document.querySelector('.lk-header-burger')) {
        let burger = document.querySelector('.lk-header-burger'),
            menu = document.querySelector('.sidebar-nav')
        burger.addEventListener('click', () => {
            menu.classList.toggle('_is-open')
            burger.classList.toggle('active')
            toggleBodyLock(menu.classList.contains('_is-open'))
        })
    }

    if(document.querySelector('.lk-header-profile')) {
        let profile = document.querySelector('.lk-header-profile')
        profile.addEventListener('click', () => {
            document.querySelector('.lk-header-wrapper').classList.toggle('_is-open')
        })
    }
});



(() => {
    let $select = $('.form_select');
    if (!$select.length) return false;

    let $current = $select.find('.form_select__current');
    let $item = $select.find('.form_select__item');

    $current.click((e) => {
        $select.toggleClass('active');
    });

    $item.click((e) => {
        let $this = $(e.currentTarget);
        let $icon = $this.find('.form_select__item-icon');
        let $title = $this.find('.form_select__item-title');
        let $current = $this.closest('.form_select').find('.form_select__current');
        let $input = $this.closest('.form_select').find('.form_select__value');

        if ($icon.length) {
            $current.find('.form_select__item-icon').html($icon.html());
        }

        if ($title.length) {
            $current.find('.form_select__item-title').html($title.html());
        }

        $input.val($title.text());
    })

    $(document).on('click', (e) => {
        let $this = $(e.target);

        if ($this.hasClass('form_select__current')) {
            return;
        }

        $select.removeClass('active');
    });
})();


// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
// headerFixed()
// =======================================================================================================

togglePopupWindows()
// =======================================================================================================
$('img.svg').each(function () {
    let $img = $(this);
    let imgID = $img.attr('id');
    let imgClass = $img.attr('class');
    let imgURL = $img.attr('src');

    $.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        let $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});