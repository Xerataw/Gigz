import { Loader, Stepper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconArrowUpBar,
  IconChecks,
  IconDisc,
  IconInfoCircle,
  IconShieldLock,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { register } from '../../api/auth';
import MailPhoneStep from '../../components/Steps/MailPhoneStep';
import PasswordStep from '../../components/Steps/PasswordStep';
import ProfileTypeStep from '../../components/Steps/ProfileTypeStep';
import StepperCompleted from '../../components/Steps/StepperCompleted';
import StepButtons from '../../components/Steps/Utils/StepButtons';
import StepperIcons from '../../components/Steps/Utils/StepperIcons';
import {
  artistPath,
  hostPath,
  stepperProps,
} from '../../configs/steppers/globalConfig';
import {
  registerInitialValues,
  regsiterValidate,
} from '../../configs/steppers/stepperRegisterConfig';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';

const Register: React.FC = () => {
  const NUMBER_OF_STEP = 3;

  const { t } = useTranslation();
  const user = useUser();
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: registerInitialValues,
    validate: (values) => regsiterValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const sendRegisterForm = () => {
    user.setProfileType(form.values.userType as EProfileType);
    register(form.values).then((res) => {
      if (res.ok === true) {
        if (res.data) {
          user.setName('');
          user.setProfilePicture(null);
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
    if (formStep === NUMBER_OF_STEP - 1) {
      setFormStep((old) => old + 1);
      sendRegisterForm();
      setFormStep((old) => old + 1);
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < NUMBER_OF_STEP - 1 ? current + 1 : current;
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
      <StepperIcons
        icons={[
          <IconDisc key={0} />,
          <IconInfoCircle key={1} />,
          <IconShieldLock key={2} />,

          <IconArrowUpBar key={8} />,
          <IconChecks key={9} />,
        ]}
        currentStep={formStep}
        form={form}
        hasSkip={false}
      />
      <Stepper active={formStep} {...stepperProps}>
        <Stepper.Step>
          <ProfileTypeStep
            form={form}
            nextStep={nextStep}
            label={t('register.profileTypeStep.label')}
          />
        </Stepper.Step>
        <Stepper.Step>
          <MailPhoneStep form={form} label={t('register.mailPhoneStep')} />
        </Stepper.Step>
        <Stepper.Step>
          <PasswordStep form={form} label={t('register.passwordStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <Loader variant="bars" />
        </Stepper.Step>

        <Stepper.Completed>
          <StepperCompleted
            label={t('register.completeRegister')}
            path={form.values.userType === 'artist' ? artistPath : hostPath}
          />
        </Stepper.Completed>
      </Stepper>

      <StepButtons
        formStep={formStep}
        nextStep={nextStep}
        numberOfSteps={3}
        prevStep={prevStep}
        nextDisabled={form.values.userType === ''}
      />

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
