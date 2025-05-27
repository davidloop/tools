import React, { useState, useEffect, useCallback } from 'react';

function ModularScale() {
  const [baseSize, setBaseSize] = useState('16');
  const [ratio, setRatio] = useState('1.067');
  const [scale, setScale] = useState([]);

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

  // Calculate modular scale
  const calculateScale = useCallback(() => {
    // Format value based on type
    const formatValue = (value, isPixel = false) => {
      if (isPixel) {
        // For pixel values, round to integers (no decimals)
        return Math.round(value);
      } else {
        // For rem values, round to 2 decimal places
        return Math.round(value * 100) / 100;
      }
    };
    
    const base = parseFloat(baseSize) || 16;
    const ratioValue = parseFloat(ratio) || 1.067;
    
    // Generate 10 steps (5 up, 4 down from base)
    let newScale = [];

    // Generate steps in descending order (from 5 to -4)
    for (let i = 5; i >= -4; i--) {
      const size = base * Math.pow(ratioValue, i);
      newScale.push({
        step: i,
        px: formatValue(size, true), // true for pixel values
        rem: formatValue(size / 16, false) // false for rem values
      });
    }
    
    setScale(newScale);
  }, [baseSize, ratio]);

  // Calculate scale when inputs change
  useEffect(() => {
    calculateScale();
  }, [calculateScale]);

  // Handle base size change
  const handleBaseSizeChange = (e) => {
    setBaseSize(e.target.value);
  };

  // Handle ratio change
  const handleRatioChange = (e) => {
    setRatio(e.target.value);
  };

  return (
    <section className="tool-section padding-top-30 padding-bottom-60">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2>Modular Font Size Scale</h2>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-4 text-center">
                <input
                  type="text"
                  value={baseSize}
                  onChange={handleBaseSizeChange}
                  placeholder="16"
                />
                <label>Base</label>
              </div>
              <div className="col-8 text-center">
                <select value={ratio} onChange={handleRatioChange}>
                  {Object.entries(ratios).map(([value, name]) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
                <label>Ratio</label>
              </div>
            </div>
          </div>
          <div className="col-11 margin-top-30">
            <div id="msScaleOutput">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Size (px)</th>
                    <th>Size (rem)</th>
                    <th>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {scale.map((item) => (
                    <tr key={item.step}>
                      <td><span>{item.step}</span></td>
                      <td><span>{item.px}px</span></td>
                      <td><span>{item.rem}rem</span></td>
                      <td>
                        <span style={{ fontSize: `${item.px}px` }}>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit.
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModularScale;
