import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Img from 'react-image'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Progress from '../components/ProgressBar/Progress'
import Navbar from '../components/Navbar/Navbar'
import Typeahead from '../components/Typeahead/Typeahead'

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
    const handleRouteChange = url => {
      setIsLoading(true);
    }

    const handleRouteChangeComplete = url => {
      setIsLoading(false);
    }

    Router.events.on('routeChangeStart', handleRouteChange);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    setHighestWinrate(Math.max.apply(Math, heroes.map(o => { return o.winrate; })));
    setIsLoading(false)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }
  }, [heroes])

  return (
    <div className="container">
      <Navbar />
      <Progress isAnimating={isLoading} />
      <div className="top-module">
        <div className="wrap">
          <Typeahead heroesData={props.heroes} />
          <p style={{ width: '50%', lineHeight: '1.6' }}>
            HeroBuilds is a quick statistics reference tool for Heroes of the Storm players. Its purpose is to provide the Heroes of the Storm community easy access to various gameplay statistics.
          </p>
        </div>
      </div>
      <div className="wrap">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <h2>Statistics</h2>
          <div className="role-filters">
            <a className={`role-selection all ${activeRole === 'All' ? 'active' : null}`} onClick={() => setActiveRole('All')}>
              All
            </a>
            <a className={`role-selection tank ${activeRole === 'Tank' ? 'active' : null}`} onClick={() => setActiveRole('Tank')}>
              <img className="role-img" src={require('../public/assets/role/tank.png')} />
              <div>Tank</div>
            </a>
            <a className={`role-selection bruiser ${activeRole === 'Bruiser' ? 'active' : null}`} onClick={() => setActiveRole('Bruiser')}>
              <img className="role-img" src={require('../public/assets/role/bruiser.png')} />
              <div>Bruiser</div>
            </a>
            <a className={`role-selection ranged ${activeRole === 'Ranged Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Ranged Assassin')}>
              <img className="role-img" src={require('../public/assets/role/ranged.png')} />
              <div>Ranged Assassin</div>
            </a>
            <a className={`role-selection melee ${activeRole === 'Melee Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Melee Assassin')}>
              <img className="role-img" src={require('../public/assets/role/melee.png')} />
              <div>Melee Assassin</div>
            </a>
            <a className={`role-selection healer ${activeRole === 'Healer' ? 'active' : null}`} onClick={() => setActiveRole('Healer')}>
              <img className="role-img" src={require('../public/assets/role/healer.png')} />
              <div>Healer</div>
            </a>
            <a className={`role-selection support ${activeRole === 'Support' ? 'active' : null}`} onClick={() => setActiveRole('Support')}>
              <img className="role-img" src={require('../public/assets/role/support.png')} />
              <div>Support</div>
            </a>
          </div>
        </header>
        <header className="header">
          <div
            className={`hero ${filter === 'name' ? sortOrder : ''}`}
            onClick={() => {
              changeSortOrder('name');
              setFilter('name');
            }}
          >
            <span>Hero</span>
            {filter === 'name' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
            {filter === 'name' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
          </div>
          <div className="hero-stats-header">
            <div 
              className={`games-played ${filter === 'gamesPlayed' ? sortOrder : ''} cell`}
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
              className={`popularity cell`}
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
              className={`pickrate ${filter === 'pickrate' ? sortOrder : ''} cell`}
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
              className={`banrate ${filter === 'banrate' ? sortOrder : ''} cell`}
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
              className={`winrate ${filter === 'winrate' ? sortOrder : ''} cell`}
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
              className={`delta-winrate ${filter === 'deltaWinrate' ? sortOrder : ''} cell`}
              onClick={() => {
                changeSortOrder('deltaWinrate');
                setFilter('deltaWinrate');
              }}
            >
              <span>% Δ</span>
              {filter === 'deltaWinrate' && sortOrder === 'ascending' ? <FontAwesomeIcon icon={faCaretUp} /> : null}
              {filter === 'deltaWinrate' && sortOrder === 'descending' ? <FontAwesomeIcon icon={faCaretDown} /> : null}
            </div>
          </div>
        </header>
        <div className="stats-table">
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
                .map((hero, i) => {
                  return (
                    <div className="row" key={`row-${i}`}>
                      <Link href="/heroes/[pid]" as={`/heroes/${hero.name}`}>
                        <div
                          className="hero-img"
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
                          className="hero-name"
                        >
                          {hero.name}
                        </div>
                      </Link>
                      <div className="hero-stats">
                        <div className="games-played cell">
                          {hero.gamesPlayed}
                        </div>
                        <div className="popularity cell">
                          {hero.popularity}%
                          <div style={{ height: '4px', width: `${hero.popularity}%`, backgroundColor: '#60CDCD' }} />
                        </div>
                        <div className="pickrate cell">
                          {hero.pickrate}%
                        </div>
                        <div className="banrate cell">
                          {hero.banrate}%
                        </div>
                        <div className="winrate cell">
                          {hero.winrate}%
                          <div style={{ height: '4px', width: `${((hero.winrate - (highestWinrate - hero.winrate)) / highestWinrate) * 100}%`, backgroundColor: '#3BE33B' }} />
                        </div>
                        <div className={`delta-winrate ${hero.deltaWinrate[0] === '-' ? 'negative' : 'positive'} cell`}>
                          {hero.deltaWinrate}
                        </div>
                      </div>
                    </div>
                  )
                }) : null}
        </div>
      </div>
    <style jsx>{`
      .top-module {
        background-color: #242424;
        margin-top: 54px;
        padding: 10vh 0 5vh 0;
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
        width: 100%;
      }

      .header > div {
        cursor: pointer;
        user-select: none;
      }
      
      .hero-stats-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
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
        width: 15%;
        text-align: left;
      }

      .cell > span {
        margin-right: 4px;
      }

      .stats-table {
        border-bottom: 1px solid #2a2a2a;
        margin-bottom: 5vh;
      }

      .row {
        display: flex;
        height: 46px;
        border-top: 1px solid #2a2a2a;
        width: 100%;
      }

      .wrap {
        margin: 0 auto;
        width: 50%;
        max-width: 960px;
        position: relative;
        font-size: 0.9em
      }
      
      .hero {
        margin-left: 45px;
        min-width: 130px;
        padding-top: 14px;
      }

      .hero > span {
        margin-right: 4px;
      }

      .hero-name {
        cursor: pointer;
        min-width: 130px;
        padding-top: 14px;
      }

      .hero-stats {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }

      .delta-winrate {
        text-align: center;
      }

      .negative {
        color: #FF4500
      }

      .positive {
        color: #3BE33B
      }

      @media only screen and (max-width: 1500px) {
        header > h2 {
          display: none;
        }

        .wrap {
          width: 80%;
        }
      }

      @media only screen and (max-width: 1200px) {
          .wrap {
              width: 90%;
          }
      }

      @media only screen and (max-width: 900px) {
        .role-selection > div {
          display: none;
        }
      }

      @media only screen and (max-width: 600px) {
        .pickrate {
          display: none;
        }

        .banrate {
          display: none;
        }

        .delta-winrate {
          display: none;
        }

        .games-played {
          display: none;
        }

        .hero-stats-header {
          justify-content: space-around;
        }

        .hero-stats {
          justify-content: space-around;
        }
      }
    `}</style>
    <style jsx global>{`
      html {
        overflow-y: overlay;
      }

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
  let heroes = require('../Heroes.json');

  return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
    res.data.heroes.map(hero => {
      heroes.forEach(i => {
        if (i.PrimaryName === hero.name) {
          hero.role = i.Group;
          hero.subgroup = i.SubGroup;
        }
      })
    })

    return {
      props: res.data
    }
  })
}

export default Index;
