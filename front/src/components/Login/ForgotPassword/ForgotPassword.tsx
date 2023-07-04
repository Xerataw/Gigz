import { Anchor, Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [incompleteOrInvalidForm, setIncompleteOrInvalidForm] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },

    validateInputOnBlur: true,

    validate: {
      email: (value) => validateEmail(value),
    },
  });

  const [debounced] = useDebouncedValue(form.values.email, 600);

  const validateEmail = (email: string) => {
    if (!email) {
      setIncompleteOrInvalidForm(true);
      return t('login.error.email.required');
    } else if (/^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,15}$/.test(email)) {
      setIncompleteOrInvalidForm(false);
      return null;
    } else {
      setIncompleteOrInvalidForm(true);
      return t('login.error.email.invalid');
    }
  };

  useEffect(() => {
    if (debounced !== '') {
      form.validateField('email');
    }
  }, [debounced]);

  const onSubmit = (data: { email: string }) => {
    // TODO call API here to reset password
    // See Login component for example
    // t('login.forgotPassword.success')
    setFormSubmited(true);
  };

  const onSucces = () => {
    history.push('/login');
  };

  const rememberPassword = () => {
    history.push('/login');
  };

  const register = () => {
    history.push('/login/register');
  };

  return (
    <Box maw={300} mx="auto" className="flex justify-center flex-col h-screen">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="m-0">{t('login.forgotPassword.title')}</h1>
        <p className="m-0">{t('login.forgotPassword.infos')}</p>
      </div>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          type="email"
          label={t('login.email.label')}
          placeholder={t('login.email.placeholder')}
          {...form.getInputProps('email')}
        />

        <Group position="right" align="flex-start" pt={14}>
          <Anchor
            color="black"
            className="underline underline-offset-2"
            size={14}
            onClick={() => rememberPassword()}
          >
            {t('login.forgotPassword.rememberPassword')}
          </Anchor>
        </Group>

        <Group position="center" mt="md">
          <Button
            type="submit"
            disabled={incompleteOrInvalidForm}
            loading={formSubmited}
            className="w-full"
          >
            {t('login.forgotPassword.resetPassword')}
          </Button>
        </Group>
        <Anchor
          color="black"
          className="flex justify-center mt-2 underline underline-offset-2"
          size={14}
          onClick={() => register()}
        >
          {t('login.forgotPassword.register')}
        </Anchor>
      </form>
    </Box>
  );
};

export default ForgotPassword;
