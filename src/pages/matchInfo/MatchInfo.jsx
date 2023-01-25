import React, { useState, useEffect } from 'react'
import './matchInfo.css'
import { PlayerCard } from '../../components'

function MatchInfo({ user, Logout }) {
  // user = JSON.parse(user)
  const [playersData, setPlayersData] = useState([])
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const [serverIP, setServerIP] = useState('');
  const [serverPort, setServerPort] = useState(0);
  const [serverMap, setServerMap] = useState('');

  // get skin list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = await JSON.parse(user);
      let details = {
        user_id: user.userID,
        access_token: user.accessToken,
        entitlements_token: user.entitlementsToken,
        region: user.region,
        username: user.username
      };
      
      try {
      let response = await fetch("https://api.atitkharel.com.np/valorant/activegame/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      let matchData = await response.json();
      // let matchData = require('./dummy.json');
      setServerIP(matchData.ConnectionDetails.GameServerHost);
      setServerPort(matchData.ConnectionDetails.GameServerPort);
      setServerMap(matchData.MapID);

      let playersList = matchData.Players;

      if(playersList[0].Subject){
        setPlayersData(playersList);
        setLoading(false);
        setJoined(true);
      }
      else{
        setLoading(false);
        setJoined(false);
      }
    }
    catch (error) {
      console.log(error);
      setLoading(false);
      setJoined(false);
    }
  };
    fetchData();
  }, [user]);

  return (
    <div className="matchInfo">
      <div className="matchInfo__header">
        <h1>VALORANT MATCH INFO</h1>
        {joined ? <><p>SERVER : {serverIP}:{serverPort}</p><p>MAP : {serverMap.split("/")[serverMap.split("/").length - 1]}</p></> 
         : null}
      </div>
      
      {loading ? (
        <div className='matchInfo__loading'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="matchInfo__body">
          {joined ? playersData.map((item, index) => (
            <PlayerCard key={index} teamID={item.TeamID} character={item.Character} name={item.Elo.name} tag={item.Elo.tag} 
            rankName={item.Elo.currenttierpatched} rankNumber={item.Elo.currenttier} 
            rankImageUrl={item.Elo.images} elo={item.Elo.elo} PlayerCard={item.PlayerIdentity.PlayerCard} 
            Loadout={item.Loadout} />
          )) : (
            <div className="matchInfo__body__empty">
              <h1>Please join a match and Reload.</h1>
            </div>  
              )}
        </div>
      )}
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default MatchInfo