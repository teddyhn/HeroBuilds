import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Img from 'react-image'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Progress from '../components/ProgressBar/Progress'

config.autoAddCss = false;

export const Index = props => {
  const [heroes, setHeroes] = useState(props.heroes)
  const [highestWinrate, setHighestWinrate] = useState()
  const [activeRole, setActiveRole] = useState('All')
  const [filter, setFilter] = useState('popularity')
  const [sortOrder, setSortOrder] = useState('descending')
  const [isLoading, setIsLoading] = useState(true)

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
    setHighestWinrate(Math.max.apply(Math, heroes.map(o => { return o.winrate; })));
    setIsLoading(false)
  }, [heroes])

  return (
    <div className="container">
      <Progress isAnimating={isLoading} />
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
            <span>Hero</span>
            {filter === 'name' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'name' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div 
            className={`games-played ${filter === 'gamesPlayed' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('gamesPlayed');
              setFilter('gamesPlayed');
            }}
          >
            <span># Games</span>
            {filter === 'gamesPlayed' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'gamesPlayed' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div 
            className={`popularity cell-mr`}
            onClick={() => {
              changeSortOrder('popularity');
              setFilter('popularity');
            }}
          >
            <span>Popularity</span>
            {filter === 'popularity' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'popularity' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div 
            className={`pickrate ${filter === 'pickrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('pickrate');
              setFilter('pickrate');
            }}
          >
            <span>Pick</span>
            {filter === 'pickrate' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'pickrate' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div 
            className={`banrate ${filter === 'banrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('banrate');
              setFilter('banrate');
            }}
          >
            <span>Ban</span>
            {filter === 'banrate' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'banrate' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div
            className={`winrate ${filter === 'winrate' ? sortOrder : ''} cell-mr`}
            onClick={() => {
              changeSortOrder('winrate');
              setFilter('winrate');
            }}
          >
            <span>Win</span>
            {filter === 'winrate' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'winrate' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div
            className={`delta-winrate ${filter === 'deltaWinrate' ? sortOrder : ''}`}
            onClick={() => {
              changeSortOrder('deltaWinrate');
              setFilter('deltaWinrate');
            }}
          >
            <span>% Δ</span>
            {filter === 'deltaWinrate' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'deltaWinrate' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
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
                    <Link href="/heroes/[pid]" as={`/heroes/${hero.name}`}>
                      <div
                        className="hero-img"
                        onClick={() => setIsLoading(true)}
                      >
                        <Img 
                          height="34px" 
                          src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`}
                          style={{ borderRadius: '3px', border: '1px solid #030303' }}
                          loader={<div style={{ height: '34px', width: '34px', backgroundColor: '#2a2a2a', borderRadius: '3px', border: '1px solid #030303' }}/>}
                        />
                      </div>  
                    </Link> 
                    <Link href="/heroes/[pid]" as={`/heroes/${hero.name}`}>
                      <div
                        className="hero-name cell cell-mr"
                        onClick={() => setIsLoading(true)}
                      >
                        {hero.name}
                      </div>
                    </Link>
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
        cursor: pointer;
        height: 34px;
        margin: auto 10px auto 0;
        width: fit-content;
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

      .cell-mr > span {
        margin-right: 5px;
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
        cursor: pointer;
        width: 110px;
      }

      .games-played {
        width: 90px;
      }

      .popularity {
        width: 120px;
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
