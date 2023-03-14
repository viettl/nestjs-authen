import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const EMAIL_CONFIG_OPTIONS = 'EMAIL_CONFIG_OPTIONS';
@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: any) {
    this.nodemailerTransport = createTransport({
      service: options.service,
      auth: {
        user: options.user,
        pass: options.password,
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
