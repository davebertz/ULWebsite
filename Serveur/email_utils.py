# coding: utf-8

import smtplib
from os.path import basename
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate



def sendConfirmationMail(dest):
    files = ["LMJulesCivel.pdf"]
    msg = MIMEMultipart()
    msg['From'] = 'ulexperiences@gmail.com'
    msg['To'] = dest
    msg['Subject'] = 'Le sujet de mon mail' 
    message = 'Bonjour !'
    msg.attach(MIMEText(message))
    for f in files :
        with open(f, "rb") as fil:
            part = MIMEApplication(
                fil.read(),
                Name=basename(f)
            )
        # After the file is closed
        part['Content-Disposition'] = 'attachment; filename="%s"' % basename(f)
        msg.attach(part)

    mailserver = smtplib.SMTP('smtp.gmail.com', 587)
    mailserver.ehlo()
    mailserver.starttls()
    mailserver.ehlo()
    mailserver.login('ulexperiences@gmail.com', 'jvoisin*!8462')
    mailserver.sendmail('ulexperiences@gmail.com', dest, msg.as_string())
    mailserver.quit()