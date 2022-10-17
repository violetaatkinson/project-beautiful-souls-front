// eslint-disable-next-line 
import input from './Input.css'

function Input({
    type = "text", label, placeholder,
    onChange, value, id, name, error, onBlur
  }) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          type={type} className={`form-control ${error ? 'is-invalid' : ''}`}
          id={id} placeholder={placeholder}
          onChange={onChange} value={value}
          name={name} onBlur={onBlur}
        />
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
      </div>
    )
  }
  
  export default Input