/**
 * patricklensen Portfolio
 */

patricklensen.portfolio = {};

patricklensen.portfolio.initGrid = function(el){
    // isotope initialization
    var grid = el.isotope({
        isOriginLeft: !patricklensen.vars.rtl,
        itemSelector: '.pf-grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.pf-grid-sizer'
        }
    });

    // layout isotope after each image loads
    grid.imagesLoaded().progress( function() {
        grid.isotope('layout');
    });

    // isotope filter
    var filter = el.closest('.pf-wrap').find('.pf-filter');
    if (filter.length > 0) {
        var filter_btn = filter.find('button');
        var filter_btn_first = $('.pf-filter button:first-child');

        filter_btn_first.addClass('active');

        filter_btn.on('click', function () {
            filter_btn.removeClass('active');
            $(this).addClass('active');

            var filterValue = $(this).attr('data-filter');
            grid.isotope({ filter: filterValue });
        });
    }
};

patricklensen.portfolio.openPopup = function(el){
    // add opened class on html
    patricklensen.vars.html.addClass('cr-portfolio-opened');

    // append portfolio popup
    this.popup_wrapper = $('<div id="pf-popup-wrap">'+
        '<div class="pf-popup-inner">'+
        '<div class="pf-popup-middle">'+
        '<div class="pf-popup-container">'+
        '<button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button>'+
        '<div id="pf-popup-content" class="pf-popup-content"></div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');

    patricklensen.vars.body.append( this.popup_wrapper );

    // add portfolio popup content
    this.popup_content = $('#pf-popup-content');
    this.popup_content.append( el.clone() );

    // add slick slider
    $('#pf-popup-content .pf-popup-media').slick({
        dots: true,
        arrows: false
    });

    $('#pf-popup-content .pf-rel-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    // make portfolio popup visible
    this.popup_wrapper.addClass('pf-opened');

    // lock window scroll
    patricklensen.lockScroll();
};

patricklensen.portfolio.closePopup = function(el){
    // remove opened class from html
    patricklensen.vars.html.removeClass('cr-portfolio-opened');

    // make portfolio popup invisible
    this.popup_wrapper.removeClass('pf-opened');

    setTimeout(function(){
        patricklensen.portfolio.popup_wrapper.remove();
        patricklensen.unlockScroll();
    }, 500);
};
