import profile from "../../../assets/pro.avif";
import find from "../../../assets/find.avif";
import adoption from "../../../assets/adoption.avif";
import owner from "../../../assets/owner.jpg";
import dogs from "../../../assets/dogs.jpg";
// eslint-disable-next-line
import search from "./Search.css";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../../layout/NavbarLayout";

function Search() {
	return (
		<NavbarLayout>
			<div className="search">
				<section className="carousel-inner mt-4 mb-3 search">
					<img src={profile} alt="profile" />
					<div className="search-info text-center">
						<h3>Edit your profile</h3>
						<Link className="link-unstyled" to={"/edit/profile"}>
							<button className="btn btn-outline-secondary mt-3">
								Fill Information
							</button>
						</Link>
					</div>
				</section>
				<section className="carousel-inner search mt-4 mb-3">
					<img src={find} alt="find" />
					<div className="search-info text-center">
						<h3>Find your partner</h3>
						<Link className="link-unstyled" to={"/adoptions"}>
							<button className="btn btn-outline-secondary mt-3">
								Find Pets
							</button>
						</Link>
					</div>
				</section>
				<section className="carousel-inner  search mt-4 mb-3">
					<img src={adoption} alt="search" />
					<div className="search-info text-center">
						<h3>Find them a home</h3>
						<Link className="link-unstyled" to={"/adoptions/create"}>
							<button className="btn btn-outline-secondary mt-3">
								Create Adoption
							</button>
						</Link>
					</div>
				</section>
				<section className="carousel-inner search mt-4 mb-3">
					<img src={owner} alt="search" className="search-img" />
					<div className="search-info text-center">
						<h3>Share Your Story</h3>
						<Link className="link-unstyled" to={"/adopted/create"}>
							<button className="btn btn-outline-secondary mt-3">
								Upload Picture
							</button>
						</Link>
					</div>
				</section>
				<section className="carousel-inner search mt-4 mb-3">
					<img src={dogs} alt="search" className="search-img"/>
					<div className="search-info text-center">
						<h3>They Found Their Home</h3>
						<Link className="link-unstyled" to={"/adopted"}>
							<button className="btn btn-outline-secondary mt-3">
								
								Already Adopted
							</button>
						</Link>
					</div>
				</section>
				
			</div>
		</NavbarLayout>
	);
}

export default Search;
