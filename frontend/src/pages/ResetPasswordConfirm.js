import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth'

const ResetPasswordConfirm = ({ match, reset_password_confirm}) => {

    const[formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        const uid = match.params.uid;
        const token = match.params.token;
        reset_password_confirm(uid, token, new_password, re_new_password);
    };

    return(
        <div className='container mt-5 text-center'>
            <form onSubmit={e => onSubmit(e)}>
            <h1> Reset Password </h1>
            <h5 className="mt-5"> Please, provide a new password for your account. </h5>
            <div className='form-group mt-5 w-25 m-auto'>
                <input className='form-control' type='password' placeholder='New password' value={new_password} name='new_password' onChange={e => onChange(e)} minLength='6' required/>
            </div>
            <div className='form-group mt-3 w-25 m-auto'>
                <input className='form-control' type='password' placeholder='Confirm new password' value={re_new_password} name='re_new_password' onChange={e => onChange(e)} minLength='6' required/>
            </div>
                <button className='btn btn-primary mt-3' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, {reset_password_confirm}) (ResetPasswordConfirm);
