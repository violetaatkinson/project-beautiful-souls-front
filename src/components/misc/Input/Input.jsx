// eslint-disable-next-line 
import input from './Input.css'

function Input({
    type = "text", label, placeholder,
    onChange, value, id, name, error, onBlur
  }) {
    return (
      <div>
        <label htmlFor={id}>
          {label}
        </label>
        <input
          type={type} className={`f-control ${error ? 'is-invalid' : ''}`}
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