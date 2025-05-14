import React, { useState, useEffect, useCallback } from 'react';

function RatioCalculator() {
  const [ratio, setRatio] = useState('16:9');
  const [width, setWidth] = useState('1440');
  const [height, setHeight] = useState('810');
  const [lastEdited, setLastEdited] = useState('width');

  // Get ratio values as numbers
  const getRatioValues = useCallback(() => {
    const ratioParts = ratio.split(':');
    return {
      widthRatio: parseFloat(ratioParts[0]),
      heightRatio: parseFloat(ratioParts[1])
    };
  }, [ratio]);

  // Format value (integer or decimal with 2 places)
  const formatValue = useCallback((value) => {
    if (Math.floor(value) === value) {
      return value.toString();
    } else {
      return value.toFixed(2);
    }
  }, []);

  // Calculate height from width
  const calculateHeightFromWidth = useCallback(() => {
    const widthValue = parseFloat(width);
    const { widthRatio, heightRatio } = getRatioValues();

    if (!isNaN(widthValue) && widthValue > 0) {
      const calculatedHeight = (widthValue * heightRatio) / widthRatio;
      setHeight(formatValue(calculatedHeight));
    }
  }, [width, getRatioValues, formatValue]);

  // Calculate width from height
  const calculateWidthFromHeight = useCallback(() => {
    const heightValue = parseFloat(height);
    const { widthRatio, heightRatio } = getRatioValues();

    if (!isNaN(heightValue) && heightValue > 0) {
      const calculatedWidth = (heightValue * widthRatio) / heightRatio;
      setWidth(formatValue(calculatedWidth));
    }
  }, [height, getRatioValues, formatValue]);

  // Update calculations when inputs change
  useEffect(() => {
    if (lastEdited === 'width' && width.trim() !== '') {
      calculateHeightFromWidth();
    } else if (lastEdited === 'height' && height.trim() !== '') {
      calculateWidthFromHeight();
    }
  }, [width, height, ratio, lastEdited, calculateHeightFromWidth, calculateWidthFromHeight]);

  // Handle width input change
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
    setLastEdited('width');
  };

  // Handle height input change
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setLastEdited('height');
  };

  // Handle ratio change
  const handleRatioChange = (e) => {
    setRatio(e.target.value);
    if (width.trim() !== '') {
      setLastEdited('width');
    } else if (height.trim() !== '') {
      setLastEdited('height');
    }
  };

  return (
    <section className="tool-section padding-top-30 padding-bottom-60">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2>Ratio Calculator</h2>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-4 text-center">
                <select value={ratio} onChange={handleRatioChange}>
                  <option value="21:9">21:9</option>
                  <option value="16:9">16:9</option>
                  <option value="4:3">4:3</option>
                  <option value="3:2">3:2</option>
                  <option value="1:1">1:1</option>
                </select>
                <label>Preset</label>
              </div>
              <div className="col-4 text-center">
                <input
                  type="text"
                  value={width}
                  onChange={handleWidthChange}
                  placeholder="1440"
                />
                <label>Width</label>
              </div>
              <div className="col-4 text-center">
                <input
                  type="text"
                  value={height}
                  onChange={handleHeightChange}
                  placeholder="810"
                />
                <label>Height</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RatioCalculator;
