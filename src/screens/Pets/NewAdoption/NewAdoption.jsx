import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, X, Check, Zap } from "lucide-react";
import {
	createPet,
	updatePet,
	getPetDetail,
} from "../../../services/PetService";
import "./NewAdoption.css";

const SPECIES = ["Dog", "Cat", "Reptile", "Bird", "Other"];
const SIZES = ["Small", "Medium", "Large", "ExtraLarge"];
const SEX = ["Female", "Male"];
const ENERGY_LEVELS = ["Low", "Medium", "High"];
const MAX_PHOTOS = 4;
const PERSONALITY_TAGS = [
	"Playful",
	"Calm",
	"Affectionate",
	"Independent",
	"Shy",
	"Protective",
	"Curious",
	"Sociable",
];
const COMPATIBILITY_OPTIONS = [
	{ value: "unknown", label: "Not sure" },
	{ value: "yes", label: "Yes" },
	{ value: "no", label: "No" },
];

const STEPS = ["Basic info", "Photos", "Health & personality", "Requirements"];

const INITIAL_STATE = {
	name: "",
	species: "",
	breed: "",
	ageYears: "",
	ageMonths: "",
	sex: "",
	size: "",
	description: "",
	personalityTags: [],
	energyLevel: "",
	health: {
		vaccinated: false,
		sterilized: false,
		dewormed: false,
		hasKnownConditions: false,
		conditionsDetails: "",
	},
	compatibility: {
		withKids: "unknown",
		withDogs: "unknown",
		withCats: "unknown",
	},
	adoptionRequirements: [],
	location: { city: "", province: "" },
};

