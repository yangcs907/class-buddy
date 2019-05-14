// Component for text area inputs (larger text for assignment body)
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../../App.css';

const TextArea = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="inputs">
      <textarea
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextArea.defaultProps = {
  type: 'text'
};

export default TextArea;
