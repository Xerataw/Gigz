import { t } from 'i18next';
import { PasswordUtils } from '../../services/PasswordUtils';

export const registerInitialValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
};

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
            : PasswordUtils.errorPassword(values.password),
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
