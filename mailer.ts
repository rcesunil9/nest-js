import { Injectable } from '@nestjs/common';
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("b029c6e6-162d-4998-b4c2-4de8c39005db");

@Injectable()
export class MailerService {

    async sendMail(from:string , to:string, subject:string, body:string, html:boolean): Promise<any> {
        if(html){
            client.sendEmail({
                "From": from,
                "To": to,
                "Subject": subject,
                "HtmlBody": body
              });
        }else{
            client.sendEmail({
                "From": from,
                "To": to,
                "Subject": subject,
                "TextBody": body
            });
        }
    }
}