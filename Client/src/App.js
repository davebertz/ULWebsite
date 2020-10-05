import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Informations from './components/Informations'
import Kayahara from './components/experiences/Kayahara/Kayahara'
import IntelligenceEmotionnelleScreen from './components/experiences/EmotionnalIntelligence/IntelligenceEmotionnelleScreen'
import IntelligenceEmotionnelleTasks from './components/experiences/EmotionnalIntelligence/IntelligenceEmotionnelleTasks'
import IntelligenceEmotionnelleResults from './components/experiences/EmotionnalIntelligence/IntelligenceEmotionnelleResults'
import FeedbackForm from './components/experiences/EmotionnalIntelligence/IntelligenceEmotionnelleFeedbackForm'
import './App.css';

//Navigations Tabs
const sections = [
  { title: 'Accueil', url: '/' },
  { title: 'Experiences', url: '/experiences' },
  { title: 'Informations', url: '/informations' },
];


  
function App() {
  return (
      <Router >
      <div className='App'>
        <Header className="header"  title="UL Experiences" sections={sections}/>   
        <div className='container'>
          {/* All routes definitions with a redirect if url doesn't exist */}
            <Switch>
              <Route exact path='/' component={Home} /> 
              <Route
                exact
                path='/experiences'
                render={(props)=>
                  <Fragment>                
                    <Experiences/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/informations'
                render={(props)=>
                  <Fragment>              
                    <Informations />                
                  </Fragment>}/>
              <Route
                exact
                path='/experience/kayahara'
                render={(props)=>
                  <Fragment>                
                    <Kayahara/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/intelligenceemotionnellescreen'
                render={(props)=>
                  <Fragment>                
                    <IntelligenceEmotionnelleScreen/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/intelligenceemotionnelle'
                render={(props)=>
                  <Fragment>                
                    <IntelligenceEmotionnelleTasks/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/intelligenceemotionnelleresults'
                render={(props)=>
                  <Fragment>                
                    <IntelligenceEmotionnelleResults/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/intelligenceemotionnellefeedback'
                render={(props)=>
                  <Fragment>                
                    <FeedbackForm/>                  
                  </Fragment>}/>
              <Redirect to="/" /> 
            </Switch>
          </div>
          
        </div>
        <Footer className="footer" title="ULaval Experiences" description="Julien.Voisin@rea.ulaval.ca" />
      </Router>
  )};

export default App;