import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Alerts from '../components/Alerts'
import Footer from '../components/Footer'
import FullPageLoader from '../components/Common/FullPageLoader';

const Layout = (props) => {
    useEffect(() =>{
        props.checkAuthenticated();
        props.load_user();
    }, []
    );
    return(
    <div>
        <Navbar/>
        <Alerts/>
        <FullPageLoader/>
        {props.children}
        <Footer/>
    </div>
    );
};


export default connect(null,{checkAuthenticated,load_user}) (Layout);
