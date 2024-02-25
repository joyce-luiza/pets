import React, { forwardRef } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import './styles/Input.css';

const MaskedInput = forwardRef(({ ...props }, ref) => {
	return (
		<InputMask {...props}>
			{(inputProps) => (
				<input
					{...inputProps}
					ref={ref}
					className="input"
					disabled={props.disabled ? props.disabled : null}
				/>
			)}
		</InputMask>
	);
});

MaskedInput.propTypes = {
	mask: PropTypes.string,
	maskChar: PropTypes.string,
	formatChars: PropTypes.object,
	alwaysShowMask: PropTypes.bool,
	inputRef: PropTypes.func,
};

export default MaskedInput;
