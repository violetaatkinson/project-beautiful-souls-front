import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../../components/misc/Input/Input';
import AuthContext from '../../contexts/AuthContext'
import { login as userLogin } from '../../services/AuthService';
import LoginSchema from './LoginSchema';
import Cat from "../../assets/cat.png";



function Login() {
  const { state } = useLocation()
  const { login } = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')

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

  function onSubmit(values) { 
    setLoginError('')

    userLogin(values)
      .then(({ accessToken }) => {
        login(accessToken)
        resetForm()
      })
      .catch(err => {
        const message = err?.response?.data?.message || 'Email o contraseña incorrectos'
        setLoginError(message)
      })
      .finally(() => {
        setSubmitting(false)
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
        {loginError && (
          <div className="form-error">
            {loginError}
          </div>
        )}
        <button type="submit" className="button mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Loading' : 'Login'}
        </button>
      </form>
    </div>
    </div>
  )
}

export default Login;