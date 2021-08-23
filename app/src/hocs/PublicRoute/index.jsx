import { Route } from "react-router-dom";

export default function PublicRoute({ authenticated, ...rest}) {
    return !authenticated ?
    <Route { ...rest } /> :
    <Route { ...rest } />;
}