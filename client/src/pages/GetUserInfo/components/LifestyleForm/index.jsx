import React, { useState } from 'react';
import styles from './styles.module.css';

import VerticalStep from '../VerticalStep';
import LifestyleStep1 from './components/LifestyleStep1';

export default function LifestyleForm() {
	const [stepForm, setStepForm] = useState({
		step1: {},
	});

	const handleStepForm = (step, value) => {
		setStepForm((prev) => ({
			...prev,
			[step]: {
				...prev[step],
				...value,
			},
		}));
		nextStep();
		console.log(stepForm);
	};

	const steps = [
		{
			id: 'step1',
			title: 'Endereço',
			description: 'Vamos encontrar um pet compatível com o seu local',
			component: () =>
				LifestyleStep1({
					title: 'Endereço',
					description:
						'Seu endereço será usado para garantir verificações de compatibilidade do seu futuro pet e o seu local de residência.',
					handler: handleStepForm,
				}),
		},
		{
			id: 'step2',
			title: 'Preferências',
			description: 'Vamos definir quais características o pet deve ter',
			component: () =>
				LifestyleStep1({
					title: 'Endereço',
					description:
						'Para o match perfeito, pedimos para que você defina quais são as suas preferências sobre o seu futuro pet.',
					handler: handleStepForm,
				}),
		},
		{
			id: 'step3',
			title: 'Estilo de vida',
			description: 'Iremos descobrir quais pets combinam com a sua rotina',
			component: () =>
				LifestyleStep1({
					title: 'Endereço',
					description:
						'Nos ajude a entender o seu estilo de vida para que possamos encontrar um bichinho que tenha uma personalidade compatível.',
					handler: handleStepForm,
				}),
		},
	];

	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.stepProgessContainer}>
				<h2 className={styles.title}>Conte-nos sobre você</h2>
				<span className={styles.description}>
					Este formulário tem como objetivo entender mais sobre seu perfil.
					Assim, nós podemos te ajudar ainda mais a encontrar o pet perfeito
					para você.
				</span>
				<div className={styles.stepProgress}>
					{steps.map(({ title, description }, index) => (
						<VerticalStep
							title={title}
							number={index + 1}
							description={description}
							current={currentStep === index}
							completed={currentStep > index}
							lastStep={index + 1 === steps.length}
							key={index}
						/>
					))}
				</div>
			</div>

			<div class={styles.separator}>
				<div></div>
			</div>

			<div className={styles.stepFormContainer}>
				<div className={styles.stepForm}>
					{currentStep < steps.length ? (
						steps[currentStep].component()
					) : (
						<h2>Nice</h2>
					)}
				</div>
			</div>
		</div>
	);
}
