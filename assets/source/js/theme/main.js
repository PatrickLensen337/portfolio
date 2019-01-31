(function ($) {
    "use strict";

    $(function () { // start: document ready

        /**
         *  Set Global Vars
         */
        patricklensen.initGlobalVars();

        /**
         *  Navigation
         */
        if (patricklensen.vars.html.hasClass('crt-nav-on')) { // Check If Nav Exists

            // Scrolled Navigation ( large screens )
            if ( Modernizr.mq('(min-width: '+patricklensen.vars.screenMd+')') && patricklensen.nav.height !== 'auto' ) {
                patricklensen.nav.initScroll( $('#crt-nav-scroll') );
            }

            // Sticky Navigation
            patricklensen.nav.makeSticky();

            // Navigation Tooltips
            if(patricklensen.nav.tooltip.active){
                $('#crt-nav a').hover(function () {
                    patricklensen.nav.tooltip.show( $(this) );
                },function () {
                    patricklensen.nav.tooltip.hide();
                });
            };

            // Anchor Navigation
            $('#crt-nav').onePageNav({
                changeHash: true,
                filter: ':not(.external)'
            });
        }

        /**
         *  Fixed Side Box
         */
        patricklensen.sideBox.makeSticky();

        /** Portfolio */
        var pf_grid = $('.pf-grid');

        if (pf_grid.length > 0) {

            // init portfolio grid
            patricklensen.portfolio.initGrid(pf_grid);

            // open portfolio popup
            $(document).on('click', '.pf-project', function() {
                var id = $(this).attr('href');

                patricklensen.portfolio.openPopup( $(id) );

                return false;
            });

            // close portfolio popup
            $(document).on('touchstart click', '.cr-portfolio-opened #pf-popup-wrap', function (e) {
                var container = $('#pf-popup-content');

                // if the target of the click isn't the container... nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    patricklensen.portfolio.closePopup();
                }
            });
        }

        /** Components */
        // init sliders
        patricklensen.slider( $(".cr-slider") );

        // init carousel
        patricklensen.carousel( $(".cr-carousel") );
    }); // end: document ready



    $(window).on('resize', function () { // start: window resize

        // Re Init Vars
        patricklensen.vars.windowW = $(window).width();
        patricklensen.vars.windowH = $(window).height();
        patricklensen.vars.windowScrollTop = $(window).scrollTop();

        // Sticky Navigation
        patricklensen.nav.makeSticky();

        // Sticky Side Box
        patricklensen.sideBox.makeSticky();

    }); // end: window resize



    $(window).on('scroll', function () { // start: window scroll

        // Re Init Vars
        patricklensen.vars.windowScrollTop = $(window).scrollTop();

        // Sticky Navigation
        patricklensen.nav.makeSticky();

        // Sticky Side Box
        patricklensen.sideBox.makeSticky();

        // Remove Tooltip
        if(patricklensen.nav.tooltip.el.length > 0){
            patricklensen.nav.tooltip.el.remove();
        }

    }); // end: window scroll



    $(window).on('load', function () { // start: window load

    }); // end: window load

})(jQuery);