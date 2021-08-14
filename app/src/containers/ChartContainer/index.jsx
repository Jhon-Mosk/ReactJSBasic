import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from "../../components/Chart";

import { covid19Api } from "../../api";
import { getDayOneAllData, getDayOneAllError, getDayOneAllLoadingStatus, getSelectCountry } from "../../store/covid19/selectors";
import { getDayOneAllStatus } from "../../store/covid19/actions";

export default function ChartContainer() {
    const dispatch = useDispatch();
    const selectCountry = useSelector(getSelectCountry);
    const dayOneAllLoadingStatus = useSelector(getDayOneAllLoadingStatus);
    const dayOneAllError = useSelector(getDayOneAllError);
    const dayOneAllData = useSelector(getDayOneAllData);
    const[currentCountry, setCurrentCountry] = useState("russia");

    const getDayOneAllStatusWithThunk = () => {
        dispatch(getDayOneAllStatus(() => covid19Api.getDayOneAllStatus(currentCountry)));
    }

    const checkSelectCountryAndDispatch = () => {
        if(selectCountry !== "Global") {
            setCurrentCountry(selectCountry);
            
            getDayOneAllStatusWithThunk(currentCountry)
        } else {
            setCurrentCountry("russia");
            getDayOneAllStatusWithThunk(currentCountry)
        }
    }

    const refresh = () => {
        checkSelectCountryAndDispatch();
    }

    useEffect(() => {
        checkSelectCountryAndDispatch();
    }, [selectCountry, currentCountry])
    
    if(dayOneAllLoadingStatus === 1) {
        return <CircularProgress />
    } else if (dayOneAllLoadingStatus === 3 || dayOneAllLoadingStatus === undefined) {
        console.error(dayOneAllError);
        return (
            <div>
                <h3>Ошибка загрузки</h3>
                <button type="button" onClick={refresh}>Перезагрузить</button>
            </div>
        )
    }
    
    return (
        <Chart 
            dayOneAllStatus={dayOneAllData || []}
        />
    )
}