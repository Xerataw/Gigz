import { t } from 'i18next';

export class PasswordUtils {
  static errorPassword = (value: string) => (
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
}
