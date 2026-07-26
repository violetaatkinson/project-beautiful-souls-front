import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Building2, ArrowLeft, Camera } from "lucide-react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { updateUser, getCurrentUser } from "../../../services/UserService";
import Input from "../../../components/misc/Input/Input";
import "./Edit.css";

const INITIAL_STATE = {
  userName: "",
  email: "",
  phoneNumber: "",
  accountType: "individual",
  shelterName: "",
  city: "",
  province: "",
  image: "",
};

const Edit = () => {
  const { user, getUser } = useAuthContext();
  const navigate = useNavigate();
  const [userState, setUserState] = useState(INITIAL_STATE);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCurrentUser().then((fetched) => {
      setUserState((prev) => ({
        ...prev,
        userName: fetched.userName || "",
        email: fetched.email || "",
        phoneNumber: fetched.phoneNumber || "",
        accountType: fetched.accountType || "individual",
        shelterName: fetched.shelterName || "",
        city: fetched.city || "",
        province: fetched.province || "",
      }));
      setPreview(fetched.image || "");
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUserState((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const setAccountType = (accountType) => setUserState((prev) => ({ ...prev, accountType }));

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(userState).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) formData.append(key, value);
    });

    updateUser(user.id, formData)
      .then(() => {
        getUser();
        navigate("/profile");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="edit-screen">
      <Link className="link-unstyled edit-back-btn" to="/profile">
        <ArrowLeft size={20} />
      </Link>
      <h1 className="edit-title">Complete Your Profile</h1>

      <form onSubmit={onSubmit} className="edit-form">
        <div className="edit-photo-picker">
          <label htmlFor="image" className="edit-photo-label">
            <img src={preview || user?.image} alt="Profile" className="edit-photo-preview" />
            <span className="edit-photo-overlay"><Camera size={16} /></span>
          </label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handlePhoto} hidden />
        </div>

        <Input label="Username" placeholder="Your username" name="userName" id="userName" value={userState.userName} onChange={handleChange} />
        <Input label="Email" type="email" placeholder="you@email.com" name="email" id="email" value={userState.email} onChange={handleChange} />
        <Input label="Phone number" placeholder="+1 555 000 0000" name="phoneNumber" id="phoneNumber" value={userState.phoneNumber} onChange={handleChange} />

        <div className="edit-account-type">
          <label className="f-label">Account type</label>
          <div className="account-type-toggle">
            <button
              type="button"
              className={`account-type-btn ${userState.accountType === "individual" ? "active" : ""}`}
              onClick={() => setAccountType("individual")}
            >
              <Home size={16} /> Individual
            </button>
            <button
              type="button"
              className={`account-type-btn ${userState.accountType === "shelter" ? "active" : ""}`}
              onClick={() => setAccountType("shelter")}
            >
              <Building2 size={16} /> Shelter
            </button>
          </div>
        </div>

        {userState.accountType === "shelter" && (
          <Input label="Shelter name" placeholder="Your shelter's name" name="shelterName" id="shelterName" value={userState.shelterName} onChange={handleChange} />
        )}

        <div className="edit-row">
          <Input label="City" placeholder="City" name="city" id="city" value={userState.city} onChange={handleChange} />
          <Input label="Province / State" placeholder="Province or state" name="province" id="province" value={userState.province} onChange={handleChange} />
        </div>

        <button type="submit" className="button edit-submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default Edit;