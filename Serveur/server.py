from flask import Flask
from flask_restx import Api, Resource, fields
from database_utils import addIEFeelingsScreenshot,addIEReactionsScreenshot, addKahayaraResult, addIEResults, addIEFeedback
from utils import sendEmailRecap
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

##Kayahara
nsKayaharaResults = api.namespace('KayaharaResults', description='Kayahara experience results from user')

##Intelligence Emotionnelle
nsIEFeelingsScreenshots = api.namespace('IEFeelingsScreenshots', description='Feeling screenshots from user')
nsIEResults = api.namespace('IEResults', description='User result and feedback from Emotional Intelligence experience')
nsIEReactionsScreenshots = api.namespace('IEReactionsScreenshots', description='Reactions screenshots from user')
nsIEFeedback = api.namespace('IEFeedback', description='User feedback')


kahayaraResult = api.model('KayaharaResult', {
    'username': fields.String(required=True, description='The user username'),
    'videoname': fields.String(required=True, description='The videoname the user did the experience with'),
    'videotype': fields.String(required=True, description='The videoname type (either continuous or intermittent)'),
    'input': fields.String(required=True, description='The user input'),
    'dateExperience' : fields.DateTime(required=True, description='The date which the user took the experience')
})
IEFeelingsScreenshots = api.model('IEFeelingScreenshots', {
    'username': fields.String(required=True, description='The user username'),
    'feeling': fields.String(required=True, description='The feeling associated with the screenshot'),
    'source': fields.String(required=True, description='The source of the image'),
})
IEReactionsScreenshots = api.model('IEReactionScreenshots', {
    'username': fields.String(required=True, description='The user username'),
    'secondsAfterReveal ': fields.String(required=True, description='The timer (in seconds) when the screenshot was taken'),
    'source': fields.String(required=True, description='The source of the image'),
})
IEResults = api.model('IEResults', {
    'username': fields.String(required=True, description='The user username'),
    'taskQuestions': fields.String(required=True, description='The user results at tasks'),
    'taskAnswers': fields.String(required=True, description='The user results at tasks'),
    'taskCheats': fields.String(required=True, description='The user cheating results'),
    'secondTrial': fields.Boolean(required=True, description='Is this the second time the user is experiencing the tasks'),
    'sanctionGiven': fields.String(required=True, description='The random sanction that was given to him'),
})

IEFeedback = api.model('IEFeedback', {
    'username': fields.String(required=True, description='The user username'),
    'sanctionGiven': fields.String(required=True, description='The random sanction that was given to him'),
    'feedbackGlobalFeeling': fields.String(required=True, description='The user global feeling about this experience'),
    'feedbackCheatingFeeling': fields.String(required=True, description='Did the user felt like he was cheating during this test'),
    'feedbackFairSanction': fields.String(required=True, description='Did the user thought that the sanction was appropriate'),
    'feedbackOtherSanction': fields.String(required=True, description='What other sanction could the user have thought of'),
})

class KaharayaDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addKahayaraResult(data['username'],data['videoname'], data['videotype'],data['input'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            return res

class IEFeelingsScreenshotsDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addIEFeelingsScreenshot(data['username'],data['feeling'], data['source'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class IEReactionsScreenshotsDAO(object):
    
    def __init__(self):
        self.counter = 0

    def create(self, data):
        res = addIEReactionsScreenshot(data['username'],data['secondAfterReveal'], data['source'], datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class IEResultsDAO(object):
    
    def __init__(self):
        self.counter = 0

    
    def create(self, data):
        res = addIEResults(data['username'],data['taskQuestions'],data['taskAnswers'], data['taskCheats'],data['secondTrial'],data['sanctionGiven'],datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res

class IEFeedbacksDAO(object):
    
    def __init__(self):
        self.counter = 0

    
# L'appel de cette fonction signifie que l'utilisateur à totalement terminé l'expérience. Nous en profitons donc pour récupérer 
# toutes les données et des les envoyer par message à Julien Voisin (sous la forme d'un fichier crypté)
    def create(self, data):
        res = addIEFeedback(data['username'],data['sanctionGiven'],data['feedbackGlobalFeeling'],data['feedbackCheatingFeeling'],data['feedbackFairSanction'],data['feedbackOtherSanction'])
        sendEmailRecap(data['username'])
        if res == 409:
            api.abort(409, "a Problem occured")
        else :
            print(res)
            return res



DAOKayahara =  KaharayaDAO()
DAOFeelings = IEFeelingsScreenshotsDAO()
DAOEmotionnalIntelligence = IEResultsDAO()
DAOReactions = IEReactionsScreenshotsDAO()
DAOFeedbacks = IEFeedbacksDAO()


@nsIEResults.route('/')
class IEResults(Resource):
    @nsIEResults.doc('add_ie_results')
    @nsIEResults.expect(IEResults)
    @nsIEResults.marshal_with(IEResults, code=201)
    def post(self):
        return DAOEmotionnalIntelligence.create(api.payload), 201

@nsIEFeelingsScreenshots.route('/')
class FeelingsScreenshots(Resource):
    @nsIEFeelingsScreenshots.doc('add_ie_feeling_screenshot')
    @nsIEFeelingsScreenshots.expect(IEFeelingsScreenshots)
    @nsIEFeelingsScreenshots.marshal_with(IEFeelingsScreenshots, code=201)
    def post(self):
        return DAOFeelings.create(api.payload), 201

@nsIEReactionsScreenshots.route('/')
class ReactionsScreenshots(Resource):
    @nsIEReactionsScreenshots.doc('add_ie_reaction_screenshot')
    @nsIEFeelingsScreenshots.expect(IEReactionsScreenshots)
    @nsIEReactionsScreenshots.marshal_with(IEReactionsScreenshots, code=201)
    def post(self):
        return DAOReactions.create(api.payload), 201

@nsIEFeedback.route('/')
class Feedback(Resource):
    @nsIEFeedback.doc('add_ie_feedback')
    @nsIEFeedback.expect(IEFeedback)
    @nsIEFeedback.marshal_with(IEFeedback, code=201)
    def post(self):
        return DAOFeedbacks.create(api.payload), 201


@nsKayaharaResults.route('/')
class KayahraResults(Resource):
    @nsKayaharaResults.doc('create_kayahara_result')
    @nsKayaharaResults.expect(kahayaraResult)
    @nsKayaharaResults.marshal_with(kahayaraResult, code=201)
    def post(self):
        return DAOKayahara.create(api.payload), 201



if __name__ == '__main__':
    app.run(debug=True)