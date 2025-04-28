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
    const $pts = $("[id=ptValue]");
    let lastEdited = 'px';

    function pxToRem(px, base) {
        return (px / base).toFixed(4);
    }

    function remToPx(rem, base) {
        return (rem * base).toFixed(2);
    }

    function pxToPt(px) {
        return (px * 0.75).toFixed(2);
    }

    function ptToPx(pt) {
        return (pt / 0.75).toFixed(2);
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
                const remValue = trimZeros(pxToRem(px, base));
                $rems.val(remValue);
                $pts.val(trimZeros(pxToPt(px)));
            }
        } else if (lastEdited === 'rem') {
            const rem = parseFloat($rems.val());
            if (!isNaN(rem)) {
                const px = parseFloat(remToPx(rem, base));
                $pixels.val(Math.round(px));
                $pts.val(trimZeros(pxToPt(px)));
            }
        } else if (lastEdited === 'pt') {
            const pt = parseFloat($pts.val());
            if (!isNaN(pt)) {
                const px = parseFloat(ptToPx(pt));
                $pixels.val(Math.round(px));
                $rems.val(trimZeros(pxToRem(px, base)));
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
                const remValue = trimZeros(pxToRem(px, base));
                $rems.val(remValue);
                $pts.val(trimZeros(pxToPt(px)));
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
                const px = remToPx(rem, base);
                $pixels.val(Math.round(px));
                $pts.val(trimZeros(pxToPt(px)));
            }
        }
    });

    $pts.on('focus', function() {
        lastEdited = 'pt';
    });

    $pts.on('keyup', function() {
        const ptVal = $(this).val();
        if (ptVal !== '') {
            const pt = parseFloat(ptVal);
            const base = parseFloat($base.val()) || 16;
    
            if (!isNaN(pt)) {
                const px = ptToPx(pt);
                $pixels.val(Math.round(px));
                $rems.val(trimZeros(pxToRem(px, base)));
            }
        }
    });
})(jQuery);