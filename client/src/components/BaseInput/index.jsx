import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.css';

export default function BaseInput({
	label,
	type = 'text',
	id,
	name,
	icon,
	onIconClick = null,
	onChange = null,
}) {
	const [selectedDate, setSelectedDate] = useState(null);
	const [datePicker, setDatePicker] = useState(false);

	const toggleDatePicker = () => {
		setDatePicker((prev) => !prev);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		toggleDatePicker();
	};

	return (
		<div className={styles.container}>
			{icon ? (
				<>
					{label && (
						<label className={styles.label} htmlFor={id}>
							{label}
						</label>
					)}
					<div className={styles.inputContainer}>
						{type === 'date' ? (
							<DatePicker
								className={styles.test}
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="dd/MM/yyyy"
								placeholderText="Data de nascimento"
								open={datePicker}
							/>
						) : (
							<input
								className={styles.inputWithIcon}
								type={type}
								name={name}
								id={id}
							/>
						)}
						<span className={styles.inputIcon}>
							<img src={icon} alt="Input icon" onClick={toggleDatePicker} />
						</span>
					</div>
				</>
			) : (
				<>
					{label && (
						<label className={styles.label} htmlFor={id}>
							{label}
						</label>
					)}
					<div className={styles.inputContainer}>
						<input
							className={`${styles.input}`}
							type={type}
							name={name}
							id={id}
						/>
					</div>
				</>
			)}
		</div>
	);
}
