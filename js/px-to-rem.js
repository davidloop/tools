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
    
    const $base = $("[id=baseFontSize]");
    const $pixels = $("[id=pxValue]");
    const $rems = $("[id=remValue]");
    let lastEdited = 'px';

    function pxToRem(px, base) {
        return (px / base).toFixed(4);
    }

    function remToPx(rem, base) {
        return (rem * base).toFixed(2);
    }

    function trimZeros(num) {
        num = parseFloat(num);
        return isNaN(num) ? '' : num.toFixed(4).replace(/\.?0+$/, '');
    }

    $base.on('keyup', function() {
        const base = parseFloat($(this).val()) || 16;

        if (lastEdited === 'px') {
            const px = parseFloat($pixels.val());
            if (!isNaN(px)) {
                $rems.val(trimZeros(pxToRem(px, base)));
            }
        } else if (lastEdited === 'rem') {
            const rem = parseFloat($rems.val());
            if (!isNaN(rem)) {
                $pixels.val(Math.round(remToPx(rem, base)));
            }
        }
    });

    $pixels.on('focus', function() {
        lastEdited = 'px';
    });

    $pixels.on('keyup', function() {
        const pxVal = $(this).val();
        if (pxVal !== '') {
            const px = parseFloat(pxVal);
            const base = parseFloat($base.val()) || 16;
        
            if (!isNaN(px)) {
                $rems.val(trimZeros(pxToRem(px, base)));
            }
        }
    });

    $rems.on('focus', function() {
        lastEdited = 'rem';
    });

    $rems.on('keyup', function() {
        const remVal = $(this).val();
        if (remVal !== '') {
            const rem = parseFloat(remVal);
            const base = parseFloat($base.val()) || 16;

            if (!isNaN(rem)) {
                $pixels.val(Math.round(remToPx(rem, base)));
            }
        }
    });
})(jQuery);