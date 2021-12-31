import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getAllStructures } from '../actions/quasicrystals'
import { Link } from 'react-router-dom'
import { getAllStructuresForUser } from '../actions/quasicrystals'
import { ChemicalFormulaFormatter } from '../components/Common/ChemicalFormulaFormatter'

export class List extends Component {
    static propTypes = {
        structures: PropTypes.array.isRequired,
        getAllStructures: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        getAllStructuresForUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.showStructuresOfAllUsers == true)
            this.props.getAllStructures()
        else if (this.props.user)
            this.props.getAllStructuresForUser(this.props.user.id)
    }


    render() {
        if(!this.props.structures) return null;
        return (
            <Fragment>
                <div className='container mb-5 pb-5'>
                    {this.props.showStructuresOfAllUsers ? <h2 className='my-5'>List of verified quasicrystal structures:</h2> : <h2 className='my-5'>List of quasicrystal structures added by you:</h2>}
                    <table className="table table-striped text-light text-center border">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Chemical formula</th>
                                {this.props.showStructuresOfAllUsers ? <th>Added by</th> : <th>Marked as valid</th>}
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
                                        {this.props.showStructuresOfAllUsers ? <td className="text-light">{structure.created_by ? structure.created_by.email : "Unknown"}</td> : <td className="text-light">{String(structure.is_valid)}</td>}
                                        <td className="text-light">{structure.created_at}</td>
                                        <td className="text-light"><Link to={`/structure/${structure.id}`}><button className="btn btn-primary">See details</button></Link> </td>
                                    </tr>
                                    : null)
                            ))}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    structures: state.quasicrystals.structures,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getAllStructures, getAllStructuresForUser })(List)
