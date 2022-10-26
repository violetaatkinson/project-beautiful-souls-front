import profile from "../../../assets/pro.avif";
import find from "../../../assets/find.avif";
import adoption from "../../../assets/adoption.avif";
import friends from "../../../assets/friends.jpeg"
import owner from "../../../assets/owner.jpeg"
// eslint-disable-next-line 
import search from "./Search.css";
import { Link } from 'react-router-dom'


function Search() {
	return (
		<div>
			<section className="carousel-inner mt-4 mb-3">
                <img src={profile} alt="profile"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3>Edit your profile</h3>
                    <Link className="link-unstyled" to={"/edit/profile"}>
                        <button className="btn btn-outline-secondary mt-3">Fill Information</button>
                    </Link>
                </div>
            </section>
            <section className="carousel-inner mt-4 mb-3">
                <img src={find} alt="find"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3>Find your partner</h3>
                    <Link className="link-unstyled" to={"/adoptions"}>
                        <button className="btn btn-outline-secondary mt-3">Find Pets</button>
                    </Link>
                </div>
            </section>
            <section className="carousel-inner mt-4 mb-3">
                <img src={adoption} alt="search"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3>Find them a home</h3>
                    <Link className="link-unstyled" to={"/adoptions/create"}>
                        <button className="btn btn-outline-secondary mt-3">Create Adoption</button>
                    </Link>
                </div>
            </section>
            <section className="carousel-inner mt-4 mb-3">
                <img src={owner} alt="search"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3>They Found A Home</h3>
                    <Link className="link-unstyled" to={"/adopted"}>
                        <button className="btn btn-outline-secondary mt-3">Upload Picture</button>
                    </Link>
                </div>
            </section>
            <section className="carousel-inner mt-4 mb-3">
                <img src={friends} alt="search"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3>Keep In Touch</h3>
                    <Link className="link-unstyled" to={"/chat"}>
                        <button className="btn btn-outline-secondary mt-3">Stay Conected</button>
                    </Link>
                </div>
            </section>
		</div>
	);
}

export default Search;

