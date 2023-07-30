import { t } from 'i18next';

export const registerInitialValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
};

const errorPassword = (value: string) => (
  <div>
    {t('register.errors.password.invalid')}
    <ul>
      {/.*\d/.test(value) === false && (
        <li>{t('register.errors.password.number')}</li>
      )}
      {/.*[a-z]/.test(value) === false && (
        <li>{t('register.errors.password.upper')}</li>
      )}
      {/.*[A-Z]/.test(value) === false && (
        <li>{t('register.errors.password.lower')}</li>
      )}
      {/.{8}/.test(value) === false && (
        <li>{t('register.errors.password.length')}</li>
      )}
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
          email: /^\S+@\S+$/.test(values.email)
            ? null
            : t('register.errors.emailInvalid'),
          phone: /^[^01234589]\d{8}$/.test(values.phone)
            ? null
            : t('register.errors.phoneInvalid'),
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
              : t('register.errors.password.dontmatch'),
        };

      default:
        return {};
    }
  }
};
