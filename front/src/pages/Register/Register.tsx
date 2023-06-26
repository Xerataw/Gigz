/*
  - Multiple step form

  - STEP 0 :
    - is an artist or bar

  - STEP 1 :
    - Lastname
    - Firstname
  
  - STEP 2 :
    - Email
    - Phone
    - Password

  - STEP 3 :
    - Username (Propositions ?)

  ----> Send from to create a new account
  
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

import { Title } from '@mantine/core';
import Form from '../../components/Form/Form';
import RequiredPart from '../../components/Form/RequiredPart';

const Register: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <Title>REGISTER</Title>
        <Form>
          <RequiredPart
            //TODO : to remove this 2 arguments
            currentPart={0}
            updateCurrentPart={() => undefined}
            onSubmit={(values) => {
              //TODO : rethink this function , maybe move it on the Form component
              console.log('values', values);
            }}
            //TODO : use mantine component instead of an array of inputs
            inputs={[
              {
                id: 'lastname',
                required: true,
                label: 'Nom',
                placeholder: 'Barrade',
                validate: (value: string) =>
                  /^.{2,}$/.test(value) ? null : 'Nom invalide',
                initialValue: '',
              },
              {
                id: 'firstname',
                required: true,
                label: 'Prénom',
                placeholder: 'Jean',
                validate: (value: string) =>
                  /^.{2,}$/.test(value) ? null : 'Prénom invalide',
                initialValue: '',
              },
            ]}
          />
          <RequiredPart
            currentPart={0}
            updateCurrentPart={() => undefined}
            onSubmit={(values) => {
              console.log('values', values);
            }}
            inputs={[
              {
                id: 'email',
                required: true,
                label: 'Email',
                placeholder: 'exemple@domain.com',
                validate: (value) =>
                  /^\S+@\S+$/.test(value) ? null : 'Email invalide',
                initialValue: '',
              },
              {
                id: 'phone',
                required: true,
                label: 'Téléphone',
                placeholder: '0689455323',
                validate: (value) =>
                  /^.{10}$/.test(value) ? null : 'Numéro invalide',
                initialValue: '',
              },
              {
                id: 'password',
                initialValue: '',
                label: 'Mot de passe',
                placeholder: 'aaaaaaaa',
                required: true,
                validate: (value) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  )
                    ? null
                    : 'Mot de passe invalide',
              },
              {
                id: 'passwordConfirmation',
                initialValue: '',
                label: 'Mot de passe',
                placeholder: 'aaaaaaaa',
                required: true,
                validate: (value, values) =>
                  value === values.password
                    ? null
                    : 'Les mots de passe doivent être identiques',
              },
            ]}
          />
        </Form>
      </div>
    </div>
  );
};

export default Register;
