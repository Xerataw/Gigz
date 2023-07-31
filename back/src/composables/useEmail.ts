import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

import useUtils from './useUtils';

const { getEnv } = useUtils();

const transporter = nodemailer.createTransport({
  host: getEnv('NODEMAILER_HOST'),
  port: Number(getEnv('NODEMAILER_PORT')),
  secure: true,
  auth: {
    user: getEnv('NODEMAILER_USER'),
    pass: getEnv('NODEMAILER_PASS'),
  },
});

const sendMail = async (email: MailOptions) => {
  await transporter.sendMail(email);
};

const useEmail = () => {
  sendMail;
};

export default useEmail;
