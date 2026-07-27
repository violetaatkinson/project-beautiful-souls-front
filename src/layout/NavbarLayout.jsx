import Dashboard from "../components/misc/Dashboard/Dashboard";
import Navbar from "../components/misc/Navbar/Navbar";

export const NavbarLayout = ({ children, align }) => {
	return (
		<>
			<Navbar />
			<div className={`page-content ${align === "top" ? "align-top" : ""}`}>
				{children}
			</div>
			<Dashboard />
		</>
	);
};
