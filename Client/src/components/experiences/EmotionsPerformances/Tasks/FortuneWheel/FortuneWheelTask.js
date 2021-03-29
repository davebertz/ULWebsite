import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactWheel from './FortuneWheel'
 

 
function WheelOfFortune(props)  {

    const classes = useStyles();
    const wheelRef = useRef(null);
    const wheelRef2 = useRef(null);
    const [checkbox1, setCheckbox1] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)
    const [counterSpins, setCounterSpins] = useState(0)
    const [score, setScore] = useState(0)
    const [resWheel1, setResWheel1] = useState(0)
    const [resWheel2, setResWheel2] = useState(0)
    const [hasAnsweredYet, setHasAnsweredYet] = useState(false)
    const [hasCheated, setHasCheated] = useState(0)

    const segments = [
		{
			name: '+25',
			color: 'green'
        },
        		{
			name: '+25',
			color: 'green'
		},
		{
			name: '+25',
			color: 'green'
		},
		{
			name: '-50',
			color: 'red'
		},
    ];
    const segments2 = [
		{
			name: '+300',
			color: 'green'
        },
        		{
			name: '-75',
			color: 'red'
		},
		{
			name: '-75',
			color: 'red'
		},
		{
			name: '-75',
			color: 'red'
		},
	];

    const handleClick=(event)=>{
        event.preventDefault()
        var cheat = 0
        var finalScore = 0
        if(counterSpins > 6){
            cheat = 2
        } else if( counterSpins > 5){
            cheat = 1
        }
        if(score > 400){
            finalScore = 40
        }else{
            finalScore = score/10
        }
        props.sendDataToParent( score, finalScore, cheat + hasCheated)
    }

	const onSpinClick = () => {
        wheelRef.current.spinWheel();
        wheelRef2.current.spinWheel();
        setCounterSpins(counterSpins+1)
        if(checkbox1 ||checkbox2)
        {
            setHasAnsweredYet(true)
        }else{
            setHasAnsweredYet(false)
        }
	};
	const onSpinComplete1 = ( result ) => {
        setResWheel1(result.name)
        if(checkbox1 ){

            if(result.name==="+25"){
            setScore(score+25)
            }else{
                setScore(score-50)  
            }
        }
    };
    
    const onSpinComplete2 = ( result ) => {
        setResWheel2(result.name)
        if(checkbox2){
            if(result.name==="+300"){
                setScore(score+300)
                }else{
                    setScore(score-75)  
                }
        }
	};

    const changeCheckbox1=()=>{
            setCheckbox1(!checkbox1)
            if(checkbox2){
                setCheckbox2(!checkbox2)
            }

            //On permet à l'utilisateur de ne cocher la case qu'une fois que la roulette à tourner. C'est un moyen de tricher
            if(resWheel1 !== 0 && hasAnsweredYet === false){
                if( resWheel1==="+25"){
                    setScore(score+25)
                    }else{
                        setScore(score-50)  
                    }
                setHasCheated(2)
                setHasAnsweredYet(true)
            }

    }
    const changeCheckbox2=()=>{
            setCheckbox2(!checkbox2)
            if(checkbox1){
                setCheckbox1(!checkbox1)
            }   
            if(resWheel2 !== 0 && hasAnsweredYet === false){
                if( resWheel2==="+300"){
                    setScore(score+300)
                    }else{
                        setScore(score-75)  
                    }
                setHasCheated(2)
                setHasAnsweredYet(true)
            }  
    }

return (

    <div className={classes.root}>
            <div className={classes.hotContainer}> 
                <p> Avez-vous le goût du risque ? <br/>
                    Voici face à vous 2 roulettes de casino, l'une risquée et l'autre plus raisonnable. Le but du jeu ici est de faire un choix
                    entre ces deux roulettes. <br/>Attention cependant, le résultat de la roulette sélectionnée impactera votre score.<br/>
                    Vous avez 4 essais pour augmenter au maximum votre résultat.

                    <br/><br/>

                    - Cochez la case correspondant à la roulette que vous souhaitez choisir<br/>
                    - Faites tourner les roulettes en appuyant sur le bouton 'Faites vos jeux'<br/>
                    - Recommencer les étapes 1 et 2 jusqu'à atteindre 4 essais<br/>
                    - Passez à l'exercice suivant avec le bouton "Valider résultats"<br/>

                </p>
                <div className={classes.horizontalContainer}>
                    <div className={classes.spinButtonVertical}>
                        <p> Votre score actuel : {score}</p>
                        <Button variant="contained" color="secondary" onClick={onSpinClick}>
                            Faites vos jeux !   
                        </Button>
                    </div>
                    <div className={classes.wheelsContainer}>
                        <div className={classes.wheels}>
                            <input
                                type="checkbox"
                                checked={checkbox1}
                                onChange={changeCheckbox1}
                                style={{marginRight:'40px'}}
                            />
                            <div style={{marginRight:'40px'}}>
                                <ReactWheel
                                    segments={segments}
                                    onComplete={onSpinComplete1}
                                    ref={wheelRef}                                    
                                />
                            </div>                            
                        </div>
                        <div className={classes.wheels}>
                            <input
                                type="checkbox"
                                checked={checkbox2}
                                onChange={changeCheckbox2}
                                style={{marginLeft:'20px'}} 
                            />
                            <div style={{marginLeft:'20px'}}>
                                <ReactWheel
                                    segments={segments2}
                                    onComplete={onSpinComplete2}
                                    ref={wheelRef2}
                                />
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        <div className={classes.submitButton}>
            <Button variant="contained" color="primary" onClick={handleClick}> Valider résultats </Button>
        </div>
    </div>

)}


const useStyles = makeStyles({

    wheels:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    hotContainer:{
        justifyContent:'center',
        alignItems:'center',
        padding : 10,
    },
    horizontalContainer:{
        flexDirection:'row',
        display:'flex',
        flex:1,
    },
    centered:{

        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    root:{
        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    submitButton:{
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
    },
    wheelsContainer:{
        display:'flex',
        flexDirection:"row",
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    spinButtonVertical:{
        flexDirection:'column',
        display:'flex',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : '#FFE4E1',
        padding:15,
        border : 'solid',
        borderColor : "#FFC0CB",
        borderRadius: 25
    }
})

 
export default withRouter(WheelOfFortune);