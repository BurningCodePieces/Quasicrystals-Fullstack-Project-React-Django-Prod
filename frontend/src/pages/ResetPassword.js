import React, { useState } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reset_password } from '../actions/auth';

const ResetPassword = ({error,reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);

    const[formData, setFormData] = useState({
        email: '',
    });

    const {email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        await reset_password(email);
        setRequestSent(true);
    };


    if( requestSent ){
        if(error.status == null){
            return <Redirect to='/' />
        }
    } 

    return(
        <div className='container mt-5 text-center'>
            <h1> Request Reset Password </h1>
            <form onSubmit={e => onSubmit(e)}>
                <h5 className="mt-5"> In order to reset your password, you need to provide a valid* email address for your account. </h5>
                <h6> *A link will be sent to this email address. That link will allow you to set a new password.</h6>
                <div className='form-group w-25 m-auto mt-5 mb-1'>
                    <input className='form-control' type='email' placeholder='Your email address' value ={email} name='email'  onChange={e => onChange(e)} required/>
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

const mapStateToProps = state =>({
    error: state.errors
});


export default connect(mapStateToProps, {reset_password}) (withAlert()(ResetPassword));
