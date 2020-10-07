
## Guide d’installation 

La première étape de l’installation consiste à cloner le repository GitHub (ou fork) contenant tout le code de l’application.  

Le projet se découpe en trois dossiers : 

- Client : Le code du site internet en React 
- Serveur : Le code côté serveur en Python
- BD : L’export de la base de données MySQL.



### Installation front-end

Installez NodeJs  et npm depuis le [site officiel](https://nodejs.org/fr/download/)
Les versions utilisées pour le développement sont v12.16.2 pour NodeJs et v6.14.4 pour npm.  

Depuis le terminal, placez vous dans le dossier Client et exécutez la commande suivante :

    npm install

A la fin de l’installation de toutes les librairies utilisées dans ce projet (peut prendre plusieurs minutes), vous pourrez lancer le site en faisant :

    npm start

Vous pourrez ensuite retrouver le site à l’adresse suivante :  
localhost:3000

### Installation back-end

Déplacez vous dans le dossier Serveur. 
Vous devez avoir Python pour pouvoir utiliser de projet. Installez une version > à 3.6 depuis le [site officiel](https://www.python.org/downloads/ ) - 

Il est conseillé de créer un [environnement virtuel](https://docs.python.org/fr/3/library/venv.html) pour les projets python 

Une fois l’environnement créé et activé, placez vous à la racine du dossier et exécutez depuis le terminal :

    pip install -r requirements.txt

Une fois tous les paquets installés (peut-être plusieurs minutes), vous pouvez lancer l’API Python avec la commande suivante :

    python server.py

Une fois le serveur lancé, vous pourrez retrouver le Swagger de l’API à l’adresse suivante :
 http://127.0.0.1:5000/


Vous aurez également besoin pour faire fonctionner les mails crypté d'avoir un fichier key.key dans le dossier Serveur. 
Ce fichier étant plus sensible il ne sera pas communiqué publiquement. Merci de m'envoyer à mail à jules.civel@gmail.com pour que
je vous envoie ce fichier.

### Installation BDD

Installez MySQL Workbench.
Créez une base de données nommée lavalexperiencedb

Faites Data import du fichier database.sql dans le dossier BD
