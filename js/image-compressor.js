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
    
    // Elements
    const $imageUpload = $('#imageUpload');
    const $dropZone = $('#dropZone');
    const $qualitySlider = $('#qualitySlider');
    const $qualityValue = $('#qualityValue');
    const $compressBtn = $('#compressBtn');
    const $downloadBtn = $('#downloadBtn');
    const $resetBtn = $('#resetBtn');
    const $originalImageContainer = $('#originalImageContainer');
    const $compressedImageContainer = $('#compressedImageContainer');
    const $originalInfo = $('#originalInfo');
    const $compressedInfo = $('#compressedInfo');
    
    // Variables
    let originalImage = null;
    let originalImageSize = 0;
    let originalImageType = 'image/jpeg'; // Default image type
    
    // Update quality value display
    $qualitySlider.on('input', function() {
        const quality = $(this).val();
        $qualityValue.text(quality + '%');
    });
    
    // Function to process the selected image file
    function processImageFile(file) {
        if (!file) return;
        
        // Check if the file is an image
        if (!file.type.match('image.*')) {
            alert('Please select an image file.');
            return;
        }
        
        // Store original file size and type
        originalImageSize = file.size;
        originalImageType = file.type;
        
        // If the image is not a supported type for canvas output, default to JPEG
        if (originalImageType !== 'image/jpeg' && 
            originalImageType !== 'image/png' && 
            originalImageType !== 'image/webp') {
            originalImageType = 'image/jpeg';
        }
        
        // Create a FileReader to read the image
        const reader = new FileReader();
        reader.onload = function(event) {
            // Create an image element
            originalImage = new Image();
            originalImage.onload = function() {
                // Display original image
                $originalImageContainer.empty().append(originalImage);
                $(originalImage).addClass('img-fluid');
                
                // Display original image info
                const sizeInKB = (originalImageSize / 1024).toFixed(2);
                $originalInfo.html(`
                    <strong>Size:</strong> ${Number(sizeInKB).toLocaleString()} KB<br>
                    <strong>Dimensions:</strong> ${originalImage.width.toLocaleString()} x ${originalImage.height.toLocaleString()} px
                `);
                
                // Enable compress button
                $compressBtn.prop('disabled', false);
            };
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    // Handle image upload via file input
    $imageUpload.on('change', function(e) {
        const file = e.target.files[0];
        processImageFile(file);
    });
    
    // Handle drag and drop events
    $dropZone.on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('drop-zone-active');
    });
    
    $dropZone.on('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drop-zone-active');
    });
    
    $dropZone.on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drop-zone-active');
        
        // Get the dropped files
        const files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            // Process the first file
            processImageFile(files[0]);
            // Update download filename
            updateDownloadFilename(files[0].name);
        }
    });
    
    // Handle compression
    $compressBtn.on('click', function() {
        if (!originalImage) return;
        
        // Get compression quality
        const quality = parseInt($qualitySlider.val()) / 100;
        
        // Use original dimensions
        const width = originalImage.width;
        const height = originalImage.height;
        
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas with original dimensions
        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0, width, height);
        
        // Get compressed image as data URL
        const compressedDataUrl = canvas.toDataURL(originalImageType, quality);
        
        // Create compressed image element
        const compressedImage = new Image();
        compressedImage.onload = function() {
            // Display compressed image
            $compressedImageContainer.empty().append(compressedImage);
            $(compressedImage).addClass('img-fluid');
            
            // Calculate compressed size
            const base64String = compressedDataUrl.split(',')[1];
            const compressedSize = Math.ceil((base64String.length * 3) / 4) - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
            const compressedSizeKB = (compressedSize / 1024).toFixed(2);
            const savingsPercent = (100 - (compressedSize / originalImageSize * 100)).toFixed(1);
            
            // Display compressed image info
            $compressedInfo.html(`
                <strong>Size:</strong> ${Number(compressedSizeKB).toLocaleString()} KB<br>
                <strong>Dimensions:</strong> ${width.toLocaleString()} x ${height.toLocaleString()} px<br>
                <strong>Savings:</strong> ${savingsPercent}% (${Number(((originalImageSize - compressedSize) / 1024).toFixed(2)).toLocaleString()} KB)
            `);
            
            // Update download button
            $downloadBtn.attr('href', compressedDataUrl);
            $downloadBtn.show();
        };
        compressedImage.src = compressedDataUrl;
    });
    
    // Function to update download filename
    function updateDownloadFilename(filename) {
        if (!filename) return;
        
        // Get original filename without extension
        const fileName = filename.replace(/\.[^/.]+$/, "");
        
        // Determine file extension based on image type
        let extension = 'jpg';
        if (originalImageType === 'image/png') {
            extension = 'png';
        } else if (originalImageType === 'image/webp') {
            extension = 'webp';
        }
        
        // Update download button filename
        $downloadBtn.attr('download', fileName + '-compressed.' + extension);
    }
    
    // Handle file name for download when using file input
    $imageUpload.on('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        updateDownloadFilename(file.name);
    });
    
    // Reset functionality
    function resetImageCompressor() {
        // Reset variables
        originalImage = null;
        originalImageSize = 0;
        originalImageType = 'image/jpeg';
        
        // Reset UI elements
        $imageUpload.val('');
        $qualitySlider.val(80);
        $qualityValue.text('80%');
        $compressBtn.prop('disabled', true);
        $downloadBtn.hide();
        
        // Reset image containers
        $originalImageContainer.html('<p class="text-muted">No image selected</p>');
        $compressedImageContainer.html('<p class="text-muted">Compress an image to see result</p>');
        
        // Reset info sections
        $originalInfo.empty();
        $compressedInfo.empty();
    }
    
    // Handle reset button click
    $resetBtn.on('click', function() {
        resetImageCompressor();
    });
    
})(jQuery);
