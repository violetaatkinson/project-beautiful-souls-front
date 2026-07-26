import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Input.css";

function Input({
	type = "text",
	label,
	placeholder,
	onChange,
	value,
	id,
	name,
	error,
	onBlur,
}) {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === "password";
	const inputType = isPassword && showPassword ? "text" : type;

	return (
		<div className="f-group">
			{label && (
				<label htmlFor={id} className="f-label">
					{label}
				</label>
			)}
			<div className={`f-input-wrap ${isPassword ? "has-toggle" : ""}`}>
				<input
					type={inputType}
					className={`f-control ${error ? "is-invalid" : ""}`}
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					onBlur={onBlur}
				/>
				{isPassword && (
					<button
						type="button"
						className="f-toggle-password"
						onClick={() => setShowPassword((prev) => !prev)}
						aria-label={showPassword ? "Hide password" : "Show password"}
						tabIndex={-1}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				)}
			</div>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
}

export default Input;
