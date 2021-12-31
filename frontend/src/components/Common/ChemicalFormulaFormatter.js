export const ChemicalFormulaFormatter = ({ formula }) => {
    var regexStr = formula.match(/[a-z]+|[^a-z]+/gi);
    var output = [];
    if (regexStr)
        for (const i of regexStr) {
            if (/^[a-zA-Z]+$/.test(i)) {
                output.push(i);
            }
            else {
                output.push(<sub>{i}</sub>)
            }
        }
    return output;
};