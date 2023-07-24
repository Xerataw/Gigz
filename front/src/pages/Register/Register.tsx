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
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCreated from '../../components/Register/AccountStep/AccountCreated';
import User from '../../store/User';
import { UserContext } from '../../store/UserProvider';
import FirstStep from '../../components/Register/AccountStep/FirstStep';
import SecondStep from '../../components/Register/AccountStep/SecondStep';
import ThirdStep from '../../components/Register/AccountStep/ThirdStep';
import GigzFetcher from '../../services/GigzFetcher';

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

const artistPath = '/register/artist';
const hostPath = '/register/host';

const Register: React.FC = () => {
  const user = useContext(UserContext) as User;
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
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
            phone: /^[^0]\d{8}$/.test(values.phone) ? null : 'Numéro invalide',
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

  const [debounced] = useDebouncedValue(form.values, 1000);

  const sendRegisterForm = () => {
    GigzFetcher.post<{ [key: string]: string }>(
      'register',
      {
        email: form.values.email,
        password: form.values.password,
        profileType: form.values.userType,
        phoneNumber: '+33' + form.values.phone,
      },
      {},
      false
    ).then((res) => {
      if (res.ok === true) {
        if (res.data?.token !== undefined) {
          user.setName('');
          user.setProfilePicture(null);
          user.setProfileType(null);
          user.setToken(res.data.token);
          setFormStep((old) => old + 1);
        }
      } else {
        setFormStep(1);
        if (res.message === 'EMAIL_TAKEN') {
          form.setErrors((values) => ({
            email: 'Email déjà pris',
            ...values,
          }));
        } else if (res.message === 'PHONE_NUMBER_TAKEN') {
          form.setErrors((values) => ({
            phone: 'Téléphone déjà pris',
            ...values,
          }));
        }
      }
    });
  };

  const nextStep = () => {
    if (form.validate().hasErrors === false) {
      setFormStep((current) => {
        return current < 4 ? current + 1 : current;
      });
      if (formStep === 2) {
        sendRegisterForm();
        setFormStep((old) => old + 1);
      }
    }
  };

  const prevStep = () =>
    setFormStep((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    switch (formStep) {
      case 0:
        break;

      case 1:
        if (debounced.email.length > 0) form.validateField('email');
        if (debounced.phone.length > 0) form.validateField('phone');
        break;

      case 2:
        if (debounced.password.length > 0) form.validateField('password');
        if (debounced.confirmPassword.length > 0)
          form.validateField('confirmPassword');

        break;
    }
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
          <AccountCreated
            userType={form.values.userType as 'artist' | 'host'}
          />
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {formStep > 0 && formStep < 3 && (
          <Button variant="default" onClick={prevStep}>
            Retour
          </Button>
        )}
        {formStep > 0 && formStep < 3 && (
          <Button onClick={nextStep}>Prochaine étape</Button>
        )}
      </Group>
      {formStep < 3 && (
        <div className="text-center mt-10">
          Vous avez déjà un compte ?
          <Link to="auth/login" className="font-semibold no-underline">
            <Text color="primary">Se connecter</Text>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
