import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CountriesList from "../../components/CountriesList";

import { covid19Api } from "../../api";
import { getCountries } from "../../store/covid19/actions";
import { getCountriesList, getCountriesListError, getCountriesListLoadingStatus } from "../../store/covid19/selectors";

export default function CountriesListContainer() {
    const dispatch = useDispatch();
    const countriesList = useSelector(getCountriesList);
    const countriesListLoadingStatus = useSelector(getCountriesListLoadingStatus);
    const countriesListError = useSelector(getCountriesListError);

    const getCountriesWithThunk = () => {
        dispatch(getCountries(covid19Api.getCountries));
    }

    const refresh = () => {
        getCountriesWithThunk();
    }

    useEffect(() => {
        getCountriesWithThunk();
    }, []);

    if(countriesListLoadingStatus === 1) {
        return (
            <select>
                <option>Загрузка...</option>
            </select>
        )
    } else if (countriesListLoadingStatus === 3 || countriesListLoadingStatus === undefined) {
        console.error(countriesListError);
        return (
            <div>
                <h3>Ошибка загрузки</h3>
                <button type="button" onClick={refresh}>Перезагрузить</button>
            </div>
        )
    }
    
    return (            
        <CountriesList
            countriesList={countriesList}
        />            
    )    
}