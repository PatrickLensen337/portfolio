/**
 * patricklensen Navigation
 */

// Navigation With Scroll and Arrow
patricklensen.nav.initScroll = function( el ){
    // Set Nav Height
    // patricklensen.nav.scroll = el;

    el.height(el.height()).animate({height: patricklensen.nav.height}, 700, function(){

        // Mouse Scroll
        el.mCustomScrollbar({
            axis: "y",
            scrollbarPosition: "outside"
        });
    });

    // Arrow Scroll
    if (patricklensen.nav.arrow){
        $("#crt-nav-tools").removeClass('hidden');

        $("#crt-nav-arrow").on("click", function () {
            el.mCustomScrollbar('scrollTo', '-='+patricklensen.nav.height);
        });
    }
};

// Sticky Navigation
patricklensen.nav.exists = false;
patricklensen.nav.makeSticky = function(){

    // check sticky option, device type and screen size
    if ( this.sticky.active && !patricklensen.vars.mobile && Modernizr.mq('(min-width: ' + patricklensen.vars.screenMd + ')') ) {

        // check if nav nodes exists
        if ( this.exists ){

            // check if window scroll pass element
            if ( patricklensen.vars.windowScrollTop > this.wrap.offset().top ) {
                this.el.css({
                    'top': this.sticky.top + 'px',
                    'left': this.wrap.offset().left,
                    'width': this.wrap.width(),
                    'bottom': 'auto',
                    'position': 'fixed'
                });
            } else {
                this.el.css({
                    'top': '0',
                    'left': 'auto',
                    'width': 'auto',
                    'bottom': 'auto',
                    'position': 'relative'
                });
            }
        } else {
            this.el = $('#crt-nav-inner');
            this.wrap = $('#crt-nav-wrap');

            if ( this.el.length > 0 && this.wrap.length > 0 ) {
                this.exists = true;
            }
        }
    }
};

// Navigation Tooltips
patricklensen.nav.tooltip.timer = 0;
patricklensen.nav.tooltip.el = '';

patricklensen.nav.tooltip.show = function(current){
    patricklensen.nav.tooltip.timer = setTimeout(function () {

        patricklensen.nav.tooltip.el = $('<div class="crt-tooltip"></div>');

        // Init vars
        var top = current.offset().top;
        var left = current.offset().left;
        var right = left + current.outerWidth();
        var width = current.outerWidth();
        var height = 0; //(ace.nav.tooltip.height() - $(this).height() )/2;

        // Append tooltip
        patricklensen.vars.body.append( patricklensen.nav.tooltip.el );

        // Set tooltip text
        patricklensen.nav.tooltip.el.text( current.data('tooltip') );

        // Positioning tooltip
        if (right + patricklensen.nav.tooltip.el.outerWidth() < patricklensen.vars.windowW) {
            patricklensen.nav.tooltip.el.addClass('arrow-left').css({"left": right + "px", "top": (top + height) + "px"});
        } else {
            patricklensen.nav.tooltip.el.addClass('arrow-right text-right').css({
                "left": (left - patricklensen.nav.tooltip.el.outerWidth() - 10) + "px",
                "top": (top + height) + "px"
            });
        }

        // Show Tooltip
        patricklensen.nav.tooltip.el.fadeIn(150);

    }, 150);
};

patricklensen.nav.tooltip.hide = function(){
    clearTimeout(patricklensen.nav.tooltip.timer);
    if (patricklensen.nav.tooltip.el.length > 0) {
        patricklensen.nav.tooltip.el.fadeOut(150, function () {
            patricklensen.nav.tooltip.el.remove();
        });
    }
};