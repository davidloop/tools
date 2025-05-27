import React, { useState, useEffect } from 'react';

function PxToRemConverter() {
  const [baseSize, setBaseSize] = useState('16');
  const [pxValue, setPxValue] = useState('');
  const [remValue, setRemValue] = useState('');
  const [ptValue, setPtValue] = useState('');
  const [lastEdited, setLastEdited] = useState('px');

  // Convert px to rem
  const pxToRem = (px, base) => {
    return (px / base).toFixed(4);
  };

  // Convert rem to px
  const remToPx = (rem, base) => {
    return (rem * base).toFixed(2);
  };

  // Convert px to pt
  const pxToPt = (px) => {
    return (px * 0.75).toFixed(2);
  };

  // Convert pt to px
  const ptToPx = (pt) => {
    return (pt / 0.75).toFixed(2);
  };

  // Trim trailing zeros
  const trimZeros = (num) => {
    num = parseFloat(num);
    return isNaN(num) ? '' : num.toFixed(4).replace(/\.?0+$/, '');
  };

  // Update values when base size changes
  useEffect(() => {
    const base = parseFloat(baseSize) || 16;

    if (lastEdited === 'px') {
      const px = parseFloat(pxValue);
      if (!isNaN(px)) {
        setRemValue(trimZeros(pxToRem(px, base)));
        setPtValue(trimZeros(pxToPt(px)));
      }
    } else if (lastEdited === 'rem') {
      const rem = parseFloat(remValue);
      if (!isNaN(rem)) {
        const px = parseFloat(remToPx(rem, base));
        setPxValue(Math.round(px).toString());
        setPtValue(trimZeros(pxToPt(px)));
      }
    } else if (lastEdited === 'pt') {
      const pt = parseFloat(ptValue);
      if (!isNaN(pt)) {
        const px = parseFloat(ptToPx(pt));
        setPxValue(Math.round(px).toString());
        setRemValue(trimZeros(pxToRem(px, base)));
      }
    }
  }, [baseSize, pxValue, remValue, ptValue, lastEdited]);

  // Handle px input focus
  const handlePxFocus = () => {
    setLastEdited('px');
  };

  // Handle rem input focus
  const handleRemFocus = () => {
    setLastEdited('rem');
  };

  // Handle pt input focus
  const handlePtFocus = () => {
    setLastEdited('pt');
  };

  // Handle base size focus
  const handleBaseFocus = () => {
    // No need to clear the base size on focus
  };

  // Handle px input change
  const handlePxChange = (e) => {
    setPxValue(e.target.value);
    setLastEdited('px');
  };

  // Handle rem input change
  const handleRemChange = (e) => {
    setRemValue(e.target.value);
    setLastEdited('rem');
  };

  // Handle pt input change
  const handlePtChange = (e) => {
    setPtValue(e.target.value);
    setLastEdited('pt');
  };

  // Handle base size change
  const handleBaseChange = (e) => {
    setBaseSize(e.target.value);
  };

  return (
    <section className="tool-section padding-top-30 padding-bottom-60">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2>PX to REM to PT Font Size Conversion</h2>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-3 text-center">
                <input
                  type="text"
                  value={baseSize}
                  onChange={handleBaseChange}
                  onFocus={handleBaseFocus}
                  placeholder="16"
                />
                <label>Base</label>
              </div>
              <div className="col-3 text-center">
                <input
                  type="text"
                  value={pxValue}
                  onChange={handlePxChange}
                  onFocus={handlePxFocus}
                  placeholder="16"
                />
                <label>PX</label>
              </div>
              <div className="col-3 text-center">
                <input
                  type="text"
                  value={remValue}
                  onChange={handleRemChange}
                  onFocus={handleRemFocus}
                  placeholder="1"
                />
                <label>REM</label>
              </div>
              <div className="col-3 text-center">
                <input
                  type="text"
                  value={ptValue}
                  onChange={handlePtChange}
                  onFocus={handlePtFocus}
                  placeholder="12"
                />
                <label>PT</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PxToRemConverter;
