var tableRowUrl = function() {
    "use strict";
    $(document.body).on('click', 'tr[data-url]', function(e) {
        var target = $(e.target);
        var url = $(this).data('url');
        if (!url)
            return false;
        if (!target.is('a') && !target.is('#fileupload') && !target.parent().is('a') && !target.hasClass('cell-checkbox') && !target.closest('.cell-checkbox').length && !target.hasClass('cell-actions') && !target.closest('.cell-actions').length)
            if ($(this).data('target') == '_blank')
                window.open(url, '_blank');
            else
                window.open(url, '_self');
    });
};
var handleModals = function() {
    "use strict";
    $('.modal').each(function() {
        $('body').append(this);
        $(this).remove;
    });
}
var handleMainMenu = function() {
    "use strict";
    navfloat();
    $('.navbar-toggle').on('click', function() {
        var btn = $(this);
        var target = $('body');
        if (!target.hasClass('main-menu-open')) {
            target.addClass('main-menu-open');
        } else {
            target.addClass('navbar-closing');
            target.removeClass('main-menu-open navbar-closing');
        }
    });
};
var handleFloatingLabels = function() {
    "use strict";
    $('.floatlabel').floatlabel();
};
function appendLabels(ele) {
    var label = $(ele).find('.packages-features-labels li');
    $('.package-features li').prepend('<span></span>');
    $(label).each(function(i) {
        var feature = $(this).html();
        $('.package').each(function() {
            $(this).find('.package-features li').eq(i).find('span').html(feature + ': ');
        });
        console.log($(this).html())
    });
}
var ColocationSlider = (function() {
    var that = {};
    that.init = function() {
        $("#conf-slider").slider({
            range: 'min',
            min: 0,
            max: 3
        });
    }
    return that;
}
)();
var iCheck = function(container) {
    $(container + ':not(.page-cpanel) input:not(.icheck)').icheck({
        checkboxClass: 'checkbox-styled',
        radioClass: 'radio-styled',
        increaseArea: '20%'
    });
}
function navfloat() {
    var prevScroll = '0'
      , curDir = 'down'
      , prevDir = 'up';
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            if ($(this).scrollTop() >= prevScroll) {
                curDir = 'down';
                if (curDir != prevDir) {
                    $('.scroll-nav').stop();
                    $('.scroll-nav').animate({
                        top: '-70px'
                    }, 300);
                    prevDir = curDir;
                    $('.scroll-nav').removeClass('shadow-nav');
                    $('.scroll-nav').removeClass('top-32');
                }
            } else {
                curDir = 'up';
                if (curDir != prevDir) {
                    $('.scroll-nav').stop();
                    $('.scroll-nav').animate({
                        top: '0px'
                    }, 300);
                    $('.scroll-nav').addClass('shadow-nav');
                    prevDir = curDir;
                }
            }
            prevScroll = $(this).scrollTop();
        } else {
            $('.scroll-nav').removeClass('shadow-nav');
            $('.scroll-nav').addClass('top-32');
        }
    });
}
var handleTooltips = function() {
    function tooltip(status) {
        if (status == 'enable') {
            $('body').tooltip({
                selector: '[data-toggle="tooltip"]',
                trigger: 'hover'
            });
        } else if (status == 'disable') {
            $('body').tooltip('destroy');
        }
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        tooltip('disable');
    else
        tooltip('enable');
};
var main = function() {
    "use strict";
    return {
        init: function() {
            handleMainMenu();
            navfloat();
            handleFloatingLabels();
            iCheck('body');
            tableRowUrl();
            handleModals();
            handleTooltips();
        }
    };
}();
$(document).ready(function() {
    "use strict";
    main.init();
    var wow = new WOW({
        boxClass: 'animate',
        animateClass: 'animated',
        offset: 200,
        mobile: false,
        live: true
    });
    wow.init();
    $('select').select2({
        containerCssClass: 'form-control'
    });
    var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isiDevice) {
        $('body > *').not('[data-toggle="tooltip"]').on('click', function() {
            $('[data-toggle="tooltip"]').tooltip('hide');
        });
    }
    var mainMenu = $('.page-header > .container > .header-navigation > li.dropdown');
    var mainMenuLink = $('.page-header > .container > .header-navigation > li.dropdown > a');
    if (!mobile) {
        mainMenu.hoverIntent({
            sensitivity: 7,
            interval: 50,
            over: function() {
                $(this).addClass('hovered');
                $('.page-header > .container > .header-navigation > li').removeClass('open');
            },
            timeout: 200,
            out: function() {
                $(this).removeClass('hovered');
            }
        });
    }
    mainMenuLink.on('click', function(e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('open')) {
            mainMenu.removeClass('open');
        }
        $(this).parent().toggleClass('open');
    });
    $('body').on('click touchstart', function(e) {
        if (!mainMenu.is(e.target) && mainMenu.has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            mainMenu.removeClass('open');
        }
    });
    $(".panel-collapse").collapse({
        toggle: false
    });
    $(".panel-heading").click(function() {
        $(this).children(".panel-collapse").collapse("toggle");
    });
    var url = document.location.toString();
    if (url.match('#')) {
        $('.subapge-tabs .nav-tabs a[href=#' + url.split('#')[1] + ']').tab('show');
    }
    $('.subapge-tabs .nav-tabs a').on('shown.bs.tab', function(e) {
        if (history.pushState) {
            history.pushState(null, null, '#' + $(e.target).attr('href').substr(1));
        } else {
            location.hash = '#' + $(e.target).attr('href').substr(1);
        }
    });
    $('#faq-accordion .panel-heading').on('click', function() {
        if (!$(this).parent().hasClass('open')) {
            $('#faq-accordion .collapse.in').collapse('hide');
            $('#faq-accordion .panel').removeClass('open');
            $(this).parent().find('.collapse').collapse('toggle');
            $(this).closest('.panel').addClass('open');
        } else {
            $('#faq-accordion .panel').removeClass('open');
            $(this).parent().find('.collapse').collapse('toggle');
        }
    });
    appendLabels('.subpage-packages');
    $('.input-group input, .input-group .form-control').focusin(function() {
        $('.input-group').addClass('focus');
    });
    $('.input-group input, .input-group .form-control').focusout(function() {
        $('.input-group').removeClass('focus');
    });
    $('.quick-menu-responsive .btn').on('click', function() {
        var target = $('.quick-menu-responsive');
        if (!target.hasClass('open')) {
            target.addClass('open');
            $('html, body').animate({}, 250);
        } else {
            target.removeClass('open');
        }
    });
    $('.search-form .form-control').on('keyup', function() {
        if ($(this).val() == 0) {
            $('.btn-reset').hide();
        } else {
            $('.btn-reset').show();
        }
    });
    $('.btn-submit').on('click', function() {
        $('.btn-submit').prop('disabled', true);
        $(this).find('.submit-label').fadeOut(100, function() {
            $('.submit-loader').fadeIn(100);
        });
    });
    $('.btn-reset').on('click', function() {
        $(this).closest('form').find('.form-control').attr('value', '');
        $(this).closest('form').submit();
    });
});
!function() {
    "use strict";
    function e() {
        c.classList.remove("disabled"),
        n.classList.remove("disabled"),
        l.scrollLeft <= 0 && c.classList.add("disabled"),
        l.scrollLeft + l.clientWidth + 5 >= l.scrollWidth && n.classList.add("disabled");
    }
    function t(e) {
        l.scrollLeft += e;
    }
    var n = document.querySelector(".btn-next")
      , c = document.querySelector(".btn-prev")
      , l = document.querySelector(".tabs .nav-tabs")
      , i = 40;
    l.addEventListener("scroll", e),
    e(),
    n.addEventListener("click", t.bind(null, i)),
    n.addEventListener("tap", t.bind(null, i)),
    c.addEventListener("click", t.bind(null, -i)),
    c.addEventListener("tap", t.bind(null, -i))
}(),
function() {
    "use strict";
    var e = document.querySelectorAll('[href=""]');
    Array.prototype.forEach.call(e, function(e) {
        e.addEventListener("click", function(e) {
            e.preventDefault()
        })
    })
}();
