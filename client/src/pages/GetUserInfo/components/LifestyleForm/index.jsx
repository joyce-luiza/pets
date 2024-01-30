import React, { useState } from 'react';
import styles from './styles.module.css';

import VerticalStep from '../VerticalStep';

export default function LifestyleForm() {
	const steps = [
		{
			title: 'Endereço',
			description: 'Vamos encontrar um pet compatível com o seu local',
			component: () => <div>Test1</div>,
		},
		{
			title: 'Preferências',
			description: 'Vamos definir quais características o pet deve ter',
			component: () => <div>Test2</div>,
		},
		{
			title: 'Estilo de vida',
			description: 'Iremos descobrir quais pets combinam com a sua rotina',
			component: () => <div>Test3</div>,
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

				{/* Inserir botão de nextStep com a condicional na ultima etapa para salvar */}
				<button onClick={nextStep}>Uopa</button>
			</div>
		</div>
	);
}
