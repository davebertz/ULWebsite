import pymysql.cursors 
import json
from emotion_recognition import detect_emotion

# Ce fichier correspond aux fonctions appelées par l'API. Dans notre cas, les fonctions ici sont utilisées pour allez ajouter des lignes en BD
# On effectue quelques traitements logiques (detection d'émotions) pour ajouter quelques infos avant ajout en BD dans certaines fonctions
# PyMySQL permet de se connecter à une base de donnée MySQL et d'envoyer des requêtes SQL.

# On est obligé de faire un getConnection() avant chaque requête et non une fois pour tous le fichier car 
# sinon il y a des problèmes de lock et la connexion se coupe entre les requêtes

# config PyMySQL pour connexion à la base de données
def getConnection():
    connection = pymysql.connect(host='localhost',
                        user='root',
                        password='root',                             
                        db='LavalExperienceDB',
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)
    print ("connect successful")
    return connection

# ----------------------Kayahara---------------------------
def addKahayaraResult( username, videoname,videotype, inputs, dateExperience):
    connection = getConnection()
    returnValue = username, videoname, inputs, dateExperience
    try:   
        with connection.cursor() as cursor:
                    
            cursor.execute("INSERT INTO KayaharaResults (username, videoname,videotype, input, dateExperience) VALUES (%s,%s,%s,%s,%s);", (username, videoname, videotype, json.dumps(inputs), dateExperience)) 
            connection.commit()    
            
    finally:
        connection.close()
        return returnValue

def addIEFeelingsScreenshot( username, feeling,source, dateExperience):
    connection = getConnection()
    returnValue = username, feeling, source, dateExperience
    emotion_detected = detect_emotion(source, feeling) #Détection d'émotions

    try:   
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO ei_feelings_screenshots (username, feeling, source, emotion_detected, date) VALUES (%s,%s,%s,%s,%s);", (username, feeling, source,json.dumps(emotion_detected), dateExperience)) 
            connection.commit()    
            
    finally:
        connection.close()
        return returnValue

#-------------------IntelligenceEmotionnelle---------------
def addIEReactionsScreenshot( username, timer,source, dateExperience):
    connection = getConnection()
    returnValue = username, timer, source, dateExperience
    emotion_detected = detect_emotion(source) #Détection d'émotions
    try:   
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO ei_reactions_screenshots (username, seconds_after_reveal, source, emotion_detected, date) VALUES (%s,%s,%s,%s,%s);", (username, timer, source, json.dumps(emotion_detected), dateExperience)) 
            connection.commit()    
            
    finally:
        connection.close()
        return returnValue

def addIEResults(username, taskQuestions, taskResult,taskCheat, secondTrial, sanctionGiven,  dateExperience):
    connection = getConnection()
    returnValue = username, taskQuestions, taskResult,taskCheat, secondTrial, sanctionGiven,  dateExperience
    try:   
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO ei_results (username, task_questions, task_answers, task_cheats, second_trial, sanction_given, date) VALUES (%s,%s,%s,%s,%s,%s,%s);", 
                            (username, json.dumps(taskQuestions),json.dumps(taskResult),json.dumps(taskCheat), secondTrial, sanctionGiven, dateExperience)) 
            connection.commit()    
            
    finally:
        connection.close()
        return returnValue

def addIEFeedback(username, sanctionGiven, fbGlobalFeeling, fbCheatingFeeling, fbFairSanction, fbOtherSanction):
    connection = getConnection()
    returnValue = username, sanctionGiven, fbGlobalFeeling, fbCheatingFeeling, fbFairSanction, fbOtherSanction
    try:   
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO ei_feedback (username, sanction_given, fb_global_feeling, fb_cheating_feeling, fb_fair_sanction, fb_other_sanction) VALUES (%s,%s,%s,%s,%s,%s);", 
                            (username, sanctionGiven, fbGlobalFeeling, fbCheatingFeeling, fbFairSanction, fbOtherSanction)) 
            connection.commit()    
            
    finally:
        connection.close()
        return returnValue