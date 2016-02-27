var $filters = $('.filter');

var _setupFilter = function() {

    var _resetFilter = function(e) {

        var $this = $(this),
            $container = $this.closest('.filter__type'),
            $inputs = $container.find(':input');

        e.preventDefault();

        $inputs
            .val('')
            .removeAttr('checked');

    };

    $filters.on('click', '.filter__reset', _resetFilter);

};

module.exports = {

    init: function() {

        if ($filters.length) {
            _setupFilter();
        }

    }

}
