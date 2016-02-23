var formModule = (function() {

    var exportObj = {};

    var init = function() {
        _setupListeners();
        _setupDetails();
        _setupFilter();
    }

    var _setupListeners = function() {

    }

    var _setupDetails = function() {

        var $details = $('details');

        if ($details.length) {
            $details.details();
        }

    }

    var _setupFilter = function() {

        var $filters = $('.filter');

        if ($filters.length) {

            var _resetFilter = function(e) {

                var $this = $(this),
                    $container = $this.closest('.filter__type'),
                    $inputs = $container.find(':input');

                e.preventDefault();

                $inputs
                    .val('')
                    .removeAttr('checked');

            }

            $filters.on('click', '.filter__reset', _resetFilter);

        }

    }

    exportObj.init = init;

    return exportObj;

})();
