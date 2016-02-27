$(function() {

    var rangeSlidersModule = require('./modules/range-slider.js');
    var accordeonModule    = require('./modules/accordeon.js');
    var filterModule       = require('./modules/filter.js');
    var galleryModule      = require('./modules/gallery.js');
    var catalogModule      = require('./modules/catalog.js');
    var selectModule      = require('./modules/select.js');

    rangeSlidersModule.init();
    accordeonModule.init();
    filterModule.init();
    galleryModule.init();
    catalogModule.init();
    selectModule.init();

});
