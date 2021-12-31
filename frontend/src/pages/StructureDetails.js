import { useParams } from "react-router";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getStructure } from "../actions/quasicrystals";
import { changeStructureValidity } from "../actions/quasicrystals";
import { deleteStructure } from "../actions/quasicrystals";
import { useDispatch } from "react-redux";
import {Redirect} from "react-router-dom"
import { createMessage } from "../actions/messages";
import { ChemicalFormulaFormatter } from '../components/Common/ChemicalFormulaFormatter';
const StructureDetails = ({ isAuthenticated,loading, getStructure, structure, user, deleteStructure, changeStructureValidity }) => {
    const { id } = useParams();


    useEffect(() => {
        getStructure(id);
    }, []);

    useEffect(() => {
    }, [structure]);

    const dispatch = useDispatch();

    if(loading) return null;

    if(user && structure && structure.created_by)
    if(!user.is_staff && !structure.is_valid && (structure.created_by.email != user.email)) {
        dispatch(createMessage({structure_not_verified: "This structure has not been verified yet"}))
        return <Redirect to="/list"></Redirect>
    }

    if (structure && Object.keys(structure).length !== 0)
        return (<div className="container mb-5">
            <h2 className="my-5 text-center">Details of structure <i className="d-inline-block text-success"><ChemicalFormulaFormatter formula={structure.chemical_formula}></ChemicalFormulaFormatter> </i></h2>

            <table className="table table-striped table-dark text-light text-center border">
                <thead className="thead-light">
                    <tr>
                        <th>Property name</th>
                        <th>Value</th>
                    </tr>

                </thead>
                <tbody className="text-light text-center" style={{ lineHeight: 2.5 }}>
                    {Object.keys(structure).map(function (keyName, keyIndex) {
                        if (keyName !== "is_valid" && keyName !== "created_by" && keyName !== "chemical_formula" && keyName !== "refined_formula")
                            return (
                                <tr className="text-light" key={keyName}>
                                    <td className="text-light">{keyName}</td>
                                    <td className="text-light">{(structure[keyName] ? structure[keyName] : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                </tr>)
                        else if (keyName === "created_by")
                            return (
                                <tr className="text-light" key={keyName}>
                                    <td className="text-light">{keyName}</td>
                                    <td className="text-light">{(structure[keyName] ? structure[keyName].email : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                </tr>)
                        else if(keyName === "chemical_formula" || keyName === "refined_formula")
                                return(
                                    <tr className="text-light" key={keyName}>
                                    <td className="text-light">{keyName}</td>
                                    <td className="text-light">{(structure[keyName] ? <ChemicalFormulaFormatter formula={structure[keyName]}/> : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                </tr>
                                )
                    })}
                </tbody>
            </table>
            <div className="py-5">
                <span className="me-3">This structure has <span className="text-danger">{structure.is_valid ? " " : "NOT"}</span> been validated. </span>
                {user ? (user.is_staff ? (!structure.is_valid ? <span><button className="btn btn-success" onClick={() => changeStructureValidity(structure.id)}>MARK STRUCTURE VALID</button></span> : <span><button className="btn btn-danger" onClick={() => changeStructureValidity(structure.id)}>MARK INVALID</button></span>) : "") : ""}
                {user ? (user.is_staff ? (!structure.is_valid ? <span><button className="ms-3 btn btn-danger" onClick={() => {if(window.confirm('Are you totally sure you want to delete this item? This operation is irreversible!')) deleteStructure(structure.id)}}>DELETE STRUCTURE</button></span> : "") : "") : ""}
            </div>
        </div>);
    else 
        return <div className="container text-center m-auto p-5">Structure with given ID does not exist</div>
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    structure: state.quasicrystals.structure,
    user: state.auth.user,
    loading: state.loading.loading
});

export default connect(mapStateToProps, { getStructure, changeStructureValidity, deleteStructure })(StructureDetails)