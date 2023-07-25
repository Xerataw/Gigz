import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

import useUtils from './useUtils';

// const {} from useUtils();

const config = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: true,
  auth: {
    user: 'ella71@ethereal.email',
    pass: 'txQEE4sGctuNqcPeRv',
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = async (email: MailOptions) => {
  await transporter.sendMail(email);
};

const useEmail = () => {
  sendMail;
};

export default useEmail;
