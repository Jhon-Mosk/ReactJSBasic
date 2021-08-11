export default function Statistics(props) {
    return (
        <div>            
            <div>Новые подтверждённые случаи: {props.newConfirmed}</div>
            <div>Всего подтверждённых случаев: {props.totalConfirmed}</div>
            <div>Новые смерти: {props.newDeaths}</div>
            <div>Всего смертей: {props.totalDeaths}</div>
            <div>Новые выздоровевшие: {props.newRecovered}</div>
            <div>Всего выздоровевших: {props.totalRecovered}</div>
        </div>
    )
}