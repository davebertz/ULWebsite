import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Informations from './components/Informations'
import Kayahara from './components/experiences/Kayahara/Kayahara'
import EmotionsPerformancesScreen from './components/experiences/EmotionsPerformances/EPScreen'
import EmotionsPerformancesTasks from './components/experiences/EmotionsPerformances/EPTasks'
import EmotionsPerformancesResults from './components/experiences/EmotionsPerformances/EPResults'
import FeedbackForm from './components/experiences/EmotionsPerformances/EPFeedbackForm'
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
          {/* Définition de toutes les routes avec un redirect si URL inconnu*/}
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
                path='/experience/EmotionsPerformancesscreen'
                render={(props)=>
                  <Fragment>                
                    <EmotionsPerformancesScreen/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/EmotionsPerformances'
                render={(props)=>
                  <Fragment>                
                    <EmotionsPerformancesTasks/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/EmotionsPerformancesresults'
                render={(props)=>
                  <Fragment>                
                    <EmotionsPerformancesResults/>                  
                  </Fragment>}/>
              <Route
                exact
                path='/experience/EmotionsPerformancesfeedback'
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