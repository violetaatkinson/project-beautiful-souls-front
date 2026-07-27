import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, X } from "lucide-react";
import { createAdopted } from "../../../services/AdoptedService";
import "./NewAdopted.css";

const INITIAL_STATE = {
	petName: "",
	content: "",
	image: null,
};

const NewAdopted = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(INITIAL_STATE);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handlePhotoSelected = (event) => {
		const file = event.target.files[0];
		if (file) setData((prev) => ({ ...prev, image: file }));
	};

	const removePhoto = () => setData((prev) => ({ ...prev, image: null }));

	const isValid = data.petName.trim().length >= 3 && data.content.trim().length >= 10;

	const onSubmit = (event) => {
		event.preventDefault();
		if (!isValid) {
			setError("Add a name (3+ characters) and a story (10+ characters) to share.");
			return;
		}

		setSubmitting(true);
		setError("");

		const formData = new FormData();
		formData.append("petName", data.petName);
		formData.append("content", data.content);
		if (data.image) formData.append("image", data.image);

		createAdopted(formData)
			.then(() => navigate("/adopted"))
			.catch((err) => {
				setError(err?.response?.data?.message || "Something went wrong, please try again.");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<div className="story-screen">
			<button
				type="button"
				className="story-back-btn"
				onClick={() => navigate(-1)}
				aria-label="Back"
			>
				<ArrowLeft size={20} />
			</button>

			<h1 className="story-title">A Pet You've Loved</h1>
			<p className="story-subtitle">However you want to remember them.</p>

			<form onSubmit={onSubmit} className="story-form">
				<div className="story-photo-field">
					{data.image ? (
						<div className="story-photo-preview">
							<img src={URL.createObjectURL(data.image)} alt="Preview" />
							<button
								type="button"
								className="story-photo-remove"
								onClick={removePhoto}
								aria-label="Remove photo"
							>
								<X size={14} />
							</button>
						</div>
					) : (
						<label className="story-photo-upload" htmlFor="story-image">
							<Camera size={24} strokeWidth={1.8} />
							<span>Add a photo</span>
						</label>
					)}
					<input
						id="story-image"
						type="file"
						accept="image/png,image/jpeg,image/heic,image/heif,image/webp"
						onChange={handlePhotoSelected}
						hidden
					/>
				</div>

				<div className="story-field-group">
					<label htmlFor="petName">Owner &amp; pet name</label>
					<input
						className="story-input"
						value={data.petName}
						onChange={(e) => setData((prev) => ({ ...prev, petName: e.target.value }))}
						name="petName"
						id="petName"
						placeholder="e.g. Viole - Margarita"
					/>
				</div>

				<div className="story-field-group">
					<label htmlFor="content">Tell your story</label>
					<textarea
						className="story-input story-textarea"
						value={data.content}
						onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
						name="content"
						id="content"
						rows={5}
						placeholder="Share what made them special..."
					/>
				</div>

				{error && <p className="story-error">{error}</p>}

				<button type="submit" className="story-submit-btn" disabled={submitting}>
					{submitting ? "Sharing..." : "Share story"}
				</button>
			</form>
		</div>
	);
};

export default NewAdopted;
