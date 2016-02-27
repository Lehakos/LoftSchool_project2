var $gallery = $('.gallery');

var _changeBigImg = function(e) {

    var $this = $(this);

    e.preventDefault();

    if ($this.hasClass('.gallery__switch_active')) {
        return;
    }

    var $gallery = $this.closest('.gallery'),
        $switches = $gallery.find('.gallery__switch'),
        $bigImg = $gallery.find('.gallery__display img'),
        newSrc = $this.data('src');

    $switches.removeClass('gallery__switch_active');

    $this.addClass('gallery__switch_active');

    $bigImg.attr('src', newSrc);

};

module.exports = {
    init: function() {

        $(document).on('click', '.gallery__switch', _changeBigImg);

    }
}
