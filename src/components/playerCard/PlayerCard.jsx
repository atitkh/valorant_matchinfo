import React from 'react'
import './playerCard.css'

function PlayerCard(props) {
  let classNameVar = 'playerCard ' + props.teamID;
  return (
    <div className='playerCard' style={{
      backgroundImage: `url(${props.PlayerCard.largeArt})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className={classNameVar}>

        <div className="playerCard__image">
          {props.character === null ?
            null
            : (
              <img src={props.character.characterImg} alt="character" />
            )}
        </div>
        <div className="playerCard__info">
          {props.name === null ? null : (
            <>
            <div className="playerCard__info_name">
              <h1>{props.name}#{props.tag}</h1>
              
              {props.rankImageUrl === null ? (
                <img src={"https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png"} alt="rank" />
              ) : (
                <img src={props.rankImageUrl.large} alt="rank" />
              )}
              <p>{props.rankName}</p>
              
            </div>
              
            <div className="playerCard__info_agent">
              <h2>AGENT : </h2>
              <p>{props.character.characterName} ({props.character.characterCode})</p>
            </div>

            <div className="playerCard__info_elo">
              <h2>ELO : </h2>
              <p>{props.elo}</p>
            </div>
            </>
          )}
        </div>

      </div>
      <div className="playerCard__loadout">
        {props.Loadout.map((item, index) => (
          <div className="playerCard__loadout_item" key={index}>
            <img src={item.weaponImg} alt="loadout" />
            <h1>{item.weaponName}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerCard