// Ce fichier contient les fonctions permettant de faire des appels à notre API


//Header for API Call
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');      
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');      
headers.append('GET', 'POST', 'OPTIONS');

// --------------------------Kayahara------------------------------
export const sendIntermittentResults=(username, videoname, intermittentPress)=>{
    fetch('http://127.0.0.1:5000/KayaharaResults/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, videoname:videoname, videotype:"intermittent", input:intermittentPress })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

export const sendContinuousResults=(username,videoname,keyPressValues)=>{
    fetch('http://127.0.0.1:5000/KayaharaResults/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, videoname:videoname, videotype:"continuous", input:keyPressValues })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }


// --------------------------Intelligence Emotionnelle------------------------------

//Méthode pour appeler l'ajout en base de données des captures d'écrans de l'utilisateur imitant des expressions faciales.
export const sendFeelingsScreenshots=(username,feeling, screenshotSource)=>{
    fetch('http://127.0.0.1:5000/IEFeelingsScreenshots/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, feeling: feeling, source:screenshotSource })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

//Méthode pour appeler l'ajout en base de données des résultats et de la triche de l'utilisateur pour les séries d'exercices
export const sendEmotionalIntelligenceResults=(username, taskQuestion,taskResult,taskCheat, secondTrial,sanctionGiven)=>{
  fetch('http://127.0.0.1:5000/IEResults/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, taskQuestions :taskQuestion, taskAnswers: taskResult, taskCheats:taskCheat, secondTrial:secondTrial, sanctionGiven:sanctionGiven })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error)
    });
}

//Méthode pour appeler l'ajout en base de données des captures d'écrans de l'utilisateur prise à son insu 
//lors de la révélation de la détection de triche
export const sendReactionScreenshots=(username,seconds , imageSrc )=>{
  fetch('http://127.0.0.1:5000/IEReactionsScreenshots/', {
    //mode: 'no-cors',
    method: 'POST',
    headers: headers,
    body:JSON.stringify({username :username, secondAfterReveal : seconds, source: imageSrc })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
        throw new Error('Something went wrong');
    }
  })
  .catch((error) => {
    console.log(error)
  });
 }

 //Méthode pour appeler l'ajout en base de données des réponses de l'utilisateur au formulaire de retour sur expérience
 export const sendIEFeedback=(username,sanctionGiven,fbGlobalFeeling, fbCheatingFeeling, fbFairSanction, fbOtherSanction )=>{
  fetch('http://127.0.0.1:5000/IEFeedback/', {
    //mode: 'no-cors',
    method: 'POST',
    headers: headers,
    body:JSON.stringify({username :username, sanctionGiven: sanctionGiven, feedbackGlobalFeeling :fbGlobalFeeling,feedbackCheatingFeeling: fbCheatingFeeling,feedbackFairSanction: fbFairSanction, feedbackOtherSanction :fbOtherSanction, })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
        throw new Error('Something went wrong');
    }
  })
  .catch((error) => {
    console.log(error)
  });
 }