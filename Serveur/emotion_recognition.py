import base64
from PIL import Image
from io import BytesIO
from fer import FER
import cv2
import json
import numpy as np
from collections import OrderedDict

# la librairie utilisée pour la reconnaissance d'émotions est la librairie fer :
# https://github.com/justinshenk/fer

# Les émotions reconnues par le réseau sont les suivantes :
# angry, disgust, fear, happy, sad, surprise, neutral
# Les émotions demandées par l'expérience Intelligence Emotionnelle sont :
# ['visage neutre', 'joie', 'tristesse', 'colère', 'surprise', 'peur', 'dégoût','honte', 'mépris', 'satisfaction'] 
# (seul les 3 derniers ne sont pas reconnus par le réseau) -> possibilité de fine-tuner le réseau une fois qu'on aura un grand volume de données ?


# TODO : modifier cette fonction pour que ce soit une classe singleton pour éviter de recréer FER à chaque appel
# voir https://stackoverflow.com/questions/54652536/keras-tensorflow-backend-error-tensor-input-10-specified-in-either-feed-de 
# pour résoudre les pb d'appels à tf.load() avec Flask.
def detect_emotion(image_as_txt, feeling=None):

    # On récupère l'image en base 64 (on enlève le préfixe qui définit le format de l'image). On la transforme en bytes
    imgdata = base64.b64decode(image_as_txt[23:]) 

    img = Image.open(BytesIO(imgdata)) #On crée une image PIL depuis l'image en bytes
    image = np.asarray(img) # On transforme l'image PIL en un array numpy afin de préparer l'info à être donnée au réseau de neurones.

    detector = FER() # On instancie le détecteur
    result = detector.detect_emotions(image)

    # Passage nécessaire de parsing des float en str afin de rendre le Dict sérialisable en JSON pour l'insérer dans les 
    # requêtes SQL
    jsonable_result = {}
    for key, value in result[0]['emotions'].items(): 
        jsonable_result[key]  =str(value)

    return jsonable_result
