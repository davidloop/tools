import { Routes, Route } from 'react-router-dom';
import PxToRemConverter from '../pages/PxToRemConverter.jsx';
import RatioCalculator from '../pages/RatioCalculator.jsx';
import ModularScale from '../pages/ModularScale.jsx';
import ImageCompressor from '../pages/ImageCompressor.jsx';

function PageRouter() {
    return (
        <Routes>
            <Route path="/" element={<PxToRemConverter />} />
            <Route path="/ratio-calculator" element={<RatioCalculator />} />
            <Route path="/modular-scale" element={<ModularScale />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
        </Routes>
    );
}

export default PageRouter;
