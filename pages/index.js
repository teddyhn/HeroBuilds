import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Index = props => {
  const [heroes, setHeroes] = useState(props.heroes)
  const [highestWinrate, setHighestWinrate] = useState()
  const [activeRole, setActiveRole] = useState('All')
  const [filter, setFilter] = useState('popularity')
  const [sortOrder, setSortOrder] = useState('descending')

  const changeSortOrder = (currentFilter) => {
    if (currentFilter === filter) {
      if (sortOrder === 'ascending') {
        return setSortOrder('descending')
      }
      return setSortOrder('ascending')
    }

    else return setSortOrder('descending');
  }

  useEffect(() => {
    setHighestWinrate(Math.max.apply(Math, heroes.map(o => { return o.winrate; })))
  }, [heroes])

  return (
    <div className="container">
      <div className="wrap">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Statistics</h2>
          <div className="role-filters">
            <a className={`role-selection all ${activeRole === 'All' ? 'active' : null}`} onClick={() => setActiveRole('All')}>
              All
            </a>
            <a className={`role-selection tank ${activeRole === 'Tank' ? 'active' : null}`} onClick={() => setActiveRole('Tank')}>
              <img className="role-img" src={require('../public/assets/role/tank.png')} />
              Tank
            </a>
            <a className={`role-selection bruiser ${activeRole === 'Bruiser' ? 'active' : null}`} onClick={() => setActiveRole('Bruiser')}>
              <img className="role-img" src={require('../public/assets/role/bruiser.png')} />
              Bruiser
            </a>
            <a className={`role-selection ranged ${activeRole === 'Ranged Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Ranged Assassin')}>
              <img className="role-img" src={require('../public/assets/role/ranged.png')} />
              Ranged Assassin
            </a>
            <a className={`role-selection melee ${activeRole === 'Melee Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Melee Assassin')}>
              <img className="role-img" src={require('../public/assets/role/melee.png')} />
              Melee Assassin
            </a>
            <a className={`role-selection healer ${activeRole === 'Healer' ? 'active' : null}`} onClick={() => setActiveRole('Healer')}>
              <img className="role-img" src={require('../public/assets/role/healer.png')} />
              Healer
            </a>
            <a className={`role-selection support ${activeRole === 'Support' ? 'active' : null}`} onClick={() => setActiveRole('Support')}>
              <img className="role-img" src={require('../public/assets/role/support.png')} />
              Support
            </a>
          </div>
        </header>
        <header className="header">
          <div
            className={`hero ${filter === 'name' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('name');
              setFilter('name');
            }}
          >
            Hero
          </div>
          <div 
            className={`games-played ${filter === 'gamesPlayed' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('gamesPlayed');
              setFilter('gamesPlayed');
            }}
          >
            # Games
          </div>
          <div 
            className={`popularity ${filter === 'popularity' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('popularity');
              setFilter('popularity');
            }}
          >
            Popularity
          </div>
          <div 
            className={`pickrate ${filter === 'pickrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('pickrate');
              setFilter('pickrate');
            }}
          >
            Pick
          </div>
          <div 
            className={`banrate ${filter === 'banrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('banrate');
              setFilter('banrate');
            }}
          >
            Ban
          </div>
          <div
            className={`winrate ${filter === 'winrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('winrate');
              setFilter('winrate');
            }}
          >
            Win
          </div>
          <div
            className={`delta-winrate ${filter === 'deltaWinrate' ? sortOrder : ''}`}
            onClick={() => {
              changeSortOrder('deltaWinrate');
              setFilter('deltaWinrate');
            }}
          >
            % Δ
          </div>
        </header>
        {heroes ? 
        heroes.sort((a, b) => {
          if (filter === 'name') {
            if (sortOrder === 'ascending') {
              if (a.name > b.name) {
                return -1;
              }

              if (b.name > a.name) {
                return 1;
              }

              return 0;
            }

            if (b.name > a.name) {
              return -1;
            }

            if (a.name > b.name) {
              return 1;
            }

            return 0
          }

          if (sortOrder === 'descending') {
            return parseFloat(b[filter].replace(',', '')) - parseFloat(a[filter].replace(',', ''))
          }
          return parseFloat(a[filter].replace(',', '')) - parseFloat(b[filter].replace(',', ''))
        })
              .filter(el => { return activeRole !== 'All' ? el.role === activeRole : el })
              .map(hero => {
                return (
                  <div className="row">
                    <div className="hero-img">
                      <img height="34px" src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`} />
                    </div>   
                    <div className="hero-name cell cell-mr">
                      {hero.name}
                    </div>
                    <div className="games-played cell cell-mr">
                      {hero.gamesPlayed}
                    </div>
                    <div className="popularity cell cell-mr">
                      {hero.popularity}%
                      <div style={{ height: '4px', width: `${hero.popularity}%`, backgroundColor: '#60CDCD' }} />
                    </div>
                    <div className="pickrate cell cell-mr">
                      {hero.pickrate}%
                    </div>
                    <div className="banrate cell cell-mr">
                      {hero.banrate}%
                    </div>
                    <div className="winrate cell cell-mr">
                      {hero.winrate}%
                      <div style={{ height: '4px', width: `${((hero.winrate - (highestWinrate - hero.winrate)) / highestWinrate) * 100}%`, backgroundColor: '#3BE33B' }} />
                    </div>
                    <div className={`delta-winrate ${hero.deltaWinrate[0] === '-' ? 'negative' : 'positive'} cell`}>
                      {hero.deltaWinrate}
                    </div>
                  </div>
                )
              }) : null}
      </div>
    <style jsx>{`
      .container {
        font-size: 14px;
      }

      .hero-img {
        height: 34px;
        margin: auto 10px auto 0;
        width: fit-content;
      }

      .hero-img > img {
        border-radius: 3px;
        border: 1px solid #030303;
      }

      header {
        color: #cacaca
      }

      .header {
        display: flex;
        font-weight: 600;
        padding: 10px 0;
      }

      .header > div {
        cursor: pointer;
        user-select: none;
      }

      .role-filters {
        display: flex;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
      }

      .role-filters a {
        font-size: 12px;
        padding: 10px 14px;
        border-right: 1px solid #2a2a2a;
        cursor: pointer;
        user-select: none;
      }

      .role-filters a.support {
        border-right: none;
      }

      .role-filters a.active {
        color: #eee;
        background: #272626;
        font-weight: 700;
      }

      .role-img {
        height: 16px;
        margin-right: 5px;
      }

      .role-selection {
        display: flex;
        align-items: center;
      }

      .cell {
        padding-top: 14px;
      }

      .cell-mr {
        margin-right: 30px;
      }

      .row {
        display: flex;
        height: 46px;
        border-top: 1px solid #2a2a2a;
        width: fit-content;
      }

      .wrap {
        margin: 0 auto;
        width: 860.625px;
        position: relative;
        border-bottom: 1px solid #2a2a2a;
      }
      
      .hero {
        margin-left: 45px;
        width: 110px;
      }

      .hero-name {
        width: 110px;
      }

      .games-played {
        width: 90px;
      }

      .popularity {
        width: 120px;
      }

      .header > .descending::after {
        font-family: "Font Awesome 5 Free";
        content: "\f0d7";
        font-style: normal;
        font-weight: 900;
        margin-left: 5px;
      }

      .header > .ascending::after {
        font-family: "Font Awesome 5 Free";
        content: "\f0d8";
        font-style: normal;
        font-weight: 900;
        margin-left: 5px;
      }

      .pickrate {
        width: 75px;
      }

      .banrate {
        width: 75px;
      }

      .winrate {
        width: 120px;
      }

      .delta-winrate {
        width: 45px;
      }

      .negative {
        color: #FF4500
      }

      .positive {
        color: #3BE33B
      }
    `}</style>
    <style jsx global>{`
        @import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

        body {
          color: #888;
          font-family: lato,sans-serif;
          background: #171717;
          margin: 0;
          width: calc(100vw - 34px);
        }
    `}</style>
    </div>
  )

};

export async function getStaticProps() {
  let heroes = require('../Heroes.json');

  return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
    res.data.heroes.map(hero => {
      heroes.forEach(i => {
        if (i.PrimaryName === hero.name) {
          hero.role = i.Group;
        }
      })
    })

    return {
      props: res.data
    }
  })
}

export default Index;
