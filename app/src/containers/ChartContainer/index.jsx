import { useSelector } from "react-redux";
import { covid19Api } from "../../api";
import Chart from "../../components/Chart";
import { useRequestApi } from "../../hooks/api/useRequestApi";
import { getSelectCountry } from "../../store/covid19/selectors";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from "react";

export default function ChartContainer() {
    const selectCountry = useSelector(getSelectCountry);
    const[currentCountry, setCurrentCountry] = useState("russia");

    useEffect(() => {
        if(selectCountry !== "Global") {
            setCurrentCountry(selectCountry);
            
            dayOneAllStatus.request(currentCountry)
        } else {
            setCurrentCountry("russia");
            dayOneAllStatus.request(currentCountry)
        }
    }, [selectCountry, currentCountry])
    
    const dayOneAllStatus = useRequestApi({
        api: () => covid19Api.getDayOneAllStatus(currentCountry),
        isAutoRun: false,
    });


    if(dayOneAllStatus.isLoading) {
        return <CircularProgress />
    }

    if(dayOneAllStatus.isError) {
        console.warm(dayOneAllStatus.isError);
        return <div>ошибка загрузки данных</div>
    }

    return (
        <Chart 
            dayOneAllStatus={dayOneAllStatus.data || []}
        />
    )
}