# coding: utf-8

import smtplib
from os.path import basename
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from database_utils import getUserResultAndWriteFile
from encryption import encryptFile
import os


def sendEmailToJV(dest, filename):
    files = [filename]
    msg = MIMEMultipart()
    msg['From'] = 'ulexperiences@gmail.com'
    msg['To'] = dest
    msg['Subject'] = 'Nouveaux résultats d\'expérience ! '
    message = 'Bonjour,\n Un nouvel utilisateur a passer l\'expérience de tricherie. Les résultats sont disponibles en pièce jointe dans le dossier à décrypter. \n Ceci est un message automatique'
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

    os.remove(filename)


def sendEmailRecap(username):
    #On récupère dans toutes nos tables les données associées à cet utilisateur
    filename = "results_"+username
    getUserResultAndWriteFile(username, filename)
    encryptFile(filename)
    sendEmailToJV('ulexperiences@gmail.com',filename)
