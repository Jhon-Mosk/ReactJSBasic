import { useSelector } from "react-redux";
import { covid19Api } from "../../api";
import Statistics from "../../components/Statistics";
import { useRequestApi } from "../../hooks/api/useRequestApi";
import { getSelectCountry } from "../../store/covid19/selectors";

export default function StatisticsContainer() {
    const selectCountry = useSelector(getSelectCountry);

    const getSummaryStatistics = useRequestApi({
        api: covid19Api.getSummary,
        isAutoRun: true,
    });

    let data = {
        NewConfirmed: "нет данных",
        TotalConfirmed: "нет данных",
        NewDeaths: "нет данных",
        TotalDeaths: "нет данных",
        NewRecovered: "нет данных",
        TotalRecovered: "нет данных",
    };

    if (getSummaryStatistics.isLoading) {
        data = {
            NewConfirmed: "загрузка",
            TotalConfirmed: "загрузка",
            NewDeaths: "загрузка",
            TotalDeaths: "загрузка",
            NewRecovered: "загрузка",
            TotalRecovered: "загрузка",
        };
    }

    if (getSummaryStatistics.isError) {
        console.error(getSummaryStatistics.isError);
        data = {
            NewConfirmed: "ошибка загрузки данных",
            TotalConfirmed: "ошибка загрузки данных",
            NewDeaths: "ошибка загрузки данных",
            TotalDeaths: "ошибка загрузки данных",
            NewRecovered: "ошибка загрузки данных",
            TotalRecovered: "ошибка загрузки данных",
        };
    }

    if (getSummaryStatistics.data) {
        if (selectCountry !== "Global") {
            const currentData = getSummaryStatistics.data;
            const dataCountries = currentData.Countries;
            const currentCountry = dataCountries.filter((item) => selectCountry === item.Slug);
            if (currentCountry[0] !== undefined) {
                data = currentCountry[0];
            }
        } else {
            data = getSummaryStatistics.data.Global;
        }
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