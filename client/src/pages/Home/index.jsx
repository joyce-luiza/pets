import React, { useState } from 'react';
import Step from '../Step';
import styles from './styles.module.css';
import CreateAccount from '../CreateAccount';
const FormStep1 = () => (
	<div>
		<h2>Formulário Etapa 1</h2>
		{/* Seu conteúdo de formulário para a Etapa 1 */}
	</div>
);

// Exemplo de outro componente de formulário
const FormStep2 = () => (
	<div>
		<h2>Formulário Etapa 2</h2>
		{/* Seu conteúdo de formulário para a Etapa 2 */}
	</div>
);

// Exemplo de mais um componente de formulário
const FormStep3 = () => (
	<div>
		<h2>Formulário Etapa 3</h2>
		{/* Seu conteúdo de formulário para a Etapa 3 */}
	</div>
);
export default function Home() {
	const [currentStep, setCurrentStep] = useState(0); // Estado para rastrear a etapa atual
	const stepsArray = [1, 1, 1]; // Array de componentes de formulário

	const nextStep = () => {
		// Lógica para ir para a próxima etapa
		if (currentStep < stepsArray.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};
	const previousStep = () => {
		// Lógica para ir para a próxima etapa
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};
	return (
		<div className={styles.TesteStep}>
			{stepsArray.map((StepComponent, index) => (
				<Step
					key={index}
					number={index + 1}
					current={index === currentStep}
					completed={index < currentStep}
					lastStep={index === stepsArray.length - 1}
				/>
			))}
			<button onClick={nextStep}>
				{currentStep !== stepsArray.length - 1 ? 'Next' : 'Save'}
			</button>
			{currentStep > 0 && <button onClick={previousStep}>Return</button>}
		</div>
	);
}
