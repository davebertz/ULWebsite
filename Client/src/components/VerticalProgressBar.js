import React from "react";
import { Spring } from "react-spring/renderprops";

//Composant permettant de créer une barre de progression verticale.
//Est utilisée par l'expérience Intelligence Emotionnelle pour la progression du score dans les exercices

const VerticalProgress = ({ progress }) => {
  return (
    <Spring from={{ percent: 0 }} to={{ percent: progress }}>
      {({ percent }) => (
        <div className="progress vertical">
          <div style={{ height: `${percent}%` }} className="progress-bar">
            <span className="sr-only">{`${progress}%`}</span>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default VerticalProgress;