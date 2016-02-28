var columns = $('.text-content');

var _setupColumns = function() {

    if (Modernizr.csscolumns) {
        return;
    }

    columns.multicolumn({
        columnGap: 40,
        mode: 'absolute',
        columnCount: 2
    });

};

module.exports = {
    init: function() {

        if (columns.length) {
            _setupColumns();
        }

    }
}
