export const RadioInput = ({label, value, checked, setter, className}) => {
	return (
        <div>
	  <label>
	    <input className={className} type="radio" value={value} checked={checked === value}
	           onChange={() => setter(value)} />
	    <span>{label}</span>
	  </label>
      </div>
	);
};