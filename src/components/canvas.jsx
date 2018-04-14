import React from 'react';
import PropTypes from 'prop-types';
import Sky from './sky';
import Ground from './ground';
import CannonBase from './cannonBase';
import CannonPipe from './cannonPipe';
import CannonBall from './cannonBall';
import CurrentScore from './currentScore';
import FlyingObject from './flyingObject';
import Leaderboard from './leaderBoard';
import { signIn} from 'auth0-web';
import Heart from './heart';
import StartGame from './startGame';
import Title from './title';



const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
  //Some mock data to populate the leaderboard
  /*const leaderboard = [
    { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://twitter.com/KukicAdo/profile_image', },
    { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://twitter.com/brunoskrebs/profile_image', },
    { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://twitter.com/diegopoza/profile_image', },
    { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://twitter.com/jeanatahnk/profile_image', },
    { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://twitter.com/jenny_obrien/profile_image', },
    { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://twitter.com/KimMaida/profile_image', },
    { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://twitter.com/mroliff/profile_image', },
    { id: 'h8', maxScore: 146, name: 'Sebastián Peyrott', picture: 'https://twitter.com/speyrott/profile_image', },
  ];*/
  //To show players their lives
  const lives = [];
  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -180 - (i * 70),
      y: 35
    };
    lives.push(
      <Heart 
       key={i}
       position={heartPosition}
       />
    )
  }
  
  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
      onClick={props.shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      {
          props.gameState.cannonBalls.map(cannonBall => (
            <CannonBall 
            key={cannonBall.id}
            position={cannonBall.position}/>
          ))
        }
      
      <CannonPipe rotation={props.angle} />
      <CannonBase />
        
      <CurrentScore score={props.gameState.kills} />
        { ! props.gameState.started &&
        <g>
          { props.currentPlayer != null && <StartGame onClick={() => props.startGame()} />}
          <Title />
          <Leaderboard 
            currentPlayer={props.currentPlayer}
            authenticate={signIn}
            leaderboard={props.players}
          />
        </g>
        }
        {
          props.gameState.flyingObjects.map(flyingObject => (
            <FlyingObject
            key={flyingObject.id}
            position={flyingObject.position}
            />
          )) 
        }
        {lives}
   </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  }).isRequired,
  
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,

  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired
};

Canvas.defaultProps = {
  currentPlayer: null,
  players: null
};

export default Canvas;