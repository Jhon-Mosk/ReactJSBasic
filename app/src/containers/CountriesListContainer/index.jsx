import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { covid19Api } from "../../api";
import CountriesList from "../../components/CountriesList";
import { getCountries } from "../../store/covid19/actions";
import { getCountriesList, getCountriesListLoadingStatus } from "../../store/covid19/selectors";

export default function CountriesListContainer() {
    const dispatch = useDispatch();
    const countriesList = useSelector(getCountriesList);
    const countriesListLoadingStatus = useSelector(getCountriesListLoadingStatus)

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