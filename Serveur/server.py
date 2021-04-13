from flask import Flask
from flask_restx import Api, Resource, fields
from database_utils import addUser, addEPFeelingsScreenshot,addEPReactionsScreenshot, addKahayaraResult, addEPResults, addEPFeedback, updateEPFeedback
from flask_cors import CORS
from datetime import datetime



# Ce fichier correspond à l'API Python faites en Flask. On définit ici tous les éléments nécessaires à l'API :
# les models, les routes, les fonctions à appeler ensuite etc.

# Voir Flask_restx pour une meilleure compréhension du fichier.
# https://github.com/python-restx/flask-restx


app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='LavalExperiencesAPI',
    description='A simple API for experience website',
)

##Users
nsUsers = api.namespace("Users", description='randomly created username + email ')

##Kayahara
nsKayaharaResults = api.namespace('KayaharaResults', description='Kayahara experience results from user')

##Emotions et Performances
nsEPFeelingsScreenshots = api.namespace('EPFeelingsScreenshots', description='Feeling screenshots from user')
nsEPResults = api.namespace('EPResults', description='User result and feedback from Emotions and Performances experience')
nsEPReactionsScreenshots = api.namespace('EPReactionsScreenshots', description='Reactions screenshots from user')
nsEPFeedback = api.namespace('EPFeedback', description='User feedback')


users = api.model('Users', {
    'username': fields.String(required=True, description='The user username'),
    'email': fields.String(required=True, description='The user email adress'),
})

kahayaraResult = api.model('KayaharaResult', {
    'username': fields.String(required=True, description='The user username'),
    'videoname': fields.String(required=True, description='The videoname the user did the experience with'),
    'videotype': fields.String(required=True, description='The videoname type (either continuous or intermittent)'),
    'input': fields.String(required=True, description='The user input'),
    'dateExperience' : fields.DateTime(required=True, description='The date which the user took the experience')
})
EPFeelingsScreenshots = api.model('EPFeelingScreenshots', {
    'username': fields.String(required=True, description='The user username'),
    'feeling': fields.String(required=True, description='The feeling associated with the screenshot'),
    'source': fields.String(required=True, description='The source of the image'),
})
EPReactionsScreenshots = api.model('EPReactionScreenshots', {
    'username': fields.String(required=True, description='The user username'),
    'secondsAfterReveal ': fields.String(required=True, description='The timer (in seconds) when the screenshot was taken'),
    'source': fields.String(required=True, description='The source of the image'),
})
EPResults = api.model('EPResults', {
    'username': fields.String(required=True, description='The user username'),
    'taskQuestions': fields.String(required=True, description='The user results at tasks'),
    'taskAnswers': fields.String(required=True, description='The user results at tasks'),
    'taskCheats': fields.String(required=True, description='The user cheating results'),
    'timeToAnswer': fields.String(required=True, description='The time to answer each task'),
    'secondTrial': fields.Boolean(required=True, description='Is this the second time the user is experiencing the tasks'),
    'sanctionGiven': fields.String(required=True, description='The random sanction that was given to him'),
})

EPFeedback = api.model('EPFeedback', {
    'username': fields.String(required=True, description='The user username'),
    'sanctionGiven': fields.String(required=True, description='The random sanction that was given to him'),
    'pretaskForm': fields.String(required=True, description='User answers of pre-task questions'),
    'posttaskForm': fields.String(required=True, description='User answers of post-task questions'),
})


class UsersDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addUser(data['username'],data['email'],data['gender'],data['age'],data['userStatus'])
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            return res



class KaharayaDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addKahayaraResult(data['username'],data['videoname'], data['videotype'],data['input'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            return res

class EPFeelingsScreenshotsDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addEPFeelingsScreenshot(data['username'],data['feeling'], data['source'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class EPReactionsScreenshotsDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addEPReactionsScreenshot(data['username'],data['secondAfterReveal'], data['source'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class EPResultsDAO(object):
    
    def __init__(self):
        self.counter = 0

    
    def create(self, data):
        res = addEPResults(data['username'],data['taskQuestions'],data['taskAnswers'], data['taskCheats'],data['timeToAnswer'],data['secondTrial'],data['sanctionGiven'],datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class EPFeedbacksDAO(object):
    
    def __init__(self):
        self.counter = 0

    
# L'appel de cette fonction signifie que l'utilisateur à totalement terminé l'expérience. Nous en profitons donc pour récupérer 
# toutes les données et des les envoyer par message à Julien Voisin (sous la forme d'un fichier crypté)
    def create(self, data):
        res = addEPFeedback(data['username'],data['pretaskForm'])
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

    def update(self, data):
        print(data)
        res = updateEPFeedback(data['username'],data['sanctionGiven'],data['posttaskForm'])
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res


DAOUsers = UsersDAO()
DAOKayahara =  KaharayaDAO()
DAOFeelingsEP = EPFeelingsScreenshotsDAO()
DAOEmotionsPerformances = EPResultsDAO()
DAOReactionsEP = EPReactionsScreenshotsDAO()
DAOFeedbacksEP = EPFeedbacksDAO()


@nsUsers.route('/')
class Users(Resource):
    @nsUsers.doc('add_user')
    @nsUsers.expect(users)
    @nsUsers.marshal_with(users, code=201)
    def post(self):
        return DAOUsers.create(api.payload), 201

@nsEPResults.route('/')
class EPResults(Resource):
    @nsEPResults.doc('add_ie_results')
    @nsEPResults.expect(EPResults)
    @nsEPResults.marshal_with(EPResults, code=201)
    def post(self):
        return DAOEmotionsPerformances.create(api.payload), 201

@nsEPFeelingsScreenshots.route('/')
class FeelingsScreenshots(Resource):
    @nsEPFeelingsScreenshots.doc('add_ie_feeling_screenshot')
    @nsEPFeelingsScreenshots.expect(EPFeelingsScreenshots)
    @nsEPFeelingsScreenshots.marshal_with(EPFeelingsScreenshots, code=201)
    def post(self):
        return DAOFeelingsEP.create(api.payload), 201

@nsEPReactionsScreenshots.route('/')
class ReactionsScreenshots(Resource):
    @nsEPReactionsScreenshots.doc('add_ie_reaction_screenshot')
    @nsEPFeelingsScreenshots.expect(EPReactionsScreenshots)
    @nsEPReactionsScreenshots.marshal_with(EPReactionsScreenshots, code=201)
    def post(self):
        return DAOReactionsEP.create(api.payload), 201

@nsEPFeedback.route('/create')
class Feedback(Resource):
    @nsEPFeedback.doc('add_ie_feedback')
    @nsEPFeedback.expect(EPFeedback)
    @nsEPFeedback.marshal_with(EPFeedback, code=201)
    def post(self):
        return DAOFeedbacksEP.create(api.payload), 201

@nsEPFeedback.route('/update')
class Feedback(Resource):
    @nsEPFeedback.doc('upd_ie_feedback')
    @nsEPFeedback.expect(EPFeedback)
    @nsEPFeedback.marshal_with(EPFeedback, code=201)
    def post(self):
        return DAOFeedbacksEP.update(api.payload), 201



@nsKayaharaResults.route('/')
class KayahraResults(Resource):
    @nsKayaharaResults.doc('create_kayahara_result')
    @nsKayaharaResults.expect(kahayaraResult)
    @nsKayaharaResults.marshal_with(kahayaraResult, code=201)
    def post(self):
        return DAOKayahara.create(api.payload), 201



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)