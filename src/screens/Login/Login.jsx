import { useFormik } from 'formik';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../../components/misc/Input';
import AuthContext from '../../contexts/AuthContext'
import { login as userLogin } from '../../services/AuthService';
import LoginSchema from './LoginSchema';
import Cat from "../../assets/cat.png";



function Login() {
  const { state } = useLocation()
  const { login } = useContext(AuthContext)

  const INITIAL_VALUES = {
    email: (state && state.email) || '',
    password: ''
  }

  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, resetForm
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })

  function onSubmit(values) { // Lo declaro como function en vez de const, porque asi por el hoisting la puedo usar en el useFormik
    userLogin(values)
      .then(({ accessToken }) => {
        login(accessToken)
        setSubmitting(false)
        resetForm()
      })
  }

  return (
    <div className="Register">
    <img src={Cat} alt="logo" height={190} />
    <div className="Register-form">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="Register-form-group">
            <Input 
              placeholder="Introduce your email"
              type="email"
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
              placeholder="Write your password"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              onBlur={handleBlur}
            />

        </div>
        <button type="submit" className="button mt-4">
          {isSubmitting ? 'Loading' : 'Login'}
        </button>
      </form>
    </div>
    </div>
  )
}

export default Login;