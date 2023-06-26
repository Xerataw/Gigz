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

import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

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

const Register: React.FC = () => {
  const form = useForm({
    initialValues: { email: '', phone: '', password: '', confirmPassword: '' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email Invalide'),
      phone: (value) => (/^.{10}$/.test(value) ? null : 'Numéro invalide'),

      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : errorPassword(value),
      confirmPassword: (value, values) =>
        value === values.password
          ? null
          : 'Les mots de passe ne correspondent pas',
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <Title>REGISTER</Title>
        <form onSubmit={form.onSubmit(console.log)}>
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="sm"
            label="Téléphone"
            placeholder="0695818549"
            {...form.getInputProps('phone')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

export default Register;
