export const registerInitialValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
};

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

export const regsiterValidate = (
  values: { [key: string]: string },
  formStep: number
) => {
  {
    switch (formStep) {
      case 0:
        return {};

      case 1:
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Email Invalide',
          phone: /^[^01234589]\d{8}$/.test(values.phone)
            ? null
            : 'Numéro invalide',
        };

      case 2:
        return {
          password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
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
  }
};
