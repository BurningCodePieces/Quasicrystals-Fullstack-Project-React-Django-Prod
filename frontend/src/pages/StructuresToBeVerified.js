import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getUnverifiedStructures } from '../actions/quasicrystals'
import { ChemicalFormulaFormatter } from '../components/Common/ChemicalFormulaFormatter'

export class StructuresToBeVerified extends Component {
    static propTypes = {
        structures: PropTypes.array.isRequired,
        getUnverifiedStructures: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
    }

    componentDidMount() {
        this.props.getUnverifiedStructures()
    }


    render() {
        if(!this.props.structures) return null;
        return (
            <Fragment>
                <div className='container my-5 pb-5'>
                    <h2 className='my-5'>List of <span className="text-danger">unverified</span> quasicrystal structures:</h2>
                    <table className="table table-striped text-light text-center border">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Chemical formula</th>
                                <th>Added by</th>
                                <th>Added at</th>
                                <th>Details</th>
                            </tr>

                        </thead>
                        <tbody className="text-light text-center" style={{ lineHeight: 2.5 }}>
                            {this.props.structures.map(structure => (
                                ( (this.props.showStructuresOfAllUsers ? structure.is_valid : true )?
                                    <tr className="text-light" key={structure.id}>
                                        <td className="text-light">{structure.crystal_id}</td>
                                        <td className="text-light"><ChemicalFormulaFormatter formula={structure.chemical_formula}/></td>
                                        <td className="text-light">{structure.created_by ? structure.created_by.email : "Unknown"}</td>
                                        <td className="text-light">{structure.created_at}</td>
                                        <td className="text-light"><Link to={`/structure/${structure.id}`}><button className="btn btn-primary">See details</button></Link> </td>
                                    </tr>
                                    : "")
                            ))}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    structures: state.quasicrystals.unverifiedStructures,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getUnverifiedStructures })(StructuresToBeVerified)
