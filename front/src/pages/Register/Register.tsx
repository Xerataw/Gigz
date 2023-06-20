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
            onSubmit={(values) => {
              console.log('values', values);
            }}
          >
            <h1>OUI 1</h1>
            <h1>OUI 1</h1>
          </RequiredPart>
          <RequiredPart
            onSubmit={(values) => {
              console.log('values', values);
            }}
          >
            <h1>OUI 2</h1>
            <h1>OUI 2</h1>
          </RequiredPart>
          <RequiredPart
            onSubmit={(values) => {
              console.log('values', values);
            }}
          >
            <h1>OUI 3</h1>
            <h1>OUI 3</h1>
          </RequiredPart>
        </Form>
      </div>
    </div>
  );
};

export default Register;
