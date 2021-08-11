import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createSelectCountry } from "../../store/covid19/actions";

export default function CountriesList(props) {
    const [value, setValue] = useState();
    const dispatch = useDispatch();

    const handleChange = (event) => {  
        setValue(event.target.value);    
        dispatch(createSelectCountry(event.target.value));
    }

    useEffect(() => {
        if(value === undefined) {
            dispatch(createSelectCountry("Global"))
        }        
    }, [value])

    return (
        <select value={value} onChange={handleChange}>
            <option key="Global" value="Global">Общая</option>
            {props.countriesList.map((item) => <option key={item.ISO2} value={item.Slug}>{item.Country}</option>)}            
        </select>
    )
}