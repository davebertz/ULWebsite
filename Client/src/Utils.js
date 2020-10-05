//Header for API Call
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');      
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');      
headers.append('GET', 'POST', 'OPTIONS');


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

export const createNewUser= async (pseudo, mail)=>{
  return await fetch('http://127.0.0.1:5000/Users/', {
    //mode: 'no-cors',
    method: 'POST',
    headers: headers,
    body:JSON.stringify({username :pseudo })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 409){
        alert('Erreur : Il existe déjà un utilisateur avec ce pseudonyme. Merci d\'en indiquer un nouveau') ;
        throw new Error('User already exist');
    } else {
        throw new Error('Something went wrong');
    }
  })
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    console.log(error)
  });
}

export const loginUsername= async(username, code)=>{
  return await fetch('http://127.0.0.1:5000/Users/'+username+'/'+code, {
    //mode: 'no-cors',
    method: 'GET',
    headers: headers,
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }  else if (response.status === 404){
        alert('Erreur : Aucun utilisateur n\'existe pour ce pseudonyme') ;
        throw new Error('User doesn\'t exist');
        
    } else if (response.status === 401){
      alert('Le nom d\'utilisateur ou le code est incorrect') ;
      throw new Error('Unauthorized');
  }else {
        throw new Error('Something went wrong');
    }
  })
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    console.log(error)
  });
}


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