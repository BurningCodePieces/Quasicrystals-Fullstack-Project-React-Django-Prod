import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from 'react'
import { connect } from 'react-redux';
import { useEffect } from "react";


const FullPageLoader = ({ loading }) => {

    useEffect(() => {
    }, [loading]);

        const typesOfAnimation = ['Bars', 'TailSpin', 'Oval', 'BallTriangle', 'Circles', 'Grid'] 
        return (
            <div className="loader-component" style={{ display: loading ? 'block' : 'none' ,position: 'fixed', top:0, left:0, width:100+'%', height:100+'%',backgroundColor:'#a8a8a866'}}>
                <div className="loader" style={{left:50+'%', top:35+'%', zIndex:1000, position:'absolute'}}>
                    <div className="animation" style={{marginLeft:-75+'px'}}>
                            <Loader
                                type={typesOfAnimation[Math.floor(Math.random()*typesOfAnimation.length)]}
                                color="#00a03e"
                                height={150}
                                width={150}
                            />
                            </div>
                </div>
            </div>
        )
}
const mapStateToProps = state => ({ loading: state.loading.loading})
export default connect (mapStateToProps)(FullPageLoader);