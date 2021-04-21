import pymysql.cursors 
import unidecode
import mysql.connector
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


    
# ----------------------Users---------------------------
def addUser( username,email, gender, age, userStatus):
    connection = getConnection()
    returnValue = username, email, gender, age, userStatus
    
    with connection.cursor() as cursor:
        try:                       
                cursor.execute("INSERT INTO users (username, email, gender, age, userStatus) VALUES (%s,%s,%s,%s,%s);", (username,email,gender,age,userStatus) )
                connection.commit()   
                
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return "200"
    # This is a workaround. The normal line would be the one below. Unfortunately, it raise an error that doesn't make much sense : 
    # --------- 
    # The view function did not return a valid response. The return type must be a string, dict, tuple, Response instance, or WSGI callable, but it was a tuple.
    # ---------
    # Flask is asking for a tuple and is upset that he got a tuple .. ? couldn't find the bug, went for the workaround because this data isn't used anyway 
    # (at least for the moment). 
    #return returnValue

# ----------------------Kayahara---------------------------
def addKahayaraResult( username, videoname,videotype, inputs, dateExperience):
    connection = getConnection()
    returnValue = username, videoname, inputs, dateExperience
    with connection.cursor() as cursor:
        try:   
                    
            cursor.execute("INSERT INTO KayaharaResults (username, videoname,videotype, input, dateExperience) VALUES (%s,%s,%s,%s,%s);", (username, videoname, videotype, json.dumps(inputs), dateExperience)) 
            connection.commit()    
            
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue

#-------------------Emotions et performances (EP)---------------

def addEPFeelingsScreenshot( username, feeling,source, dateExperience):
    connection = getConnection()
    returnValue = username, feeling, source, dateExperience
    emotion_detected = detect_emotion(source, feeling) #Détection d'émotions

    with connection.cursor() as cursor:
        try:  
            cursor.execute("INSERT INTO ei_feelings_screenshots (username, feeling, source, emotion_detected, date) VALUES (%s,%s,%s,%s,%s);", (username, feeling, source,json.dumps(emotion_detected), dateExperience)) 
            connection.commit()    
            
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue

def addEPReactionsScreenshot( username, timer,source, dateExperience):
    connection = getConnection()
    returnValue = username, timer, source, dateExperience
    emotion_detected = detect_emotion(source) #Détection d'émotions
    with connection.cursor() as cursor:
        try:          
            cursor.execute("INSERT INTO ei_reactions_screenshots (username, seconds_after_reveal, source, emotion_detected, date) VALUES (%s,%s,%s,%s,%s);", (username, timer, source, json.dumps(emotion_detected), dateExperience)) 
            connection.commit()    
            
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue

def addEPResults(username, taskQuestions, taskResult,taskCheat,timeToAnswer, secondTrial, sanctionGiven,  dateExperience):
    connection = getConnection()
    returnValue = username, taskQuestions, taskResult,taskCheat,timeToAnswer, secondTrial, sanctionGiven,  dateExperience

    #Petit bloc de refacto pour enlever les accents en BD pour éviter les /u009 au lieu de é

    taskQuestions["canadaCulture"] = [unidecode.unidecode(x) for x in taskQuestions["canadaCulture"]]
    with connection.cursor() as cursor:
        try:   

                
                affected_count = cursor.execute("INSERT INTO ei_results (username, task_questions, task_answers, task_cheats,time_to_answer, second_trial, sanction_given, date) VALUES (%s,%s,%s,%s,%s,%s,%s,%s);", 
                                (username, json.dumps(taskQuestions),json.dumps(taskResult),json.dumps(taskCheat),json.dumps(timeToAnswer), secondTrial, sanctionGiven, dateExperience)) 

                connection.commit()

        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue

def addEPFeedback(username, pretaskForm):
    connection = getConnection()
    returnValue = username, pretaskForm
    with connection.cursor() as cursor:
        try:   
            cursor.execute("INSERT INTO ei_feedback (username, pretask_form) VALUES (%s,%s);", 
                            (username,json.dumps(pretaskForm))) 
            connection.commit()    
            
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue

def updateEPFeedback(username, sanctionGiven, posttaskForm):
    connection = getConnection()
    returnValue = username, sanctionGiven,posttaskForm
    with connection.cursor() as cursor:
        try:   
            cursor.execute("UPDATE ei_feedback SET sanction_given =%s, posttask_forms = %s WHERE username = %s;", 
                            (sanctionGiven,json.dumps(posttaskForm), username)) 
            connection.commit()    
            
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            cursor.close()
            connection.close()
    return returnValue


# -------------------------Data Retrieve for Email ------------------------
def getUserResultAndWriteFile(username, filename):
    #On récupère les données de chaque table pour cet utilisateur puis on écrit tout dans un fichier.
    connection = getConnection()
    with open(filename, "w") as file:
        with connection.cursor() as cursor:
            try:   
                cursor.execute("SELECT * from ei_feelings_screenshots where username = %s", 
                                (username)) 
                result = cursor.fetchall()
                file.write(json.dumps(result,indent=4, sort_keys=True, default=str))

                cursor.execute("SELECT * from ei_reactions_screenshots where username = %s", 
                        (username)) 
                result = cursor.fetchall()
                file.write(json.dumps(result,indent=4, sort_keys=True, default=str))

                cursor.execute("SELECT * from ei_results where username = %s", 
                        (username)) 
                result = cursor.fetchall()
                file.write(json.dumps(result,indent=4, sort_keys=True, default=str))

                cursor.execute("SELECT * from ei_feedback where username = %s", 
                        (username)) 
                result = cursor.fetchall()
                file.write(json.dumps(result,indent=4, sort_keys=True, default=str))
            except mysql.connector.Error as err:
                print("Something went wrong: {}".format(err))
            finally:
                cursor.close()
                connection.close()

