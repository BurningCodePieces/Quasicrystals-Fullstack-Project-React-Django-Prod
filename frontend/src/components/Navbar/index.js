import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavMenuNonAuth} from './NavbarElements'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import agh_ust_dark from '../../images/agh-ust-dark-white.png';
//<NavBtn>
//<NavBtnLink to="/signup">Sign Up</NavBtnLink>
//</NavBtn>
const Navbar = ({logout, isAuthenticated, user}) => {
    const guestLinks = () =>(
            <NavMenuNonAuth>
                    <NavBtn>
                        <NavBtnLink to="/Login">Log In</NavBtnLink>
                    </NavBtn>
            </NavMenuNonAuth>
    );

    const authLinks = () =>(
        <NavMenuNonAuth>
            <NavBtn>
                <NavBtnLink to='/' onClick={logout}>Logout</NavBtnLink>
            </NavBtn>
        </NavMenuNonAuth>
    );

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img className="text-white" src={agh_ust_dark} alt="agh logo" />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/theory">About</NavLink>
                    <NavLink to="/list">List of structures</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {isAuthenticated ? (<NavLink to="/addstructure">New structure</NavLink>) : (<NavLink to="/signup">Sign Up</NavLink>)}
                    {user ? ( user.is_staff ? <NavLink to="/my_account">Admin panel</NavLink> : <NavLink to="/my_account">My account</NavLink>): <span></span>}
                </NavMenu>
                {isAuthenticated ? authLinks() : guestLinks()}
            </Nav>
        </>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Navbar)
