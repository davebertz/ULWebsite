// Ce fichier contient les fonctions permettant de faire des appels à notre API


//Header for API Call
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');      
headers.append('Access-Control-Allow-Origin', '*');      
headers.append('GET', 'POST', 'OPTIONS');
// --------------------------Kayahara------------------------------
export const sendIntermittentResults=(username, videoname, intermittentPress)=>{
    fetch(process.env.REACT_APP_API_URL + '/KayaharaResults/', {
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
    fetch(process.env.REACT_APP_API_URL + '/KayaharaResults/', {
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


// --------------------------Emotion et Performances------------------------------

//Méthode pour appeler l'ajout en base de données des captures d'écrans de l'utilisateur imitant des expressions faciales.
export const sendFeelingsScreenshots=(username,feeling, screenshotSource)=>{
    fetch(process.env.REACT_APP_API_URL + '/EPFeelingsScreenshots/', {
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

  export const sendUserInfos=(username,email, gender, age, userStatus)=>{
    fetch(process.env.REACT_APP_API_URL + '/Users/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, email: email, gender: gender, age:age, userStatus: userStatus})
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
export const sendEmotionsPerformancesResults=(username, taskQuestion,taskResult,taskCheat,timeToAnswer, secondTrial,sanctionGiven)=>{
  fetch(process.env.REACT_APP_API_URL + '/EPResults/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, taskQuestions :taskQuestion, taskAnswers: taskResult, taskCheats:taskCheat,timeToAnswer:timeToAnswer, secondTrial:secondTrial, sanctionGiven:sanctionGiven })
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
  fetch(process.env.REACT_APP_API_URL + '/EPReactionsScreenshots/', {
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
 export const createUserFeedbackEntry=(username,pretaskForm)=>{
  fetch(process.env.REACT_APP_API_URL + '/EPFeedback/create', {
    //mode: 'no-cors',
    method: 'POST',
    headers: headers,
    body:JSON.stringify({username :username, pretaskForm: pretaskForm })
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

  //Méthode pour mettre à jour en base de données les réponses de l'utilisateur au formulaire de retour sur expérience
  export const updateUserFeedback=(username,sanctionGiven, posttaskForm)=>{
    fetch(process.env.REACT_APP_API_URL + '/EPFeedback/update', {
      //mode: 'no-cors',
      method: 'POST',
      headers: headers,
      body:JSON.stringify({username :username, sanctionGiven: sanctionGiven, posttaskForm:posttaskForm })
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

 