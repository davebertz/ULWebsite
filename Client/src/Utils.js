// Ce fichier contient les fonctions permettant de faire des appels à notre API


//Header for API Call
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');      
headers.append('Access-Control-Allow-Origin', process.env.REACT_APP_PUBLIC_URL);      
headers.append('GET', 'POST', 'OPTIONS');
// --------------------------Kayahara------------------------------
export const sendIntermittentResults=(username, videoname, intermittentPress)=>{
    fetch('http://localhost:5000/KayaharaResults/', {
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
    fetch('http://localhost:5000/KayaharaResults/', {
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
    fetch('http://localhost:5000/EPFeelingsScreenshots/', {
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
    fetch('http://localhost:5000/Users/', {
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
  fetch('http://localhost:5000/EPResults/', {
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
  fetch('http://localhost:5000/EPReactionsScreenshots/', {
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
  fetch('http://localhost:5000/EPFeedback/create', {
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
    fetch('http://localhost:5000/EPFeedback/update', {
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

 