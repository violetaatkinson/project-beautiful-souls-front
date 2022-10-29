import Dashboard from "../components/misc/Dashboard/Dashboard";
import Navbar from "../components/misc/Navbar/Navbar";

export const NavbarLayout = ({ children }) => {
    return <>
        <Navbar/>
        {children}
        <Dashboard/>
    </>
}
