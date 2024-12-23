import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";


const Main = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Header></Header>
        </div>
    );
};

export default Main;