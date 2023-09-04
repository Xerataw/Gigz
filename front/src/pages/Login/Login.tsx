import {
  Box,
  Button,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../api/auth';
import { getProfile } from '../../api/user';
import EmailValidator from '../../components/Steps/Utils/EmailValidator';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useUser();

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
  const [opened, setOpened] = useState<boolean>(false);

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
        if (res.ok && res.data) {
          user.setName(res.data.username);
          user.setToken(res.data.token);
          user.setProfileType(res.data.profileType);
          user.setProfilePicture(res.data.profilePicture);
          user.setUserId(res.data.userId);
          onSuccess();
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
    getProfile(user.getProfileType() ?? EProfileType.ARTIST)
      .then(() => {
        history.push('/auth/profile');
      })
      .catch((e) => setOpened(e.message === 'EMAIL_NOT_VALIDATED'));
  };

  return (
    <>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title="Email"
      >
        <EmailValidator
          after={() => {
            setTimeout(() => {
              history.push('/auth/profile');
            }, 200);
          }}
        />
      </Modal>
      <Box
        maw={300}
        mx="auto"
        className="flex justify-center flex-col h-screen"
      >
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
            <Text
              component={Link}
              to="/login/forgot-password"
              size={14}
              className="underline underline-offset-4"
            >
              {t('login.forgotPassword.label')}
            </Text>
            <Text
              component={Link}
              to="register"
              size={14}
              className="underline underline-offset-4"
            >
              {t('login.register')}
            </Text>
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
        </form>
      </Box>
    </>
  );
};

export default Login;
