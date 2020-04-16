import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Index = props => {
  const [heroes, setHeroes] = useState(props.heroes)

  return (
    <div className="container">
      <div className="wrap">
        <header className="header">
          <div className="hero">
            Hero
          </div>
          <div className="games-played">
            # Games
          </div>
          <div className="popularity">
            Popularity %
          </div>
          <div className="pickrate">
            Pick %
          </div>
          <div className="banrate">
            Ban %
          </div>
          <div className="winrate">
            Win %
          </div>
          <div className="delta-winrate">
            % Δ
          </div>
        </header>
        {heroes.sort((a, b) => b.popularity - a.popularity).map(hero => {
          return (
            <div className="row">
              <div className="hero-img">
                <img height="41px" src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`} />
              </div>   
              <div className="hero-name">
                {hero.name}
              </div>
              <div className="games-played">
                {hero.gamesPlayed}
              </div>
              <div className="popularity">
                {hero.popularity}
              </div>
              <div className="pickrate">
                {hero.pickrate}
              </div>
              <div className="banrate">
                {hero.banrate}
              </div>
              <div className="winrate">
                {hero.winrate}
              </div>
              <div className={`delta-winrate ${hero.deltaWinrate[0] === '-' ? 'negative' : 'positive'}`}>
                {hero.deltaWinrate}
              </div>
            </div>
          )
        })}
      </div>
    <style jsx>{`
      .hero-img {
        height: 41px;
        margin-right: 10px;
        width: fit-content;
        border-radius: 3px;
        border: 1px solid #030303;
      }

      .header {
        color: #cacaca;
        display: flex;
        font-weight: 600;
        padding: 10px 0;
      }

      .row {
        display: flex;
        align-items: center;
        height: 46px;
        border-top: 1px solid #2a2a2a;
      }

      .wrap {
        margin: 0 auto;
        width: 750px;
        position: relative;
      }
      
      .hero {
        margin-left: 51px;
        margin-right: 20px;
        width: 150px;
      }

      .hero-name {
        margin-right: 20px;
        width: 150px;
      }

      .games-played {
        margin-right: 10px;
        width: 90px;
      }

      .popularity {
        margin-right: 10px;
        width: 120px;
      }

      .pickrate {
        margin-right: 20px;
        width: 75px;
      }

      .banrate {
        margin-right: 20px;
        width: 75px;
      }

      .winrate {
        margin-right: 20px;
        width: 75px;
      }

      .delta-winrate {
        width: 75px;
      }

      .negative {
        color: #FF4500
      }

      .positive {
        color: #3BE33B
      }
    `}</style>
    <style jsx global>{`
        body {
          color: #888;
          font-family: lato,sans-serif;
          background: #171717;
          margin: 0;
        }
    `}</style>
    </div>
  )

};

export async function getStaticProps() {
  return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
    return {
      props: res.data
    }
  })
}

export default Index;
