var $select = $('.select');

var _setupSelects = function() {

    $select.styler();

};

module.exports = {

    init: function() {

        if ($select.length) {
            _setupSelects();
        }

    }

};
