import React from 'react'
import './playerCard.css'

function PlayerCard({ key, teamID, name, tag, rankName, rankNumber, rankImageUrl, elo }) {
  let classNameVar = 'playerCard ' + teamID;
  return (
    <div className={classNameVar}>
      <div className="playerCard__image">
        {rankImageUrl === null ? (
          <img src={"https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png"} alt="rank" />
          ) : (
            <img src={rankImageUrl.large} alt="rank" />
          )}
      </div>
      <div className="playerCard__info">
        <div className="playerCard__info_name">
          <h1>{name}#{tag}</h1>
        </div>
        <div className="playerCard__info_rank">
          <h1>{rankName}</h1>
        </div>
        <div className="playerCard__info_elo">
          <h1>{elo}</h1>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard