import React from 'react';
import styles from './styles.module.css';
import lifestyleDog from '../../../../assets/lifestyle-dog.jpg';
import { Link } from 'react-router-dom'; //Remover importação caso não use nos novos botões

export default function AnswerLifestyleQuestions({ answerQuestionsFn }) {
	return (
		<div className={styles.container}>
			<div className={styles.toAnswerForm}>
				<h2>Queremos saber mais sobre você!</h2>
				<span className={styles.description}>
					Gostaríamos de fazer mais algumas perguntas para entender mais sobre
					seu perfil. Assim, nós podemos te ajudar ainda mais a encontrar o pet
					perfeito para você. É possível responder a qualquer momento, basta
					acessar seu perfil :)
				</span>
				<div>
					{/* Ajustar botões com Ant Design */}
					<button onClick={answerQuestionsFn}>Quero responder</button>
					<button>
						<Link to={'/'}>Talvez mais tarde</Link>
					</button>
				</div>
			</div>
			<img className={styles.lifestyleDog} src={lifestyleDog} alt="" />
		</div>
	);
}
