import CountriesListContainer from "../containers/CountriesListContainer";
import StatisticsContainer from "../containers/StatisticsContainer";
import ChartContainer from "../containers/ChartContainer";

export default function Covid19() {
    return (
        <>
            <div>Статистика</div>
            <CountriesListContainer />
            <StatisticsContainer />
            <ChartContainer />
        </>
    )
};