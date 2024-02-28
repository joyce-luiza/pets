import React, { useState } from 'react';
import styles from './styles.module.css';
import AnswerLifestyleQuestions from './components/AnswerLifestyleQuestions';
import LifestyleForm from './components/LifestyleForm';

export default function GetUserInfo() {
    const [answerQuestions, setAnswerQuestions] = useState(false);

    const handleAnswerQuestions = () => {
        setAnswerQuestions(() => true);
    };

    return (
        <div className={styles.container}>
            {!answerQuestions ? (
                <AnswerLifestyleQuestions answerQuestionsFn={handleAnswerQuestions} />
            ) : (
                <LifestyleForm />
            )}
        </div>
    );
}
