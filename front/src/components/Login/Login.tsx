import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import login from '../../api/Login.api';
import IonicStorageAccessor from '../../services/IonicStorageAccessor';

const Login: React.FC = () => {
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
      return 'Email is required';
    } else if (/^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,15}$/.test(email)) {
      setIncompleteOrInvalidForm(false);
      return null;
    } else {
      setIncompleteOrInvalidForm(true);
      return 'Invalid email';
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setIncompleteOrInvalidForm(true);
      return 'Password is required';
    }
    setIncompleteOrInvalidForm(false);
    return null;
  };

  const forgotPassword = () => {
    history.push('/forgot-password');
  };

  const register = () => {
    history.push('/login/register');
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
          IonicStorageAccessor.set('token', res.data.token);
          onSucces();
        }
        setFormSubmited(false);
      })
      .catch((err) => {
        if (err.code === HttpStatusCode.BadRequest) {
          form.setErrors({ email: 'Invalid email or password' });
        } else {
          form.setErrors({ email: `Error ${err.code}: ${err.data ?? ''}` });
        }
        setFormSubmited(false);
      });
  };

  const onSucces = () => {
    history.push('/liked');
  };

  return (
    <Box maw={300} mx="auto" className="flex justify-center flex-col h-screen">
      <h1 className="m-0 text-center">Login</h1>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="me@gigz.music"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="mySup3r_S3cr3t_P@ssword"
          {...form.getInputProps('password')}
        />

        <Group position="apart" align="flex-start" pt={14}>
          <Checkbox
            label="Remember me"
            {...form.getInputProps('remberMe', { type: 'checkbox' })}
          />
          <Anchor
            color="black"
            className="underline underline-offset-4"
            size={14}
            onClick={() => forgotPassword()}
          >
            Forgot password ?
          </Anchor>
        </Group>

        <Group position="center" mt="md">
          <Button
            type="submit"
            disabled={incompleteOrInvalidForm}
            loading={formSubmited}
            className="w-full"
          >
            Submit
          </Button>
        </Group>
        <Anchor
          color="black"
          className="flex justify-center mt-2 underline underline-offset-2"
          size={14}
          onClick={() => register()}
        >
          New here ?
        </Anchor>
      </form>
    </Box>
  );
};

export default Login;
