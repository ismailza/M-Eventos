
const Input = ({
  type = 'text',
  name,
  value,
  id,
  className = '',
  placeholder,
  label,
  ...props
}) => {

  return (
    <div className="form-floating mb-3">
      {type === 'textarea' && 
        <textarea name={name} value={value} className={'form-control ' + className} id={id} placeholder={placeholder} {...props}>
          {value}
        </textarea>
      }
      {type !== 'textarea' && 
        <input type={type} name={name} value={value} className={'form-control ' + className} id={id} placeholder={placeholder} {...props} />
      }
      {label && <label htmlFor={id}>{label}</label> }
    </div>
  )
}

export default Input