import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

const UserAccount = ({user,logout}) => {
    let onlyVisibleToAdminOptions = (<div><h5 className="mt-5">Admin level operations:</h5>
    <Link className="btn btn-dark mt-3" type="button" to="/waiting_structures">View structures to be verified</Link>
    <br/>
    <Link className="btn btn-dark mt-3" type="button" to="/users_list">Browse users list</Link>
    <br/>
    <h5 className="mt-5">User level operations:</h5></div>)
    return (
        <>
        <div className="container bg-secondary p-5 mt-5">
        <h3 className="mt-3">
            Logged as: {user.name} ( {user.email} ).<br/> <div className="mt-3 h6"> You are granted <strong className="text-dark">{user.is_staff ? <span>ADMIN</span> : <span>USER</span>}</strong> access to this site. </div>
        </h3>
            {!user.is_staff ? (<div className="h6"> If you think your privileges should be higher, <Link className="text-decoration-none text-primary" to="/contact">contact</Link> our administration. </div>) : ""}
            <br/>
        <h3>
            Available operations:
            <br/>
            {user.is_staff ? onlyVisibleToAdminOptions : ""}
            <Link className="btn btn-dark mt-3" type="button" to="/my_structures">List structures added by you</Link>
            <br/>
            <Link className="btn btn-dark mt-3" type="button" to='/reset_password'>Change password</Link>
            <br/>
            <Link className="btn btn-success mt-3" type="button" to="/add_structure">Add new structure</Link>
            <br/>
            <Link className="btn btn-primary mt-3" type="button" to='/' onClick={logout}>Log me out</Link>
        </h3>

        </div>
        </>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(UserAccount)