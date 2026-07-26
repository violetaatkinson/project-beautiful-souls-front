import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/UserService";
import Input from "../../components/misc/Input/Input";
import RegisterSchema from "./RegisterSchema";
import Cat from "../../assets/cat.png";
import "./Register.css";

const INITIAL_VALUES = {
	email: "",
	password: "",
};

function Register() {
	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		errors,
		isSubmitting,
		setSubmitting,
		setFieldError,
	} = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: onSubmit,
		validationSchema: RegisterSchema,
		validateOnBlur: false,
		validateOnChange: false,
	});

	const navigate = useNavigate();

	function onSubmit(values) {
		createUser(values)
			.then((user) => {
				navigate("/login", {
					state: {
						email: values.email,
					},
				});
			})
			.catch((err) => {
				const data = err?.response?.data;

				if (data?.errors) {
					Object.keys(data.errors).forEach((errorKey) => {
						setFieldError(errorKey, data.errors[errorKey]);
					});
				} else {
					setFieldError(
						"email",
						data?.message || "Something went wrong, please try again",
					);
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<div className="Register">
			<img src={Cat} alt="logo" height={190} />
			<div className="Register-form">
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					<div className="Register-form-group">
						<Input
							label="Email"
							placeholder="you@email.com"
							name="email"
							id="email"
							value={values.email}
							onChange={handleChange}
							error={errors.email}
							onBlur={handleBlur}
						/>
					</div>
					<div className="Register-form-group">
						<Input
							label="Password"
							placeholder="Enter your password"
							type="password"
							name="password"
							id="password"
							value={values.password}
							onChange={handleChange}
							error={errors.password}
							onBlur={handleBlur}
						/>
					</div>
					<button type="submit" className="button mt-4" disabled={isSubmitting}>
						{isSubmitting ? "Loading..." : "Submit"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
