import React, { useState, useRef } from 'react';

function ImageCompressor() {
  // State variables
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalImageSize, setOriginalImageSize] = useState(0);
  const [originalImageType, setOriginalImageType] = useState('image/jpeg');
  const [quality, setQuality] = useState(80);
  const [originalInfo, setOriginalInfo] = useState('');
  const [compressedInfo, setCompressedInfo] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('compressed-image.jpg');
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  
  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file.');
      return;
    }
    
    // Store original file size and type
    setOriginalImageSize(file.size);
    setOriginalImageType(file.type);
    
    // If the image is not a supported type for canvas output, default to JPEG
    if (file.type !== 'image/jpeg' && 
        file.type !== 'image/png' && 
        file.type !== 'image/webp') {
      setOriginalImageType('image/jpeg');
    }
    
    // Update download filename
    updateDownloadFilename(file.name);
    
    // Create a FileReader to read the image
    const reader = new FileReader();
    reader.onload = (event) => {
      // Create an image element
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        
        // Display original image info
        const sizeInKB = (file.size / 1024).toFixed(2);
        setOriginalInfo(`${Number(sizeInKB).toLocaleString()} KB`);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };
  
  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    // Get the dropped files
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Process the first file
      handleFileSelect(files[0]);
    }
  };
  
  // Handle quality slider change
  const handleQualityChange = (e) => {
    setQuality(parseInt(e.target.value));
  };
  
  // Update download filename
  const updateDownloadFilename = (filename) => {
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
    
    // Update download filename
    setDownloadFilename(`${fileName}-compressed.${extension}`);
  };
  
  // Handle compression
  const handleCompression = () => {
    if (!originalImage) return;
    
    // Get compression quality
    const qualityValue = quality / 100;
    
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
    const compressedDataUrl = canvas.toDataURL(originalImageType, qualityValue);
    
    // Create compressed image element
    const compressedImg = new Image();
    compressedImg.onload = () => {
      setCompressedImage(compressedImg);
      
      // Calculate compressed size
      const base64String = compressedDataUrl.split(',')[1];
      const compressedSize = Math.ceil((base64String.length * 3) / 4) - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
      const compressedSizeKB = (compressedSize / 1024).toFixed(2);
      const savingsPercent = (100 - (compressedSize / originalImageSize * 100)).toFixed(1);
      
      // Display compressed image info
      setCompressedInfo(`${Number(compressedSizeKB).toLocaleString()} KB, ${savingsPercent}% Savings`);
      
      // Update download URL
      setDownloadUrl(compressedDataUrl);
    };
    compressedImg.src = compressedDataUrl;
  };
  
  // Handle reset
  const handleReset = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalImageSize(0);
    setOriginalImageType('image/jpeg');
    setQuality(80);
    setOriginalInfo('');
    setCompressedInfo('');
    setDownloadUrl('');
    setDownloadFilename('compressed-image.jpg');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <section className="tool-section padding-top-30 padding-bottom-60">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2>Image Compressorx</h2>
          </div>
          <div className="col-10">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="form-group margin-bottom-20 text-center">
                  <label htmlFor="imageUpload" className="margin-bottom-10">Add Image</label>
                  <div 
                    ref={dropZoneRef}
                    className={`drop-zone margin-bottom-10 ${isDragging ? 'drop-zone-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                  >
                    <input 
                      type="file" 
                      className="form-control-file" 
                      id="imageUpload" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      style={{ pointerEvents: 'none' }}
                    />
                    <div className="drop-zone-prompt">
                      <p>Drag & drop image here or click to browse</p>
                    </div>
                  </div>
                  <small className="form-text text-muted">Supports JPEG, PNG, WebP, GIF, and BMP formats. Output will be in the same format as input for JPEG, PNG, and WebP. Other formats will be converted to JPEG.</small>
                </div>
                <div className="form-group margin-bottom-30">
                  <label htmlFor="qualitySlider" className="w-100 margin-bottom-10 text-center">
                    Compression Quality: <span>{quality}%</span>
                  </label>
                  <input 
                    type="range" 
                    className="form-control-range" 
                    id="qualitySlider" 
                    min="0" 
                    max="100" 
                    value={quality}
                    onChange={handleQualityChange}
                  />
                </div>
                <div className="form-group d-flex justify-content-center margin-bottom-30">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleCompression}
                    disabled={!originalImage}
                  >
                    Compress Image
                  </button>
                  {downloadUrl && (
                    <a 
                      className="btn btn-success ml-2" 
                      href={downloadUrl} 
                      download={downloadFilename}
                    >
                      Download
                    </a>
                  )}
                  <button 
                    className="btn btn-secondary ml-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div className="card-header text-center">Original Image</div>
                      <div className="card-body text-center">
                        {originalImage ? (
                          <img 
                            src={originalImage.src} 
                            alt="Original" 
                            className="img-fluid" 
                          />
                        ) : (
                          <p className="text-muted"><small>No image selected</small></p>
                        )}
                      </div>
                      <div className="card-footer text-center">{originalInfo}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-header text-center">Compressed Image</div>
                      <div className="card-body text-center">
                        {compressedImage ? (
                          <img 
                            src={compressedImage.src} 
                            alt="Compressed" 
                            className="img-fluid" 
                          />
                        ) : (
                          <p className="text-muted"><small>Compress an image to see result</small></p>
                        )}
                      </div>
                      <div className="card-footer text-center">{compressedInfo}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageCompressor;
