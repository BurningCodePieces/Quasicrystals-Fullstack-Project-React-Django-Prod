import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMessage } from '../actions/messages';
import { addStructure } from '../actions/quasicrystals';
import { useDispatch } from 'react-redux';
import { RadioInput } from '../components/Common/RadioInput';

const AddStructure = ({ isAuthenticated, user, addStructure }) => {
    const dispatch = useDispatch();
    const [elementsVisibilityData, setElementsVisibilityData] = useState({
        addingNewElementEnabled: false,
        addingNewElementRefinedEnabled: false
    })
    const [elementsInStructure, setElementsInStructure] = useState({
        elements: {},
        newElementSymbol: "",
        newElementPercentage: 0,
    })
    const [elementsInRefinedStructure, setElementsInRefinedStructure] = useState({
        elementsRefined: {},
        newElementSymbolRefined: "",
        newElementPercentageRefined: 0,
    })

    const [radioButtons, setRadioButtons] = useState({
        quasiType: "",
        clusterType: "",
        centeringType: ""
    })
    useEffect(() => {
        currentChemicalFormulaTemp = parseElementsToString(elements);
        setFormData({ ...formData, currentChemicalFormula: currentChemicalFormulaTemp });
    }, [elementsInStructure]);

    useEffect(() => {
        currentChemicalFormulaRefinedTemp = parseElementsToString(elementsRefined);
        setFormData({ ...formData, currentChemicalFormulaRefined: currentChemicalFormulaRefinedTemp });
    }, [elementsInRefinedStructure])

    const [formData, setFormData] = useState({
        currentChemicalFormula: "",
        currentChemicalFormulaRefined: "",
        distanceInPeriodicDirection: "",
        edgeLength: "",
        phassonCoeff: "",
        residualElectronDensity: "",
        pointDensity: "",
        electronsPerAtom: "",
        authors: "",
        titleOfPublication: "",
        journalOfPublication: "",
        journalVolume: "",
        journalIssue: "",
        urlToArticle: "",
        pagesOfArticle: "",
        yearOfPublication: "",
        diffractionTemperature: "",
        radiationType: "",
        diffractionRadiationWavelength: "",
        numberOfObservedReflections: "",
        numberOfUniqueReflections: "",
        rInt: "",
        r1sigma: "",
        r3sigma: "",
        wr1sigma: "",
        wr3sigma: "",
        numberOfReflections1sigma: "",
        numberOfReflections3sigma: "",
        numberOfParameters: "",
        rFactorValue: "",
        fiveDimensionalSpaceGroup: ""
    });
    useEffect(() => {

    }, [formData]);


    const { currentChemicalFormula,
        currentChemicalFormulaRefined,
        distanceInPeriodicDirection,
        edgeLength,
        phassonCoeff,
        residualElectronDensity,
        pointDensity,
        electronsPerAtom,
        authors,
        titleOfPublication,
        journalOfPublication,
        journalVolume,
        journalIssue,
        urlToArticle,
        pagesOfArticle,
        yearOfPublication,
        diffractionTemperature,
        radiationType,
        diffractionRadiationWavelength,
        numberOfObservedReflections,
        numberOfUniqueReflections,
        rInt,
        r1sigma,
        r3sigma,
        wr1sigma,
        wr3sigma,
        numberOfReflections1sigma,
        numberOfReflections3sigma,
        numberOfParameters,
        rFactorValue,
        fiveDimensionalSpaceGroup } = formData;

    const { quasiType, centeringType, clusterType } = radioButtons;
    const { elements, newElementSymbol, newElementPercentage } = elementsInStructure;
    const { elementsRefined, newElementSymbolRefined, newElementPercentageRefined } = elementsInRefinedStructure;
    const { addingNewElementEnabled, quasiTypeAdditionalInfo } = elementsVisibilityData;
    const re = /^[A-Za-z]+$/;
    const reNames = /^[A-Za-z,;]+$/;
    const reNum = /[0-9]\./;
    const reInts = /^[0-9\b]+$/;


    if (!isAuthenticated) {
        return <Redirect to='/' />
    }



    let currentChemicalFormulaTemp = '';
    let currentChemicalFormulaRefinedTemp = '';



    const onSubmit = async e => {
        e.preventDefault();
        let controlSum = 0.0;
        let controlSum2 = 0.0;
        Object.keys(elements).map((key, index) => (
            controlSum += Number(elements[key])
        ))
        Object.keys(elementsRefined).map((key, index) => (
            controlSum2 += Number(elementsRefined[key])
        ))
        if (controlSum !== 100.0) {
            dispatch(createMessage({ sum_of_percents_formula_need_to_be_equal_100: "Sum of the percents in chemical formula must be equal 100." }))
        }
        else if (controlSum2 !== 100.0 && Object.keys(elementsRefined).length != 0) {
            dispatch(createMessage({ sum_of_percents_formula_need_to_be_equal_100: "Sum of the percents in refined chemical formula must be equal 100." }))
        }
        else {
            var crystalId = ""
            switch (quasiType) {
                case "icoshaedral":
                    crystalId += "I"
                    break;
                case "decagonal":
                    crystalId += "D"
                    break;
                case "octagonal":
                    crystalId += "O"
                    break;
                case "dodecagonal":
                    crystalId += "Dd"
                    break;
            }
            if (quasiType == "icoshaedral") {
                switch (clusterType) {
                    case "Mackay":
                        crystalId += "M"
                        break;
                    case "Bergman":
                        crystalId += "B"
                        break;
                    case "Tsai":
                        crystalId += "T"
                        break;
                }
                if (centeringType == "P")
                    crystalId += "P"
                if (centeringType == "F")
                    crystalId += "F"
            }
            else
                crystalId += "P"

            let structureInfo = {
                "crystal_id": crystalId, "chemical_formula": currentChemicalFormula, "refined_formula": currentChemicalFormulaRefined, "distance_in_periodic_direction": distanceInPeriodicDirection,
                "edge_length": edgeLength, "phasson_coefficient": phassonCoeff, "residual_electron_density": residualElectronDensity,
                "point_density": pointDensity, "number_of_electrons_per_atom": electronsPerAtom, "authors": authors,
                "title_of_publication": titleOfPublication, "journal_of_publication": journalOfPublication,
                "journal_volume": journalVolume, "jounal_issue": journalIssue,
                "start_page_or_page_range": pagesOfArticle, "url_to_article": urlToArticle,
                "diffraction_temperature": diffractionTemperature, "radiation_type": radiationType,
                "diffraction_radiation_wavelength": diffractionRadiationWavelength, "rInt": rInt,
                "r1_sigma": r1sigma, "r3_sigma": r3sigma, "wR1_sigma": wr1sigma, "wR3_sigma": wr3sigma, "r_factor_value": rFactorValue,
                "quasi_type": quasiType, "cluster_type": clusterType, "centering_type": centeringType, "five_dimensional_space_group": fiveDimensionalSpaceGroup
            }
            if (yearOfPublication) { structureInfo["year_of_publication"] = yearOfPublication };
            if (numberOfObservedReflections) { structureInfo["number_of_observed_reflections"] = numberOfObservedReflections };
            if (numberOfUniqueReflections) { structureInfo["number_of_unique_reflections"] = numberOfUniqueReflections };
            if (numberOfReflections1sigma) { structureInfo["number_of_reflections_1_sigma"] = numberOfReflections1sigma };
            if (numberOfReflections3sigma) { structureInfo["number_of_reflections_3_sigma"] = numberOfReflections3sigma };
            if (numberOfParameters) { structureInfo["number_of_parameters"] = numberOfParameters }
            addStructure(structureInfo);
        }
    };

    let parseElementsToString = (elementsDict) => {
        let elementsString = "";
        for (var key in elementsDict) {
            elementsString += String(key) + String(elementsDict[key]);
        }
        return elementsString;
    }

    let outputElementsString = (elementsString) => {
        if (elementsString === undefined) elementsString = ""
        var regexStr = elementsString.match(/[a-z]+|[^a-z]+/gi);
        if (regexStr != undefined) {
            return (
                <div>
                    {Object.values(regexStr).map((stringPart, index) => {
                        if (Number(stringPart)) {
                            return (<sub key={index}>{stringPart}</sub>);
                        }
                        else {
                            return (<span key={index}>{stringPart}</span>);
                        }
                    })}
                </div>
            )
        }
        else {
            return ""
        }
    }

    let decimalChangePercents = e => {
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(00|\.)/, "0");
        const match = /(\d{0,2})[^.]*((?:\.\d{0,6})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
    }
    let decimalChangeBigNumbers = e => {
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(00|\.)/, "0");
        const match = /(\d{0,7})[^.]*((?:\.\d{0,6})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
    }

    let lastTimeRangeMessageShown = performance.now()

    let decimalNumbersMax1 = e => {
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(00|\.)/, "0");
        const match = /(\d{0,7})[^.]*((?:\.\d{0,6})?)/g.exec(val);
        const value = match[1] + match[2];
        if (Number(value) <= 1.0) {
            e.target.value = value;
        }
        else {
            if (performance.now() - lastTimeRangeMessageShown > 1000) {
                dispatch(createMessage({ range_values_0_1: "Value for R factors should be in range [0.0,1.0]" }));
                lastTimeRangeMessageShown = performance.now();
            }
            e.target.value = "1.0";
        }
    }


    let quasiTypeSetter = value => {
        if (value == "icoshaedral") {
            setRadioButtons({
                ...formData,
                centeringType: centeringType,
                clusterType: clusterType,
                quasiType: value,
            });
        }
        else {
            setRadioButtons({
                ...formData,
                centeringType: "P",
                clusterType: "",
                quasiType: value,
            });
        }
    };

    let centeringTypeSetter = value => {
        setRadioButtons({
            ...formData,
            quasiType: quasiType,
            clusterType: clusterType,
            centeringType: value
        });
    };

    let clusterTypeSetter = value => {
        setRadioButtons({
            ...formData,
            quasiType: quasiType,
            centeringType: centeringType,
            clusterType: value,
        });
    };



    let addingNewElementJSX = (<div className="m-auto d-flex flex-column w-50 text-center">
        <h3>Adding new element</h3>
        <label>Symbol:</label>
        <input className='form-control mt-3' type='text' maxLength="10" value={newElementSymbol} name='symbol' onChange={e => { if (re.test(e.target.value) || e.target.value === '') { setElementsInStructure({ ...elementsInStructure, newElementSymbol: e.target.value }) } }} placeholder="Si" />

        <label className="mt-3">Percent in the structure:</label>
        <input type="text" className="mt-3" min="0" max="100" maxLength="10" value={newElementPercentage} onChange={e => { decimalChangePercents(e); setElementsInStructure({ ...elementsInStructure, newElementPercentage: e.target.value }) }}
            placeholder="53.43" step="0.00001" />
        <button type="button" onClick={e => { let value = { newElementSymbol }; if (!(newElementSymbol != '' && newElementPercentage != '')) { dispatch(createMessage({ provide_both_inputs_for_element: "You need to provide both values to add an element." })); } else setElementsInStructure({ ...elementsInStructure, elements: { ...elements, [newElementSymbol]: String(Number(newElementPercentage)) } }); }} className="btn btn-success w-50 m-auto mt-3"> Submit
            element </button>
        <button type="button" onClick={e => setElementsVisibilityData({ ...elementsVisibilityData, addingNewElementEnabled: !elementsVisibilityData.addingNewElementEnabled })} className="btn btn-danger w-50 m-auto mt-3"> Quit
            adding </button>
    </div>)

    let addingNewElementRefinedJSX = (<div className="m-auto d-flex flex-column w-50 text-center">
        <h3>Adding new element [refined composition]</h3>
        <label>Symbol:</label>
        <input className='form-control mt-3' type='text' maxLength="10" value={newElementSymbolRefined} name='symbol' onChange={e => { if (re.test(e.target.value) || e.target.value === '') { setElementsInRefinedStructure({ ...elementsInRefinedStructure, newElementSymbolRefined: e.target.value }) } }} placeholder="Si" />

        <label className="mt-3">Percent in the structure:</label>
        <input type="text" className="mt-3" min="0" max="100" maxLength="10" value={newElementPercentageRefined} onChange={e => { decimalChangePercents(e); setElementsInRefinedStructure({ ...elementsInRefinedStructure, newElementPercentageRefined: e.target.value }) }}
            placeholder="53.43" step="0.00001" />
        <button type="button" onClick={e => { let value = { newElementSymbolRefined }; if (!(newElementSymbolRefined != '' && newElementPercentageRefined != '')) { dispatch(createMessage({ provide_both_inputs_for_element: "You need to provide both values to add an element." })); } else setElementsInRefinedStructure({ ...elementsInRefinedStructure, elementsRefined: { ...elementsRefined, [newElementSymbolRefined]: String(Number(newElementPercentageRefined)) } }); }} className="btn btn-success w-50 m-auto mt-3"> Submit
            element </button>
        <button type="button" onClick={e => setElementsVisibilityData({ ...elementsVisibilityData, addingNewElementRefinedEnabled: !elementsVisibilityData.addingNewElementRefinedEnabled })} className="btn btn-danger w-50 m-auto mt-3"> Quit
            adding </button>
    </div>)

    return (
        <div className='container mt-5'>
            <h1 className="mb-3"> New structure </h1>
            <h4 className="mb-1"> Provide all the required data. After admin's approval, your structure will be published.</h4>
            <form onSubmit={e => onSubmit(e)} className="w-100 mt-3 d-flex flex-wrap">
                <div className="w-100 border-bottom mt-5 pb-5">
                    <h3 className="w-100 text-center mt-3 font-weight-bold text-info"> &#9679; Structure related data</h3>
                    <h4 className="mt-5"> Chemical formula</h4>
                    <div className="StructureData mb-5">
                        <h4 className="mt-5"> You can add any number of elements that the structure has.</h4>
                        {Object.keys(elements).map((key, index) => (
                            <p key={index}> <strong>{key}</strong> : <strong>{elements[key]}</strong>% in structure <button className="btn btn-danger" onClick={e => { let copyCarValues = { ...elementsInStructure.elements }; delete copyCarValues[key]; setElementsInStructure({ ...elementsInStructure, elements: copyCarValues }); currentChemicalFormulaTemp = parseElementsToString(elements); setFormData({ ...formData, currentChemicalFormula: currentChemicalFormulaTemp }) }}>DELETE</button> </p>
                        ))}
                        <div> {currentChemicalFormula ? "Current structure formula:" : ""}  {outputElementsString(currentChemicalFormula)} </div>
                        <button type="button" id="addElementButton" className="btn btn-primary mt-3" onClick={e => setElementsVisibilityData({ ...elementsVisibilityData, addingNewElementEnabled: !elementsVisibilityData.addingNewElementEnabled })}>Add element</button>
                        <br />
                        {elementsVisibilityData.addingNewElementEnabled ? addingNewElementJSX : ""}

                    </div>
                    <h4 className="mt-5"> Type: </h4>
                    <RadioInput className="me-1" label="icoshaedral" value="icoshaedral" checked={quasiType} name="quasiType" setter={quasiTypeSetter} />
                    <RadioInput className="me-1" label="octagonal" value="octagonal" checked={quasiType} name="quasiType" setter={quasiTypeSetter} />
                    <RadioInput className="me-1" label="decagonal" value="decagonal" checked={quasiType} name="quasiType" setter={quasiTypeSetter} />
                    <RadioInput className="me-1" label="dodecagonal" value="dodecagonal" checked={quasiType} name="quasiType" setter={quasiTypeSetter} />

                    <div id="icoshaedralOnlyFeatures" className={quasiType !== "icoshaedral" ? "d-none" : ""}>
                        <h4 className="mt-5"> Centering type:</h4>
                        <RadioInput className="me-1" label="F" value="F" checked={centeringType} name="centeringType" setter={centeringTypeSetter} />
                        <RadioInput className="me-1" label="P" value="P" checked={centeringType} name="centeringType" setter={centeringTypeSetter} />
                        <h4 className="mt-5"> Cluster type:</h4>
                        <RadioInput className="me-1" label="Mackay" value="Mackay" checked={clusterType} name="clusterType" setter={clusterTypeSetter} />
                        <RadioInput className="me-1" label="Bergman" value="Bergman" checked={clusterType} name="clusterType" setter={clusterTypeSetter} />
                        <RadioInput className="me-1" label="Tsai" value="Tsai" checked={clusterType} name="clusterType" setter={clusterTypeSetter} />
                    </div>
                    <div id="decagonalOnlyFeatures" className={quasiType === "icoshaedral" ? "d-none" : ""}>
                        <h4 className="mt-5">Distance in periodic direction</h4>
                        <input type="text" name="periodicDirectionDistance" value={distanceInPeriodicDirection} step="0.00001" onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, distanceInPeriodicDirection: e.target.value }) }} /> [&#8491;]
                    </div>
                    <div>
                        <h4 className="mt-5">
                            Edge length:
                        </h4>
                        <input type="text" name="lengthSideRhomboedron" value={edgeLength} step="0.00001" onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, edgeLength: e.target.value }) }} /> [&#8491;]
                    </div>
                    <h4 className="mt-5"> Phasson coefficient B<sub>Ph</sub></h4>
                    <input type="text" name="phassonCoeff" value={phassonCoeff} step="0.00001" onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, phassonCoeff: e.target.value }) }} /> [&#8491;<sup>2</sup>]
                    <h4 className="mt-5"> Residual electron density</h4>
                    <input type="text" name="residualElectronDensity" value={residualElectronDensity} step="0.00001" onChange={e => { decimalChangePercents(e); setFormData({ ...formData, residualElectronDensity: e.target.value }) }} /> [%]
                    <h4 className="mt-5"> Point density</h4>
                    <input type="text" name="pointDensity" value={pointDensity} step="0.00001" onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, pointDensity: e.target.value }) }} />[1/&#8491;<sup>3</sup>]
                    <h4 className="mt-5"> Number of electrons per atom</h4>
                    <input type="text" name="electronsPerAtom" value={electronsPerAtom} step="0.00001" onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, electronsPerAtom: e.target.value }) }} />
                    <h4 className="mt-5"> Five-dimensional space group</h4>
                    <input type="text" placeholder="P10_5/mmc" name="fiveDimensionalSpaceGroup" value={fiveDimensionalSpaceGroup} onChange={e => { setFormData({ ...formData, fiveDimensionalSpaceGroup: e.target.value }) }} />
                </div>
                <div className="w-100 border-bottom mt-5 pb-5">
                    <h3 className="text-center mt-3 font-weight-bold text-info"> &#9679; Publication related data</h3>
                    <h4 className="mt-5"> Authors</h4>
                    <p className="w-75">Provide all names in the input field below, first name and last name should be separated with comma</p>
                    <p> Different authors should be separated with semicolon</p>
                    <textarea type="text" style={{ resize: "both", maxWidth: 500, maxHeight: 200, minHeight: 70, minWidth: 300 }} name="authors" placeholder="Anne,Smith;John,Doe;" value={authors} onChange={e => { if (reNames.test(e.target.value) || e.target.value === '') setFormData({ ...formData, authors: e.target.value }) }} />
                    <h4 className="mt-5"> Title of the publication</h4>
                    <input type="text" name="titleOfPublication" value={titleOfPublication} onChange={e => { setFormData({ ...formData, titleOfPublication: e.target.value }) }} />
                    <h4 className="mt-5"> Journal of the publication</h4>
                    <input type="text" name="nameOfPublicationMagazine" value={journalOfPublication} onChange={e => { setFormData({ ...formData, journalOfPublication: e.target.value }) }} />
                    <h4 className="mt-5"> Journal volume</h4>
                    <input type="text" name="numberOfVolume" value={journalVolume} onChange={e => { setFormData({ ...formData, journalVolume: e.target.value }) }} />
                    <h4 className="mt-5"> Journal issue</h4>
                    <input type="text" name="numberOfIssue" value={journalIssue} onChange={e => { setFormData({ ...formData, journalIssue: e.target.value }) }} />
                    <h4 className="mt-5"> Year of publication</h4>
                    <input type="text" name="yearOfPublication" value={yearOfPublication} onChange={e => { if (reInts.test(e.target.value) || e.target.value === '') { setFormData({ ...formData, yearOfPublication: e.target.value }) } }} />
                    <h4 className="mt-5"> Page range</h4>
                    <small>Provide either first page or page range in format XXX-XXX (ie. 43-49)</small>
                    <br />
                    <input className="mt-3" type="text" name="pages" value={pagesOfArticle} onChange={e => { setFormData({ ...formData, pagesOfArticle: e.target.value }) }} />
                    <h4 className="mt-5"> Link to the article</h4>
                    <input type="text" name="linkToTheArticle" value={urlToArticle} onChange={e => { setFormData({ ...formData, urlToArticle: e.target.value }) }} />
                </div>

                <div className="border-bottom mt-5 pb-5 w-100">
                    <h3 className="text-center mt-3 font-weight-bold text-info"> &#9679; Experiment related data</h3>
                    <h4 className="mt-5"> Diffraction temperature</h4>
                    <input type="text" name="temperature" step="0.00001" value={diffractionTemperature} onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, diffractionTemperature: e.target.value }) }} /> [K]
                    <h4 className="mt-5"> Radiation type</h4>
                    <input type="text" name="radiationType" value={radiationType} onChange={e => { setFormData({ ...formData, radiationType: e.target.value }) }} />
                    <h4 className="mt-5"> Diffraction radiation wavelength</h4>
                    <input type="text" name="Wavelength" step="0.00001" value={diffractionRadiationWavelength} onChange={e => { decimalChangeBigNumbers(e); setFormData({ ...formData, diffractionRadiationWavelength: e.target.value }) }} /> [&#8491;]
                    <h4 className="mt-5"> Number of observed reflections</h4>
                    <input type="text" name="numberOfObservedReflections" value={numberOfObservedReflections} onChange={e => { { setFormData({ ...formData, numberOfObservedReflections: e.target.value }) } }} />
                    <h4 className="mt-5"> Number of unique reflections</h4>
                    <input type="text" name="numberOfUniqueReflections" value={numberOfUniqueReflections} onChange={e => { if (reInts.test(e.target.value) || e.target.value === '') { setFormData({ ...formData, numberOfUniqueReflections: e.target.value }) } }} />
                    <h4 className="mt-5"> R<sub>int</sub></h4>
                    <input type="text" className="me-1" name="Rint" value={rInt} onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, rInt: e.target.value }) }} />
                    <h4 className="mt-5"> Uncertainty of measurement</h4>
                    <small>You can provide values of all uncertainities or less, if you do not have all of them</small>
                    <table>
                        <thead>
                            <tr className="text-center">
                                <th />
                                <th><div className="mb-1">|F| &gt; 1σ(F)</div></th>
                                <th><div className="mb-1">|F| &gt; 3σ(F)</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i>R</i></td>
                                <td><input type="text" value={r1sigma} className="mx-3" onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, r1sigma: e.target.value }) }}></input></td>
                                <td><input type="text" value={r3sigma} onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, r3sigma: e.target.value }) }}></input></td>
                            </tr>

                            <tr>
                                <td><i><div className="mt-3">wR</div></i></td>
                                <td><input type="text" value={wr1sigma} className="mx-3 mt-3" onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, wr1sigma: e.target.value }) }}></input></td>
                                <td><input type="text" value={wr3sigma} className="mt-3" onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, wr3sigma: e.target.value }) }}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 className="mt-5"> Number of reflections, where |F| &gt;1&#x3C3;(F)</h4>
                    <input type="text" name="numberOfReflectionsWithUncentainity" value={numberOfReflections1sigma} onChange={e => { if (reInts.test(e.target.value) || e.target.value === '') { setFormData({ ...formData, numberOfReflections1sigma: e.target.value }) } }} />
                    <h4 className="mt-5"> Number of reflections, where |F| &gt;3&#x3C3;(F)</h4>
                    <input type="text" name="numberOfReflectionsWithUncentainity" value={numberOfReflections3sigma} onChange={e => { if (reInts.test(e.target.value) || e.target.value === '') { setFormData({ ...formData, numberOfReflections3sigma: e.target.value }) } }} />
                    <fieldset>
                        <h4 className="mt-5"> R factor value </h4>
                        <input type="text" name="rFactorValue" value={rFactorValue} onChange={e => { decimalNumbersMax1(e); setFormData({ ...formData, rFactorValue: e.target.value }) }} />
                    </fieldset>
                    <h4 className="mt-5"> Number of parameters in the model</h4>
                    <input type="text" name="numberOfParameters" value={numberOfParameters} onChange={e => { if (reInts.test(e.target.value) || e.target.value === '') { setFormData({ ...formData, numberOfParameters: e.target.value }) } }} />
                    <h4 className="mt-5"> Refined composition</h4>
                    <div id="addedElementsRefined"> </div>
                    <br />
                    <div className="mb-5 w-100">
                        <h4> You can add any number of elements that the structure has.</h4>
                        {Object.keys(elementsRefined).map((key, index) => (
                            <p key={index}> <strong>{key}</strong> : <strong>{elementsRefined[key]}</strong>% in structure <button className="btn btn-danger" onClick={e => { let copyCarValues = { ...elementsInRefinedStructure.elementsRefined }; delete copyCarValues[key]; setElementsInRefinedStructure({ ...elementsInRefinedStructure, elementsRefined: copyCarValues }); currentChemicalFormulaRefinedTemp = parseElementsToString(elementsRefined); setFormData({ ...formData, currentChemicalFormulaRefined: currentChemicalFormulaRefinedTemp }) }}>DELETE</button> </p>
                        ))}
                        <div> {currentChemicalFormulaRefined ? "Current structure formula:" : ""}  {outputElementsString(currentChemicalFormulaRefined)} </div>
                        <button type="button" className="btn btn-primary mt-3" onClick={e => setElementsVisibilityData({ ...elementsVisibilityData, addingNewElementRefinedEnabled: !elementsVisibilityData.addingNewElementRefinedEnabled })}>Add element</button>
                        <br />
                        {elementsVisibilityData.addingNewElementRefinedEnabled ? addingNewElementRefinedJSX : ""}

                    </div>
                </div>
                <div className="w-100 text-center my-5">
                    <button className="btn btn-success p-3 px-5" type="submit">Submit</button>
                </div>

            </form>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { addStructure })(AddStructure);
