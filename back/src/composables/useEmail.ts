import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { google } from 'googleapis';

import useUtils from './useUtils';

const { getEnv } = useUtils();
const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2({
  clientId: getEnv('OAUTH_CLIENT_ID'),
  clientSecret: getEnv('OAUTH_CLIENT_SECRET'),
  redirectUri: 'https://developers.google.com/oauthplayground',
});

myOauth2Client.setCredentials({
  refresh_token: getEnv('OAUTH_REFRESH_TOKEN'),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: getEnv('GMAIL_USER'),
    clientId: getEnv('OAUTH_CLIENT_ID'),
    clientSecret: getEnv('OAUTH_CLIENT_SECRET'),
    refreshToken: getEnv('OAUTH_REFRESH_TOKEN'),
  },
});

const sendMail = async (email: MailOptions) => {
  transporter.sendMail(email, (err) => {
    if (err) {
      console.log('Error when sending email: ', err);
    }
    transporter.close();
  });
};

const useEmail = () => ({
  sendMail,
});

export default useEmail;
