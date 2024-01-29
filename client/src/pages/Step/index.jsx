import React from 'react';
import PropTypes from 'prop-types';
import './Step.css';

const Step = ({ number, current, completed, lastStep }) => {
	const circleClass = current | completed ? 'purple' : '';

	return (
		<div className="step">
			<div className={`circle ${circleClass}`}>{number}</div>
			{!lastStep && (
				<div className={`line ${current || completed ? 'purple' : ''}`}></div>
			)}
		</div>
	);
};

Step.propTypes = {
	number: PropTypes.number.isRequired,
	current: PropTypes.bool,
	lastStep: PropTypes.bool,
};

export default Step;
