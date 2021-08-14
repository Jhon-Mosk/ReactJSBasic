import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Chart(props) {
    return (
        <AreaChart width={1000} height={250} data={props.dayOneAllStatus}
            margin={{ top: 20, right: 30, left: 50, bottom: 0 }}>
            <defs>
                <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ca82ac" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ca82ac" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="Confirmed" stroke="#8884d8" fillOpacity={1} fill="url(#colorConfirmed)" />
            <Area type="monotone" dataKey="Recovered" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRecovered)" />
            <Area type="monotone" dataKey="Deaths" stroke="#ca82ac" fillOpacity={1} fill="url(#colorDeaths)" />
        </AreaChart>
    );
}