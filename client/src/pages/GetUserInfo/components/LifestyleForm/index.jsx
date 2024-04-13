import React, { useState } from "react";
import styles from "./styles.module.css";

import Stepper from "../Stepper";
import {
  LifestyleStep1,
  LifestyleStep2,
  FinishLifestyleForm,
  LifestyleStep3,
} from "./components";
import { axiosRequest } from "../../../../utils/axiosRequest";

export default function LifestyleForm() {
  const [loading, setStepLoading] = useState(false);
  const [stepForm, setStepForm] = useState({
    step1: {},
    step2: {},
    step3: {},
  });

  const [currentStep, setCurrentStep] = useState(2);

  const handleStepForm = async (step, value, lastStep) => {
    setStepForm((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...value,
      },
    }));

    if (lastStep) {
      await handleFinishSteps();
      return;
    }
    nextStep();
  };

  const nextStep = async () => {
    setStepLoading(true);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setStepLoading(false);
    }
  };

  const previousStep = () => {
    setStepLoading(true);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep - 1);
      setStepLoading(false);
    }
  };

  const handleFinishSteps = async () => {
    try {
      setStepLoading(true);
      setCurrentStep(currentStep + 1);
      await axiosRequest({
        body: stepForm,
        method: "POST",
        path: "/adopter/complement",
        authenticated: true,
      });
      setStepLoading(false);
    } catch (error) {
      setCurrentStep(steps.length - 1);
      setStepLoading(false);
    }
  };

  const steps = [
    {
      id: "step1",
      title: "Endereço",
      description: "Vamos encontrar um pet compatível com o seu local",
      component: () => (
        <LifestyleStep1
          title="Endereço"
          description="Seu endereço será usado para garantir verificações de compatibilidade do seu futuro pet e o seu local de residência."
          handler={handleStepForm}
          answers={stepForm.step1}
          setStepLoading={setStepLoading}
        />
      ),
    },
    {
      id: "step2",
      title: "Preferências",
      description: "Vamos definir quais características o pet deve ter",
      component: () => (
        <LifestyleStep2
          title="Preferências"
          description="Para o match perfeito, pedimos para que você defina quais são as suas preferências sobre o seu futuro pet."
          handler={handleStepForm}
          previousStep={previousStep}
          answers={stepForm.step2}
          setStepLoading={setStepLoading}
        />
      ),
    },
    {
      id: "step3",
      title: "Estilo de vida",
      description: "Iremos descobrir quais pets combinam com a sua rotina",
      component: () => (
        <LifestyleStep3
          title="Estilo de vida"
          description="Nos ajude a entender o seu estilo de vida para que possamos encontrar um bichinho que tenha uma personalidade compatível."
          handler={handleStepForm}
          previousStep={previousStep}
          answers={stepForm.step3}
          setStepLoading={setStepLoading}
        />
      ),
    },
  ];

  return (
    <>
      {currentStep < steps.length ? (
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
                <Stepper
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

          <div className={styles.separator}>
            <div></div>
          </div>

          <div className={styles.stepFormContainer}>
            <div className={styles.stepForm}>
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                currentStep < steps.length && steps[currentStep].component()
              )}
            </div>
          </div>
        </div>
      ) : (
        <FinishLifestyleForm />
      )}
    </>
  );
}
