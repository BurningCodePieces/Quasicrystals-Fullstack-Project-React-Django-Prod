import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

export class Contact extends Component {
    render() {
        return (
            <div>
                <div className="w-100">
                    <div className="h-100 w-75 p-5 bg-secondary text-dark border rounded-3 m-auto mt-5">
                        <h2 className="mt-3">Contact us</h2>
                        <p>In case of any questions or comments, feel free to contact our admin at email address:<br/> <br/> <i> <a style={{textDecoration:'none'}} href="mailto:quasicrystalsagh@gmail.com" className="text-light"> quasicrystalsagh@gmail.com </a></i></p>
                        <Link className="btn btn-dark mt-3" type="button" to="/theory">Back to Homepage</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
