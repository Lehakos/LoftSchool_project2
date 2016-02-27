var $catalog = $('.catalog');


var _clickListener = function(e) {

    var $this = $(this),
        $target = $(e.target),
        $viewSwitch = $target.closest('.catalog__view-switch'),
        $goods = $this.find('.catalog__goods-wrapper .goods');

    var _changeView = function() {

        var $viewList = $viewSwitch.closest('.catalog__view-list'),
            $allSwitches = $viewList.find('.catalog__view-switch');

        e.preventDefault();


        if ($viewSwitch.hasClass('catalog__view-switch_active')) {
            return;
        }

        if ($viewSwitch.hasClass('catalog__view-switch_list')) {
            $goods
                .removeClass('goods_view_block goods_view_table')
                .addClass('goods_view_list');

        } else if ($viewSwitch.hasClass('catalog__view-switch_block')) {

            $goods
                .removeClass('goods_view_list goods_view_table')
                .addClass('goods_view_block');

        } else if ($viewSwitch.hasClass('catalog__view-switch_table')) {

            $goods
                .removeClass('goods_view_list goods_view_block')
                .addClass('goods_view_table');
        }

        $allSwitches.removeClass('catalog__view-switch_active');

        $viewSwitch.addClass('catalog__view-switch_active');

    };

    if ($viewSwitch.length) {
        _changeView();
    }

};


module.exports = {

    init: function() {

        $catalog.on('click', _clickListener);

    }

};
