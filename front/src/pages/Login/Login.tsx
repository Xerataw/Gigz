import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import login from '../../api/login';
import User from '../../store/User';
import { HttpStatusCode } from 'axios';
import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [incompleteOrInvalidForm, setIncompleteOrInvalidForm] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remberMe: false,
    },

    validateInputOnBlur: true,

    validate: {
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
    },
  });

  const [debouncedEmail] = useDebouncedValue(form.values.email, 1000);
  const [debouncedPassword] = useDebouncedValue(form.values.password, 0);

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

  const validatePassword = (password: string) => {
    if (!password) {
      setIncompleteOrInvalidForm(true);
      return t('login.error.password.invalid');
    }
    setIncompleteOrInvalidForm(false);
    return null;
  };

  const forgotPassword = () => {
    history.push('/login/forgot-password');
  };

  const register = () => {
    history.push('/register');
  };

  useEffect(() => {
    if (debouncedEmail !== '') {
      form.validateField('email');
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedPassword !== '') {
      form.validateField('password');
    }
  }, [form.values.password]);

  const onSubmit = (data: {
    email: string;
    password: string;
    remberMe: boolean;
  }) => {
    setFormSubmited(true);
    login(data.email, data.password)
      .then((res) => {
        if (res.ok) {
          User.getInstance().then((user) => {
            user.setToken(res.data.token);
            user.setUserType(res.data.profileType);
            user.setProfilePicture(res.data.profilePicture);
            onSuccess();
          });
        }
        setFormSubmited(false);
      })
      .catch((err) => {
        if (err.code === HttpStatusCode.BadRequest) {
          form.setErrors({ email: t('login.error.invalid') });
        } else {
          form.setErrors({
            email: t([`login.error.${err.code}`, 'login.error.unspecific'], {
              code: err.code,
              message: err.data ?? '',
            }),
          });
        }
        setFormSubmited(false);
      });
  };

  const onSuccess = () => {
    history.push('/auth/profile');
  };

  return (
    <Box maw={300} mx="auto" className="flex justify-center flex-col h-screen">
      <h1 className="m-0 text-center">{t('login.title')}</h1>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          type="email"
          label={t('login.email.label')}
          placeholder={t('login.email.placeholder')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          label={t('login.password.label')}
          placeholder={t('login.password.placeholder')}
          {...form.getInputProps('password')}
        />

        <Group position="apart" align="flex-start" pt={14}>
          <Checkbox
            label={t('login.rememberMe')}
            {...form.getInputProps('remberMe', { type: 'checkbox' })}
          />
          <Anchor
            color="black"
            className="underline underline-offset-4"
            size={14}
            onClick={() => forgotPassword()}
          >
            {t('login.forgotPassword.label')}
          </Anchor>
        </Group>

        <Group position="center" mt="md">
          <Button
            type="submit"
            disabled={incompleteOrInvalidForm}
            loading={formSubmited}
            className="w-full"
          >
            {t('login.submit')}
          </Button>
        </Group>
        <Center className="mt-2">
          <Anchor
            color="black"
            className="underline underline-offset-2"
            size={14}
            onClick={(event) => {
              event.stopPropagation();
              register();
            }}
          >
            {t('login.register')}
          </Anchor>
        </Center>
      </form>
    </Box>
  );
};

export default Login;