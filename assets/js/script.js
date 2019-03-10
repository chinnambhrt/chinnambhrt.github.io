const spa =
    (function () {

        var mod = {};

        time_since_birth = 0;

        // Zooming factor of background image
        background_zoom_delta = 0.095;

        // revert back to original background size
        background_current_zoom = 100;

        // indicator if zooming has started
        zoom_in_timer_started = false;
        /*
            this is called when the dom is loaded
            this method includes the initializers requied for the page
        */
        mod.initialize_components = function () {

            // monitor the scrolling
            $(document).scroll(mod.body_scroll_monitor);

            // monitor all link clicks
            $('#nav-bar .menu-item').click(mod.menuItem_click);

            // navbar animation
            $('#nav-bar').addClass('nav-animation');

            // look at what location pageY is in and update the visibility of navbar
            var page_top = $(document).scrollTop;

            // if its not the height grater than offset of div-1
            var container_height = $('#home-container').offset().height;

            //if its above the home-container height/show the div
            if (container_height >= page_top) {

                console.log('not in home container');

                $('#spa-navbar').css({
                    'display': 'block'
                });
            }

            mod.adjust_menu(page_top);

            // hover actions here
            $('p.animate-icon').hover(mod.hover_on_location_about, mod.hover_off_location_about);

            // Zooming handler
            $('div.container#home-container').hover(function () {
                if (!this.zoom_in_timer_started) {
                    this.zoom_in_timer = setInterval(mod.zoom_in_handler, 100);
                    this.zoom_in_timer_started = true;
                } else return;
            }, mod.hover_out_handler);
        }


        mod.adjust_menu = function (current_top) {

            // keep track of heights
            var height_track = 0;

            // get all sections
            var sections = $('.section');

        }

        /*
            Actions that are to be done on a page scroll
        */
        mod.body_scroll_monitor = function (e) {

            // current y of the page
            var page_y = $(this).scrollTop();

            // console.log('mail ' + page_y);

            // hide the nav bar if its the home-page
            var home_container_offset = $('#home-container').offset().top;

            // console.log(home_container_offset);
            var home_container_height = $('#home-container').height();

            // add the heights
            var home_container_threshold = home_container_offset + home_container_height;

            // console.log(home_container_threshold);

            // check
            if (page_y <= (home_container_threshold - 100)) {

                // hide if still in home container
                $('#nav-bar').css({
                    'display': 'none'
                });

            } else {
                // show if not in home container
                $('#nav-bar').css({
                    'display': 'block'
                });

            }

            // adjust the menu active based on the container in
            mod.adjust_menu(page_y);

        }




        /*
            handle the menu-item clicks
         */
        mod.menuItem_click = function () {
            // get the data target attribute
            var target = $(this).attr("data-target");

            if(target === 'ext'){
                var route = $(this).attr('route-to');
                window.open(route,'_blank');
                return;
            }

            //get the offset
            var target_top = $('#' + target).offset().top;

            // scroll to target
            $('html, body').animate({
                scrollTop: $("#" + target).offset().top + 1
            }, 500);

            $('#nav-bar .menu-item').removeClass('active');

            $(this).addClass('active');

        }


        mod.hover_on_location_about = function (e) {
            //console.log('hello');
            $(this).children('i').addClass('animated').addClass('rubberBand');
            // $('p.animate-icon>i').addClass('animated').addClass('rubberBand');
        }

        mod.hover_off_location_about = function () {
            $(this).children('i').removeClass('animated').removeClass('rubberBand');
        }


        // starts zooming into the background
        mod.zoom_in_handler = function () {
            // alert('hi');
            background_current_zoom += background_zoom_delta;

            if (background_current_zoom > 125) {
                clearInterval(this.zoom_in_timer);
                return;
            }

            $('div.container#home-container').css({
                'background-size': background_current_zoom + '%'
            });

        }

        mod.hover_out_handler = function () {
            background_current_zoom = 100;
            clearInterval(this.zoom_in_timer);
            this.zoom_in_timer_started = false;
            $('div.container#home-container').css({
                'background-size': 'cover'
            });
        }

        return mod;

    })();