const NewAdoption = ({ edit }) => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [step, setStep] = useState(0);
	const [data, setData] = useState(INITIAL_STATE);
	const [photos, setPhotos] = useState([]);
	const [existingImages, setExistingImages] = useState([]);
	const [requirementDraft, setRequirementDraft] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (edit && id) {
			getPetDetail(id).then((pet) => {
				setData({
					...INITIAL_STATE,
					...pet,
					health: { ...INITIAL_STATE.health, ...pet.health },
					compatibility: {
						...INITIAL_STATE.compatibility,
						...pet.compatibility,
					},
					location: { ...INITIAL_STATE.location, ...pet.location },
				});
				setExistingImages(pet.images || []);
			});
		}
	}, [edit, id]);

	const updateField = (field, value) =>
		setData((prev) => ({ ...prev, [field]: value }));
	const updateNested = (group, field, value) =>
		setData((prev) => ({
			...prev,
			[group]: { ...prev[group], [field]: value },
		}));

	const togglePersonalityTag = (tag) => {
		setData((prev) => ({
			...prev,
			personalityTags: prev.personalityTags.includes(tag)
				? prev.personalityTags.filter((t) => t !== tag)
				: [...prev.personalityTags, tag],
		}));
	};

	const handlePhotosSelected = (event) => {
		const files = Array.from(event.target.files).slice(
			0,
			MAX_PHOTOS - photos.length,
		);
		setPhotos((prev) => [...prev, ...files].slice(0, MAX_PHOTOS));
	};

	const removePhoto = (index) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index));
	};

	const addRequirement = () => {
		const value = requirementDraft.trim();
		if (!value) return;
		setData((prev) => ({
			...prev,
			adoptionRequirements: [...prev.adoptionRequirements, value],
		}));
		setRequirementDraft("");
	};

	const removeRequirement = (index) => {
		setData((prev) => ({
			...prev,
			adoptionRequirements: prev.adoptionRequirements.filter(
				(_, i) => i !== index,
			),
		}));
	};

	const stepIsValid = () => {
		if (step === 0) return data.name && data.species && data.sex && data.size;
		if (step === 1) return edit ? true : photos.length > 0;
		if (step === 2) return true;
		if (step === 3) return data.description.trim().length >= 10;
		return true;
	};

	const goNext = () => {
		if (!stepIsValid()) {
			setError("Please fill in the required fields to continue.");
			return;
		}
		setError("");
		setStep((s) => Math.min(s + 1, STEPS.length - 1));
	};

	const goBack = () => setStep((s) => Math.max(s - 1, 0));

	const buildFormData = () => {
		const formData = new FormData();
		const jsonFields = [
			"personalityTags",
			"health",
			"compatibility",
			"adoptionRequirements",
			"location",
		];
		const flatFields = [
			"name",
			"species",
			"breed",
			"ageYears",
			"ageMonths",
			"sex",
			"size",
			"description",
			"energyLevel",
		];

		flatFields.forEach((field) => {
			if (data[field] !== "" && data[field] !== undefined)
				formData.append(field, data[field]);
		});

		jsonFields.forEach((field) =>
			formData.append(field, JSON.stringify(data[field])),
		);

		photos.forEach((file) => formData.append("images", file));

		return formData;
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (!stepIsValid()) {
			setError(
				"Please write a description (at least 10 characters) before publishing.",
			);
			return;
		}

		setSubmitting(true);
		setError("");

		try {
			const formData = buildFormData();
			if (edit) {
				await updatePet(id, formData);
			} else {
				await createPet(formData);
			}
			navigate("/myadoptions");
		} catch (err) {
			setError(
				err?.response?.data?.message ||
					"Something went wrong, please try again.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="wizard-screen">
			<button
				type="button"
				className="wizard-back-btn"
				onClick={() => navigate(-1)}
				aria-label="Back"
			>
				<ArrowLeft size={20} />
			</button>

			<h1 className="text-center wizard-title">
				{edit ? "Edit Pet" : "Publish a Pet"}
			</h1>

			<div className="wizard-progress">
				{STEPS.map((label, i) => (
					<div
						key={label}
						className={`wizard-step-dot ${i <= step ? "active" : ""}`}
					>
						<span>{i + 1}</span>
						<p>{label}</p>
					</div>
				))}
			</div>

			<form onSubmit={onSubmit} className="wizard-form">
				{step === 0 && (
					<div className="wizard-panel">
						<label>Name</label>
						<input
							className="form-control"
							value={data.name}
							onChange={(e) => updateField("name", e.target.value)}
							placeholder="Pet's name"
						/>

						<label>Species</label>
						<select
							className="form-select"
							value={data.species}
							onChange={(e) => updateField("species", e.target.value)}
						>
							<option value="">Select a species</option>
							{SPECIES.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>

						<label>Breed (optional)</label>
						<input
							className="form-control"
							value={data.breed}
							onChange={(e) => updateField("breed", e.target.value)}
							placeholder="Mixed breed, Labrador, etc."
						/>

						<div className="row-fields">
							<div>
								<label>Years</label>
								<input
									type="number"
									min="0"
									className="form-control"
									value={data.ageYears}
									onChange={(e) => updateField("ageYears", e.target.value)}
								/>
							</div>
							<div>
								<label>Months</label>
								<input
									type="number"
									min="0"
									max="11"
									className="form-control"
									value={data.ageMonths}
									onChange={(e) => updateField("ageMonths", e.target.value)}
								/>
							</div>
						</div>

						<label>Sex</label>
						<select
							className="form-select"
							value={data.sex}
							onChange={(e) => updateField("sex", e.target.value)}
						>
							<option value="">Select an option</option>
							{SEX.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>

						<label>Size</label>
						<select
							className="form-select"
							value={data.size}
							onChange={(e) => updateField("size", e.target.value)}
						>
							<option value="">Select a size</option>
							{SIZES.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					</div>
				)}

				{step === 1 && (
					<div className="wizard-panel">
						{existingImages.length > 0 && (
							<>
								<label>Current photos</label>
								<div className="photo-grid">
									{existingImages.map((url) => (
										<div key={url} className="photo-thumb">
											<img src={url} alt="Current" />
										</div>
									))}
								</div>
								<p className="hint-text">
									Uploading new photos will replace these.
								</p>
							</>
						)}

						<label>
							{existingImages.length > 0
								? "Replace photos"
								: `Photos (up to ${MAX_PHOTOS})`}
						</label>
						<input
							type="file"
							accept="image/png,image/jpeg"
							multiple
							className="form-control"
							onChange={handlePhotosSelected}
							disabled={photos.length >= MAX_PHOTOS}
						/>

						<div className="photo-grid">
							{photos.map((file, i) => (
								<div key={i} className="photo-thumb">
									<img
										src={URL.createObjectURL(file)}
										alt={`Upload ${i + 1}`}
									/>
									<button
										type="button"
										className="photo-remove"
										onClick={() => removePhoto(i)}
									>
										<X size={14} />
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="wizard-panel">
						<label>Personality</label>
						<div className="chip-select">
							{PERSONALITY_TAGS.map((tag) => (
								<button
									type="button"
									key={tag}
									className={`chip-option ${data.personalityTags.includes(tag) ? "selected" : ""}`}
									onClick={() => togglePersonalityTag(tag)}
								>
									{data.personalityTags.includes(tag) && <Check size={12} />}
									<span>{tag}</span>
								</button>
							))}
						</div>

						<label className="label-with-icon">
							<Zap size={14} /> Energy level
						</label>
						<select
							className="form-select"
							value={data.energyLevel}
							onChange={(e) => updateField("energyLevel", e.target.value)}
						>
							<option value="">Not specified</option>
							{ENERGY_LEVELS.map((l) => (
								<option key={l} value={l}>
									{l}
								</option>
							))}
						</select>

						<label>Health</label>
						<div className="check-list">
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.vaccinated}
									onChange={(e) =>
										updateNested("health", "vaccinated", e.target.checked)
									}
								/>
								Vaccinated
							</label>
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.sterilized}
									onChange={(e) =>
										updateNested("health", "sterilized", e.target.checked)
									}
								/>
								Neutered/Spayed
							</label>
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.dewormed}
									onChange={(e) =>
										updateNested("health", "dewormed", e.target.checked)
									}
								/>
								Dewormed
							</label>
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.hasKnownConditions}
									onChange={(e) =>
										updateNested(
											"health",
											"hasKnownConditions",
											e.target.checked,
										)
									}
								/>
								Has a known health condition
							</label>
						</div>

						{data.health.hasKnownConditions && (
							<input
								className="form-control mt-2"
								placeholder="Tell us more"
								value={data.health.conditionsDetails}
								onChange={(e) =>
									updateNested("health", "conditionsDetails", e.target.value)
								}
							/>
						)}

						<label className="mt-3">Living with others</label>
						{["withKids", "withDogs", "withCats"].map((field) => (
							<div key={field} className="compatibility-row">
								<span>
									{
										{
											withKids: "With kids",
											withDogs: "With dogs",
											withCats: "With cats",
										}[field]
									}
								</span>
								<select
									className="form-select"
									value={data.compatibility[field]}
									onChange={(e) =>
										updateNested("compatibility", field, e.target.value)
									}
								>
									{COMPATIBILITY_OPTIONS.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
						))}
					</div>
				)}

				{step === 3 && (
					<div className="wizard-panel">
						<label>Description</label>
						<textarea
							className="form-control"
							rows={4}
							value={data.description}
							onChange={(e) => updateField("description", e.target.value)}
							placeholder="Tell us about their personality, story, what makes them special..."
						/>

						<label>Adoption requirements (optional)</label>
						<div className="requirement-input">
							<input
								className="form-control"
								value={requirementDraft}
								onChange={(e) => setRequirementDraft(e.target.value)}
								placeholder="e.g. Home with a yard"
								onKeyDown={(e) =>
									e.key === "Enter" && (e.preventDefault(), addRequirement())
								}
							/>
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={addRequirement}
							>
								Add
							</button>
						</div>
						<ul className="requirement-list">
							{data.adoptionRequirements.map((req, i) => (
								<li key={i}>
									{req}
									<button type="button" onClick={() => removeRequirement(i)}>
										<X size={14} />
									</button>
								</li>
							))}
						</ul>

						<label>Location (optional)</label>
						<div className="row-fields">
							<input
								className="form-control"
								placeholder="City"
								value={data.location.city}
								onChange={(e) =>
									updateNested("location", "city", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Province/State"
								value={data.location.province}
								onChange={(e) =>
									updateNested("location", "province", e.target.value)
								}
							/>
						</div>
					</div>
				)}

				{error && <p className="wizard-error">{error}</p>}

				<div className="wizard-actions">
					{step > 0 && (
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={goBack}
						>
							<ArrowLeft size={16} /> Back
						</button>
					)}

					{step < STEPS.length - 1 ? (
						<button type="button" className="btn btn-primary" onClick={goNext}>
							Next <ArrowRight size={16} />
						</button>
					) : (
						<button
							type="submit"
							className="btn btn-primary"
							disabled={submitting}
						>
							{submitting ? "Saving..." : edit ? "Save changes" : "Publish"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default NewAdoption;
