import { covid19Api } from "../../api";
import CountriesList from "../../components/CountriesList";
import { useRequestApi } from "../../hooks/api/useRequestApi";

export default function CountriesListContainer() {    
    const getCountries = useRequestApi({
        api: covid19Api.getCountries,
        isAutoRun: true,
    });

    const countriesList = getCountries.data || [];

    return (
        <>
            <CountriesList
                countriesList={countriesList}            
            />
        </>
    )
}