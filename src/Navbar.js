import './Navbar.css';
import img from './1.png';
import { Link } from "react-router-dom";
function Navbar () {
    return(
        <>
            <div class="container">
                <div class="navbar d-flex">
                    <div class="logo">
                        <img src={img} alt=""></img>
                    </div>
                    <div class="nav-items">
                        <ul class="nav-items-list d-flex">
                            <li><a class="alink" href="">Products</a></li>
                            <li><a class="alink" href="">Customer</a></li>
                            <li><a class="alink" href="">Pricing</a></li>
                            <li><a class="alink" href="">Resources</a></li>
                        </ul>
                    </div>
                    <div class="login-btns">
                        <ul class="d-flex nav-btns-list">
                            <li><a className="alink"><Link to='/signin' className='alink primary-btn'>Sign In</Link></a></li>
                            <li><a className="alink"><Link to='/signup' className='secondary-btn'>Sign Up</Link></a></li>
                        </ul>
                    </div>
                </div>
            </div> 
        </>
    );
}
export default Navbar;