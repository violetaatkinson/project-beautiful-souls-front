import Dashboard from "../components/misc/Dashboard/Dashboard";
import Navbar from "../components/misc/Navbar/Navbar";

export const NavbarLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="page-content">{children}</div>
			<Dashboard />
		</>
	);
};
