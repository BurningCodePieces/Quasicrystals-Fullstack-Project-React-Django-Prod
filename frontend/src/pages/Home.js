import React, { Component } from 'react'
import agh_ust_dark from '../images/agh-ust-dark-white.png';
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { createMessage } from '../actions/messages';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
}
  static propTypes = {
    isAuthenticated : PropTypes.bool,
}
  componentDidMount(){
    const {dispatch} = this.props;
    if(this.props.location.state)
    dispatch(createMessage({admin_route:this.props.location.state.message}))
  }

  render() {
    return (
      <div className="px-4 py-1 mb-5 text-center text-white bg-dark">
        <img className="d-block mx-auto mb-1" src={agh_ust_dark} alt="" width="285" height="400" />
        <h1 className="display-5 fw-bold mb-3">Quasicrystals Database</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">In this application, you can easily browse quasicrystal structures, as well as add your own. Adding a new structure requires logging in.</p>
          {!this.props.isAuthenticated ? <div><div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link className="btn btn-primary btn-lg px-4 gap-3" type="button" to="/login">Sign in</Link>
            <Link className="btn btn-light btn-lg px-4" type="button" to="/signup">Sign up</Link>
          </div>
          <p className="mt-3"> or </p></div> : ""}
          <Link className="btn btn-secondary btn-lg px-4 mb-5" type="button" to="/list">Browse the database</Link>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Home)
