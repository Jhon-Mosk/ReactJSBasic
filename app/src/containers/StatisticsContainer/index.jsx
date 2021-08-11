import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Statistics from "../../components/Statistics";

import { covid19Api } from "../../api";
import { getSummaryStatistics } from "../../store/covid19/actions";
import { getSelectCountry, getSummaryStatisticsData, getSummaryStatisticsError, getSummaryStatisticsLoadingStatus } from "../../store/covid19/selectors";

export default function StatisticsContainer() {
    const dispatch = useDispatch();
    const selectCountry = useSelector(getSelectCountry);
    const summaryStatisticsLoadingStatus = useSelector(getSummaryStatisticsLoadingStatus);
    const summaryStatistics = useSelector(getSummaryStatisticsData);
    const summaryStatisticsError = useSelector(getSummaryStatisticsError);

    const getSummaryStatisticsWithThunk = () => {
        dispatch(getSummaryStatistics(covid19Api.getSummary));
    }
    const refresh = () => {
        getSummaryStatisticsWithThunk();
    }

    useEffect(() => {
        getSummaryStatisticsWithThunk();
    }, []);

    let data = {
        NewConfirmed: "нет данных",
        TotalConfirmed: "нет данных",
        NewDeaths: "нет данных",
        TotalDeaths: "нет данных",
        NewRecovered: "нет данных",
        TotalRecovered: "нет данных",
    };

    if (summaryStatisticsLoadingStatus === 1) {
        data = {
            NewConfirmed: "загрузка",
            TotalConfirmed: "загрузка",
            NewDeaths: "загрузка",
            TotalDeaths: "загрузка",
            NewRecovered: "загрузка",
            TotalRecovered: "загрузка",
        };
    } else if (summaryStatisticsLoadingStatus === 3 || summaryStatisticsLoadingStatus === undefined) {
        console.error(summaryStatisticsError);
        data = {
            NewConfirmed: "ошибка загрузки данных",
            TotalConfirmed: "ошибка загрузки данных",
            NewDeaths: "ошибка загрузки данных",
            TotalDeaths: "ошибка загрузки данных",
            NewRecovered: "ошибка загрузки данных",
            TotalRecovered: "ошибка загрузки данных",
        };
        return (
            <div>
                <h3>Ошибка загрузки</h3>
                <button type="button" onClick={refresh}>Перезагрузить</button>
            </div>
        )
    }

    if (selectCountry !== "Global") {
        const dataCountries = summaryStatistics.Countries;
        const currentCountry = dataCountries.filter((item) => selectCountry === item.Slug);
        if (currentCountry[0] !== undefined) {
            data = currentCountry[0];
        }
    } else {
        data = summaryStatistics.Global;
    }

    return (
        <Statistics
            newConfirmed={data.NewConfirmed}
            totalConfirmed={data.TotalConfirmed}
            newDeaths={data.NewDeaths}
            totalDeaths={data.TotalDeaths}
            newRecovered={data.NewRecovered}
            totalRecovered={data.TotalRecovered}
        />
    )
}