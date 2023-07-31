import { t } from 'i18next';

export class PasswordUtils {
  static errorPassword = (value: string) => {
    return (
      <div>
        {t('password.invalid')}
        <ul>
          {/.*\d/.test(value) === false && (
            <li>{t('password.missing.number')}</li>
          )}
          {/.*[a-z]/.test(value) === false && (
            <li>{t('password.missing.lowercase')}</li>
          )}
          {/.*[A-Z]/.test(value) === false && (
            <li>{t('password.missing.uppercase')}</li>
          )}
          {/.{8}/.test(value) === false && (
            <li>{t('password.missing.length')}</li>
          )}
        </ul>
      </div>
    );
  };
}
