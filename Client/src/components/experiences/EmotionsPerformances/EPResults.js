import React, { useState, useRef, useEffect,  useCallback  } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';  
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Webcam from 'react-webcam';
import {sendReactionScreenshots} from '../../../Utils'


//Cette page correspond à la page résultat, appelée après la première série uniquement.
//Après la première série, cette page annoncera la détection de triche (et poursuite de l'expérience avec série 2)
//A partir du moment où l'utilisateur voit l'annonce, une photo de l'utilisateur est prise toutes les demies-secondes.

function EmotionsPerformancesResults(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [resultStage, setResultStage] = useState('results')
    const [sanction, setSanction] = useState('')
    const sanctions = ['avertissement', "suite score nul", 'restart']

    useEffect(() => {
        if(props === undefined || props.location.user === undefined){
            history.push("/")
        }

        var timer = 0
        const intervalId = setInterval(() => {
            if(timer===0){ // Screenshot avant annonce pour photo de base.
                capture(timer)
            }
            timer = timer +1
            if ( timer === 1){
                setResultStage('triche')
            }
            if( timer < 10){
                capture(timer/2)
            }

        }, 500);//Prise de photo toutes les demies-secondes

        setSanction(getRandomSanction())//Choisit aléatoirement une sanction parmi les trois

        return () => {
            clearInterval(intervalId);
        };

    },[props])



    const getRandomSanction=()=>{
        const rand = Math.floor(Math.random() * Math.floor(3))
        return sanctions[rand]
    }

    const getPunished=()=>{
        setResultStage('sanction')
    }

    const acceptPunishment=()=>{
        history.push({pathname:"/experience/EmotionsPerformances",
            user : props.location.user,
            givenSanction : sanction,
            actualSerie: props.location.actualSerie
        })
    }



    const videoConstraints = {
        width: 550,
        height: 360,
        facingMode: "user"  
        };
        
    const webcamRef = useRef(null);
    const capture = useCallback(
        (timer) => {
            const imageSrc = webcamRef.current.getScreenshot({width: 550, height: 360});
            console.log(timer)
            if(imageSrc !== null){
                sendReactionScreenshots(props.location.user, timer, imageSrc )
            }
            
            
            
        },
        [webcamRef,props ]
    );


return (
    <div className={classes.root}>   
        {resultStage==='results' ? <p>
            Félicitations !
            <br/><br/>
            Vous avez terminé la première série d'exercices. <br/>
            Vous allez maintenant procéder à la suite de l'examen.
            <br/>
            <br/>
            <Button  className={classes.button} variant="contained" color="primary" >Poursuivre</Button> 
        
            <br/>
            
        </p>
    :null}

    {(resultStage === "triche" || resultStage === "sanction")? 
        <div>
            <span className={classes.tricheText}><b>TRICHERIE DETECTEE</b></span>
            <br/><br/>
            À la suite de l'analyse de vos résultats, nous avons détecté une ou plusieurs tentatives de tricherie durant la première partie de ce test.
        
            <br/>
            <br/>
            {resultStage === "triche" ?
            <p>
                <Button variant="contained" color="primary" onClick={getPunished}>Voir la sanction</Button>
            </p>:null}
        </div>
    :null}
    
    {resultStage === "sanction" ?  <div>
    <br/><br/>
        <p style={{ color: 'red', fontSize:30 }}> VOICI VOTRE SANCTION </p>
            
            {sanction === "avertissement"?
                <div>
                    <p><b>Vous pouvez poursuivre le test en conservant votre score accumulé dans la section précédente.
                            Cependant, sachez que tricher à nouveau invalidera complètement votre participation au test. </b>
                    </p>
                </div>
            :null}
            {sanction === "suite score nul"?
                <div>
                    <p><b>
                    Vous pouvez poursuivre le test, mais votre résultat de la section précédente a été ramené à 0. Sachez que tricher à nouveau invalidera complètement votre participation au test.
                    </b>
                    </p>
                </div>
            :null}
                {sanction === "restart"?
                <div>
                    <p><b>Vous pouvez recommencer la première partie du test à 0, qui sera suivie d’une seconde partie ensuite. Sachez que tricher à nouveau invalidera complètement votre participation au test.</b></p>
                </div>
            :null}
            <br/>

            <br/>
            <Button variant="contained" color="primary" onClick={acceptPunishment}>Accepter</Button>
            
        </div>
    :null}


        <div >
            <Webcam
                audio={false}
                height={0}
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/jpeg"
                width={0}
                videoConstraints={videoConstraints}
            />
      </div>
    </div>

)}


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flex:1,
        flexDirection:"column",
        marginTop:"-4%"
    },
    tricheText:{
        color:'red'
    }

})

 
export default withRouter(EmotionsPerformancesResults);