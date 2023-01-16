import React, { useState, useEffect } from 'react'
import './matchInfo.css'
import { PlayerCard } from '../../components'

function MatchInfo({ user, Logout }) {
  // user = JSON.parse(user)
  const [playersData, setPlayersData] = useState([])
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const [eloList, setEloList] = useState([]);
  const [rankImageUrlList, setRankImageUrlList] = useState([]);
  const [rankNumberList, setRankNumberList] = useState([]);
  const [rankNameList, setRankNameList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [teamIDList, setTeamIDList] = useState([]);

  const [serverIP, setServerIP] = useState('');
  const [serverPort, setServerPort] = useState(0);
  const [serverMap, setServerMap] = useState('');

  // get skin list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = JSON.parse(user);
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
      setServerIP(matchData.ConnectionDetails.GameServerHost);
      setServerPort(matchData.ConnectionDetails.GameServerPort);
      setServerMap(matchData.MapID);

      let playersList = matchData.Players;

      if(playersList[0].Subject){
        for (let i = 0; i < playersList.length; i++) {
          let item = playersList[i];
          setEloList((eloList) => [...eloList, item.Elo.elo]);
          setRankImageUrlList((rankImageUrlList) => [...rankImageUrlList, item.Elo.images]);
          setRankNumberList((rankNumberList) => [...rankNumberList, item.Elo.currenttier]);
          setRankNameList((rankNameList) => [...rankNameList, item.Elo.currenttierpatched]);
          setTagList((tagList) => [...tagList, item.Elo.tag]);
          setNameList((nameList) => [...nameList, item.Elo.name]);
          setTeamIDList((teamIDList) => [...teamIDList, item.TeamID]);
        }
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
            <PlayerCard key={index} teamID={teamIDList[index]} name={nameList[index]} tag={tagList[index]} rankName={rankNameList[index]} rankNumber={rankNumberList[index]} rankImageUrl={rankImageUrlList[index]} elo={eloList[index]} />
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