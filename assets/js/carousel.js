var CAROUSEL =
    (function () {

        var crl = {};

        var car_items = 0;

        var carousel_items;

        crl.init_carousel = function () {
            carousel_items = $('div.carousel>div');
            car_items = carousel_items.length - 1;
            var selected_carousel_index = car_items = Math.floor(car_items / 2);
            var selected_carousel_item = carousel_items[selected_carousel_index];

            crl.select(selected_carousel_item);
            crl.previous($(selected_carousel_item).prev());
            crl.next($(selected_carousel_item).next());

            // register click
            $('div.carousel>div').click(crl.carousel_selected);

            console.log('hello from carousel.js');
        }

        crl.carousel_selected = function (e) {
            crl.select($(this));
            crl.previous($(this).prev());
            crl.next($(this).next());
        }

        crl.previous = function (carousel_item) {
            if (carousel_item == null) {
                return;
            } else {
                $('.carousel-item-previous').removeClass();
                $(carousel_item).removeClass().addClass('carousel-item-previous');
            }
        }

        crl.next = function (carousel_item) {
            if (carousel_item == null) {
                // crl.next($(carousel_items[0]));
                return;
            } else {
                $('.carousel-item-next').removeClass();
                $(carousel_item).removeClass().addClass('carousel-item-next');
            }
        }

        crl.select = function (carousel_item) {
            if (carousel_item == null) {
                return;
            } else {
                $('.carousel-item-selected').removeClass();
                $(carousel_item).removeClass().addClass('carousel-item-selected');
            }
        }

        return crl;

    })();
