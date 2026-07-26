import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react";
import {
	createPet,
	updatePet,
	getPetDetail,
} from "../../../services/PetService";
import backArrow from "../../../assets/go-back.png";
import "./NewAdoption.css";

const SPECIES = ["Dog", "Cat", "Reptile", "Bird", "Other"];
const SIZES = ["Small", "Medium", "Large", "ExtraLarge"];
const SEX = ["Female", "Male"];
const ENERGY_LEVELS = ["Low", "Medium", "High"];
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
	{ value: "unknown", label: "No sé" },
	{ value: "yes", label: "Sí" },
	{ value: "no", label: "No" },
];

const STEPS = ["Datos básicos", "Fotos", "Salud y personalidad", "Requisitos"];

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
	const [photos, setPhotos] = useState([]); // File[] nuevos, solo si el usuario elige fotos
	const [existingImages, setExistingImages] = useState([]); // URLs que ya tenía (modo edición)
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
		const files = Array.from(event.target.files).slice(0, 8 - photos.length);
		setPhotos((prev) => [...prev, ...files].slice(0, 8));
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
		if (step === 1) return edit ? true : photos.length > 0; // al crear, pedimos al menos 1 foto
		if (step === 2) return true; // salud/personalidad son opcionales
		if (step === 3) return data.description.trim().length >= 10;
		return true;
	};

	const goNext = () => {
		if (!stepIsValid()) {
			setError("Completá los campos requeridos antes de continuar.");
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
		if (!stepIsValid()) return;

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
				err?.response?.data?.message || "Algo salió mal, probá de nuevo.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="wizard-screen">
			<Link className="link-unstyled" to="/search">
				<img
					src={backArrow}
					alt="back"
					width={20}
					className="mt-4 search-arrow"
				/>
			</Link>

			<h1 className="text-center wizard-title">
				{edit ? "Editar mascota" : "Publicar mascota"}
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
						<label>Nombre</label>
						<input
							className="form-control"
							value={data.name}
							onChange={(e) => updateField("name", e.target.value)}
							placeholder="Nombre de la mascota"
						/>

						<label>Especie</label>
						<select
							className="form-select"
							value={data.species}
							onChange={(e) => updateField("species", e.target.value)}
						>
							<option value="">Elegí una especie</option>
							{SPECIES.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>

						<label>Raza (opcional)</label>
						<input
							className="form-control"
							value={data.breed}
							onChange={(e) => updateField("breed", e.target.value)}
							placeholder="Mestizo, Labrador, etc."
						/>

						<div className="row-fields">
							<div>
								<label>Años</label>
								<input
									type="number"
									min="0"
									className="form-control"
									value={data.ageYears}
									onChange={(e) => updateField("ageYears", e.target.value)}
								/>
							</div>
							<div>
								<label>Meses</label>
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

						<label>Sexo</label>
						<select
							className="form-select"
							value={data.sex}
							onChange={(e) => updateField("sex", e.target.value)}
						>
							<option value="">Elegí una opción</option>
							{SEX.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>

						<label>Tamaño</label>
						<select
							className="form-select"
							value={data.size}
							onChange={(e) => updateField("size", e.target.value)}
						>
							<option value="">Elegí un tamaño</option>
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
								<label>Fotos actuales</label>
								<div className="photo-grid">
									{existingImages.map((url) => (
										<div key={url} className="photo-thumb">
											<img src={url} alt="foto actual" />
										</div>
									))}
								</div>
								<p className="hint-text">
									Si subís fotos nuevas, van a reemplazar a estas.
								</p>
							</>
						)}

						<label>
							{existingImages.length > 0
								? "Reemplazar fotos"
								: "Fotos (hasta 8)"}
						</label>
						<input
							type="file"
							accept="image/png,image/jpeg"
							multiple
							className="form-control"
							onChange={handlePhotosSelected}
							disabled={photos.length >= 8}
						/>

						<div className="photo-grid">
							{photos.map((file, i) => (
								<div key={i} className="photo-thumb">
									<img src={URL.createObjectURL(file)} alt={`foto ${i + 1}`} />
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
						<label>Personalidad</label>
						<div className="chip-select">
							{PERSONALITY_TAGS.map((tag) => (
								<button
									type="button"
									key={tag}
									className={`chip-option ${data.personalityTags.includes(tag) ? "selected" : ""}`}
									onClick={() => togglePersonalityTag(tag)}
								>
									{data.personalityTags.includes(tag) && <Check size={12} />}{" "}
									{tag}
								</button>
							))}
						</div>

						<label>Nivel de energía</label>
						<select
							className="form-select"
							value={data.energyLevel}
							onChange={(e) => updateField("energyLevel", e.target.value)}
						>
							<option value="">No especificado</option>
							{ENERGY_LEVELS.map((l) => (
								<option key={l} value={l}>
									{l}
								</option>
							))}
						</select>

						<label>Salud</label>
						<div className="check-list">
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.vaccinated}
									onChange={(e) =>
										updateNested("health", "vaccinated", e.target.checked)
									}
								/>
								Vacunado
							</label>
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.sterilized}
									onChange={(e) =>
										updateNested("health", "sterilized", e.target.checked)
									}
								/>
								Castrado
							</label>
							<label className="check-item">
								<input
									type="checkbox"
									checked={data.health.dewormed}
									onChange={(e) =>
										updateNested("health", "dewormed", e.target.checked)
									}
								/>
								Desparasitado
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
								Tiene alguna condición de salud
							</label>
						</div>

						{data.health.hasKnownConditions && (
							<input
								className="form-control mt-2"
								placeholder="Contanos cuál"
								value={data.health.conditionsDetails}
								onChange={(e) =>
									updateNested("health", "conditionsDetails", e.target.value)
								}
							/>
						)}

						<label className="mt-3">Convivencia</label>
						{["withKids", "withDogs", "withCats"].map((field) => (
							<div key={field} className="compatibility-row">
								<span>
									{
										{
											withKids: "Con niños",
											withDogs: "Con perros",
											withCats: "Con gatos",
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
						<label>Descripción</label>
						<textarea
							className="form-control"
							rows={4}
							value={data.description}
							onChange={(e) => updateField("description", e.target.value)}
							placeholder="Contá cómo es, su historia, qué la hace especial..."
						/>

						<label>Requisitos para adoptar (opcional)</label>
						<div className="requirement-input">
							<input
								className="form-control"
								value={requirementDraft}
								onChange={(e) => setRequirementDraft(e.target.value)}
								placeholder="Ej: Vivienda con patio"
								onKeyDown={(e) =>
									e.key === "Enter" && (e.preventDefault(), addRequirement())
								}
							/>
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={addRequirement}
							>
								Agregar
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

						<label>Ubicación (opcional)</label>
						<div className="row-fields">
							<input
								className="form-control"
								placeholder="Ciudad"
								value={data.location.city}
								onChange={(e) =>
									updateNested("location", "city", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Provincia"
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
							<ArrowLeft size={16} /> Atrás
						</button>
					)}

					{step < STEPS.length - 1 ? (
						<button type="button" className="btn btn-primary" onClick={goNext}>
							Siguiente <ArrowRight size={16} />
						</button>
					) : (
						<button
							type="submit"
							className="btn btn-primary"
							disabled={submitting}
						>
							{submitting
								? "Guardando..."
								: edit
									? "Guardar cambios"
									: "Publicar"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default NewAdoption;
