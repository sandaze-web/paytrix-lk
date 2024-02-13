//=include ./helpers/elementsNodeList.js
//=include ./helpers/toggleBodyLock.js
//=include ./modules/index.js

// Включить/выключить FLS (Full Logging System) (в работе)


document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
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