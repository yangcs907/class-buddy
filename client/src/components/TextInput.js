import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextInput = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        />
      {error && ( <div className="invalid-feedback"
        style={{fontSize:"16px",fontWeight:"bold",backgroundColor:"rgba(255,255,255,0.5)",borderRadius:"7px",padding:"3px",paddingLeft:"10px"}}
        >
        {error}
      </div>)}
    </div>
  )
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text'
};

export default TextInput;
