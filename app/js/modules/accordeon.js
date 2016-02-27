var _setupDetails = function() {

    var $details = $('details');

    if ($details.length) {
        $details.details();
    }

}

module.exports = {
    init: function() {
        _setupDetails();
    }
}
