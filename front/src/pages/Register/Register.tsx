/*
  - Multiple step form

  - STEP 0 :
    - is an artist or bar

  - STEP 2 :
    - Email
    - Phone
    - Password

    ----> Send from to create a new account
    
    - STEP 3 :
      - Username (Propositions ?)
  
  - STEP 4 (optionnal/skipable) :
    - Description
    - Profile Pictures
    - Presantation Pictures

  - STEP 5 (optionnal/skipable) :
    - Social Media
      - Insta
      - FB
      - Streaming links

      
  - STEP 5 (optionnal/skipable) :
    - City
    - Capacity (depends)


  ---> Send form to complete profile
*/

import { Button, Group, Loader, Stepper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconDisc,
  IconInfoCircle,
  IconShieldLock,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const errorPassword = (value: string) => (
  <div>
    Votre mot de passe est invalide :
    <ul>
      {/.*\d/.test(value) === false && <li>Il manque un nombre</li>}
      {/.*[a-z]/.test(value) === false && <li>Il manque une minuscule</li>}
      {/.*[A-Z]/.test(value) === false && <li>Il manque une majuscule</li>}
      {/.{8}/.test(value) === false && <li>Il faut 8 charactères minimum</li>}
    </ul>
  </div>
);

const artistPath = '/login/register/artist';
const hostPath = '/login/register/host';

const Register: React.FC = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: '',
    },
    validate: (values) => {
      switch (formStep) {
        case 0:
          return {};

        case 1:
          return {
            email: /^\S+@\S+$/.test(values.email) ? null : 'Email Invalide',
            phone: /^.{10}$/.test(values.phone) ? null : 'Numéro invalide',
          };

        case 2:
          return {
            password:
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                values.password
              )
                ? null
                : errorPassword(values.password),
            confirmPassword:
              values.confirmPassword === values.password
                ? null
                : 'Les mots de passe ne correspondent pas',
          };

        default:
          return {};
      }
    },
  });

  const [debounced] = useDebouncedValue(form.values, 600);

  const nextStep = () => {
    if (formStep === 2) {
      console.log('to send', form.values);
      setFormStep((old) => old + 1);

      // simulate request
      setTimeout(() => {
        setFormStep((old) => old + 1);
      }, 1000);
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 4 ? current + 1 : current;
      });
    }
  };

  const prevStep = () =>
    setFormStep((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    switch (formStep) {
      case 0:
        break;

      case 1:
        if (debounced.email.length > 0 && debounced.phone.length > 0) {
          form.validate();
        }
        break;

      case 2:
        if (
          debounced.password.length > 0 &&
          debounced.confirmPassword.length > 0
        ) {
          form.validate();
        }
        break;
    }
    if (debounced.email !== '') form.validate();
  }, [debounced]);

  return (
    <div className="pt-10 border border-red-500 flex flex-col items-center">
      <Stepper active={formStep} orientation="horizontal" p="xl" w={'100%'}>
        <Stepper.Step icon={<IconDisc />}>
          <FirstStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>
        <Stepper.Step icon={<IconInfoCircle />}>
          <SecondStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>
        <Stepper.Step icon={<IconShieldLock />}>
          <ThirdStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step
          icon={<IconCircleCheck />}
          completedIcon={<IconCircleCheckFilled />}
        >
          <Loader variant="bars" />
        </Stepper.Step>

        <Stepper.Completed>
          <Redirect
            to={form.values.userType === 'isHost' ? hostPath : artistPath}
          />
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {formStep > 0 && (
          <Button
            variant="default"
            disabled={formStep === 3}
            onClick={prevStep}
          >
            Retour
          </Button>
        )}
        {formStep > 0 && formStep < 3 && (
          <Button onClick={nextStep}>Prochaine étape</Button>
        )}
      </Group>
      <div className="text-center mt-10">
        Vous avez déjà un compte ?
        <Link to="auth/login" className="font-semibold no-underline">
          <Text color="secondary">Se connecter</Text>
        </Link>
      </div>
    </div>
  );
};

export default Register;
