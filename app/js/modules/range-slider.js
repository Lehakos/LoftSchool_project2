var $rangeSlider = $('.range-slider');

var _setupRangeSliders = function() {

    $rangeSlider.each(function() {

        var $this = $(this),
            widget = this.querySelector('.range-slider__widget'),
            min = $this.data('min'),
            max= $this.data('max'),
            step = $this.data('step');

        noUiSlider.create(widget, {
            'start': [min, max],
            'step': step,
            'connect': true,
            'range': {
                'min': min,
                'max': max
            },
            format: wNumb({
                decimals: 0
            })
        });

        if ($this.hasClass('range-slider_inputs')) {

            var $inputs = $this.find('.range-slider__input'),
                $inputMin = $inputs.filter('.range-slider__input_min'),
                $inputMax = $inputs.filter('.range-slider__input_max');

            widget.noUiSlider.on('update', function(values, handle) {

                var value = values[handle];

                if (handle) {
                    $inputMax.val(value);
                } else {
                    $inputMin.val(value);
                }

            });

            $inputs.on('change', function() {

                var $input = $(this),
                    ind = $inputs.index($input),
                    newVal = ind === 0 ? [$input.val(), null] : [null, $input.val()];

                widget.noUiSlider.set(newVal);
            });

        }

    });

};

module.exports = {

    init: function() {

        if ($rangeSlider.length) {
            _setupRangeSliders();
        }

    }

};
