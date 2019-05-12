import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../../App.css';

const TextInput = ({
  name,
  placeholder,
  value,
  icon,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="inputs">
      <input
        type={type}
        className={classnames('validate', {
          'validate-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        />
      {error && ( <div className="inValid">
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
