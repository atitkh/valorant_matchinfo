import React, { useState, useEffect } from 'react'
import './matchInfo.css'
import { MarketItem } from '../../components'

function MatchInfo({ user, Logout }) {
  // user = JSON.parse(user)
  const [playersData, setPlayersData] = useState([])

  const [loading, setLoading] = useState(true)

  // get skin list
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = JSON.parse(user);
      let details = {
        user_id: user.userID,
        access_token: user.accessToken,
        entitlements_token: user.entitlementsToken,
        region: user.region,
        username: user.username
      };
      
      let response = await fetch("https://api.atitkharel.com.np/valorant/activegame/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      let result = await response.json();
      let playersList = result;
      if(playersList[0].Subject){
        for(let i = 0; i < playersList.length; i++){
          setPlayersData(playersData => [...playersData, playersList[i]]);
        }
        setLoading(false);
      }
      else{
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);
  
  return (
    <div className="matchInfo">
      <div className="matchInfo__header">
        <h1>Night Market Listing</h1>
      </div>
      <div className="matchInfo__wallet">
        <div className="matchInfo__wallet__content">
          {walletKeys.map((key, index) => (
            (index < 2) ? (
            <div className="matchInfo__wallet__content__item" key={index}>
              <img src={walletImages[index]} alt={key} />
              <h4>{wallet[key]}</h4>
            </div>
            ) : null 
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className='matchInfo__loading'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="matchInfo__body">
          {timeRemaining > 0 ? skinNameList.map((item, index) => (
            <MarketItem key={index} name={item} price={skinPriceList[index] + ' VP'} image={skinImageList[index]} discountedPrice={priceList[index] + ' VP'} discountPercent={discountPercent[index] + '%'} />
          )) : (
            <div className="matchInfo__body__empty">
              <h1>Night Market Has Ended.</h1>
            </div>  
              )}
        </div>
      )}
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default MatchInfo