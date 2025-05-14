(function($) {

    function initForms() {
        var inputs = $("input");

        inputs.each(function() {
            var $input = $(this);
            $input.attr('data-placeholder', $input.attr('placeholder'));
        });

        inputs.on('focus', function() {
            $(this).attr('placeholder', '');
        }).on('blur', function() {
            $(this).attr('placeholder', $(this).attr('data-placeholder'));
        });
    }

    initForms();
    
    const $ratio = $("[id=ratio]");
    const $width = $("[id=width]");
    const $height = $("[id=height]");
    
    function getRatioValues() {
        const ratio = $ratio.val().split(':');
        return {
            widthRatio: parseFloat(ratio[0]),
            heightRatio: parseFloat(ratio[1])
        };
    }

    function formatValue(value) {
        if (Math.floor(value) === value) {
            return value.toString();
        } else {
            return value.toFixed(2);
        }
    }

    function calculateHeightFromWidth() {
        const width = parseFloat($('#width').val());
        const { widthRatio, heightRatio } = getRatioValues();

        if (!isNaN(width) && width > 0) {
            const calculatedHeight = (width * heightRatio) / widthRatio;
            $height.val(formatValue(calculatedHeight));
        }
    }

    function calculateWidthFromHeight() {
        const height = parseFloat($('#height').val());
        const { widthRatio, heightRatio } = getRatioValues();

        if (!isNaN(height) && height > 0) {
            const calculatedWidth = (height * widthRatio) / heightRatio;
            $width.val(formatValue(calculatedWidth));
        }
    }

    function debounce(func, delay) {
        let timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        };
    }

    const debouncedCalculateHeight = debounce(calculateHeightFromWidth, 300);
    $width.on('input', function() {
        if ($(this).val().trim() !== '') {
            debouncedCalculateHeight();
        }
    });

    const debouncedCalculateWidth = debounce(calculateWidthFromHeight, 300);
    $height.on('input', function() {
        if ($(this).val().trim() !== '') {
            debouncedCalculateWidth();
        }
    });

    $ratio.on('change', function() {
        calculateHeightFromWidth();
    });

    calculateHeightFromWidth();
})(jQuery);