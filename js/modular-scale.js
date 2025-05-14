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
    
    const $baseSize = $("[id=msBaseSize]");
    const $ratio = $("[id=msRatio]");
    const $scaleOutput = $("[id=msScaleOutput]");
    
    // Common typographic ratios
    const ratios = {
        "1.067": "Minor Second (15:16)",
        "1.125": "Major Second (8:9)",
        "1.200": "Minor Third (5:6)",
        "1.250": "Major Third (4:5)",
        "1.333": "Perfect Fourth (3:4)",
        "1.414": "Augmented Fourth (1:√2)",
        "1.500": "Perfect Fifth (2:3)",
        "1.618": "Golden Ratio (1:1.618)",
        "1.667": "Major Sixth (3:5)",
        "1.778": "Minor Seventh (9:16)",
        "1.875": "Major Seventh (8:15)",
        "2.000": "Octave (1:2)"
    };
    
    // Populate ratio dropdown
    function populateRatioDropdown() {
        for (const [value, name] of Object.entries(ratios)) {
            $ratio.append(`<option value="${value}">${name}</option>`);
        }
        // Set default to Minor Second
        $ratio.val("1.067");
    }
    
    // Calculate modular scale
    function calculateScale() {
        const baseSize = parseFloat($baseSize.val()) || 16;
        const ratio = parseFloat($ratio.val()) || 1.067;
        
        // Generate 10 steps (5 up, 4 down from base)
        let scale = [];

        // Generate steps in descending order (from 5 to -4)
        for (let i = 5; i >= -4; i--) {
            const size = baseSize * Math.pow(ratio, i);
            scale.push({
                step: i,
                px: formatValue(size, true), // true for pixel values
                rem: formatValue(size / 16, false) // false for rem values
            });
        }
        
        displayScale(scale);
    }
    
    function formatValue(value, isPixel = false) {
        if (isPixel) {
            // For pixel values, round to integers (no decimals)
            return Math.round(value);
        } else {
            // For rem values, round to 2 decimal places
            return Math.round(value * 100) / 100;
        }
    }
    
    function displayScale(scale) {
        let html = '<table class="table table-striped">';
        html += '<thead><tr><th>Step</th><th>Size (px)</th><th>Size (rem)</th><th>Preview</th></tr></thead>';
        html += '<tbody>';
        
        // Display the scale (already in descending order)
        scale.forEach(item => {
            html += `<tr>
                <td><span>${item.step}</span></td>
                <td><span>${item.px}px</span></td>
                <td><span>${item.rem}rem</span></td>
                <td><span style="font-size: ${item.px}px;">Lorem ipsum dolor sit amet consectetur adipiscing elit.</span></td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        $scaleOutput.html(html);
    }
    
    // Initialize
    populateRatioDropdown();
    calculateScale();
    
    // Event listeners
    $baseSize.on('input', calculateScale);
    $ratio.on('change', calculateScale);
    
})(jQuery);
