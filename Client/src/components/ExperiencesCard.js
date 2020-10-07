import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from "react-router-dom";

//Composant d'affichage des expériences

export default function ExperiencesCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { post } = props;

  //Création d'un username lors de l'accès à une expérience.
  //TODO : changer l'emplacement de cette fonction qui ne devrait pas être ici (changement de besoin)
  //Passer par une variable globale ou alors redux
  const changePage= (event) => {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 8; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

    history.push({
      pathname: post.url,
      user: {username : result},
    });
  }

  return (
    <Grid item xs={12} md={6}>
        <CardActionArea component="a" onClick={()=>changePage()} >
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" paragraph color="textSecondary">
                  {post.description}
                </Typography>
                <Typography variant="subtitle2" paragraph color="textSecondary">
                  Durée estimée : {post.timeExpected}
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia component="img" className={classes.cardMedia} image={post.image} title={post.imageTitle} />
            </Hidden>
          </Card>
        </CardActionArea>
    </Grid>
  );
}


const useStyles = makeStyles({
  card: {
    display: 'flex',
    objectFit:'cover'
    
  },
  cardDetails: {
    flex: 1,
    border: `1px solid black`,
  },
  cardMedia: {
    width: 160,
  },
});

ExperiencesCard.propTypes = {
  post: PropTypes.object,
};
