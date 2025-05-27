import { NavLink } from 'react-router-dom';

function NavigationMain() {

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <NavLink
                        to="/"
                        className={(navData) => navData.isActive ? 'current' : ''}
                    >Font Size Converter</NavLink>
                    <NavLink
                        to="/ratio-calculator"
                        className={(navData) => navData.isActive ? 'current' : ''}
                    >Ratio Calculator</NavLink>
                    <NavLink
                        to="/modular-scale"
                        className={(navData) => navData.isActive ? 'current' : ''}
                    >Modular Font Size Scale</NavLink>
                    <NavLink
                        to="/image-compressor"
                        className={(navData) => navData.isActive ? 'current' : ''}
                    >Image Compressor</NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavigationMain;