import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Builds from '../../components/Builds/Builds'
import TalentTables from '../../components/TalentTable/TalentTable'
import Progress from '../../components/ProgressBar/Progress'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal/Modal'
import Navbar from '../../components/Navbar/Navbar'
import Typeahead from '../../components/Typeahead/Typeahead'
import Img from 'react-image'

config.autoAddCss = false;

const Page = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const tierConversion = { 0: 1, 1: 4, 2: 7, 3: 10, 4: 13, 5: 16, 6: 20 }
    const chromieConversion = { 0: 1, 1: 2, 2: 5, 3: 8, 4: 11, 5: 14, 6: 18 }

    Router.events.on('routeChangeStart', url => {
        setIsLoading(true)
    })
    Router.events.on('routeChangeComplete', () => setIsLoading(false))
    Router.events.on('routeChangeError', () => setIsLoading(false))

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <Layout>
            <Navbar />
            <Progress isAnimating={isLoading} />
            <Modal />
            <div className="top-module">
                <div className="wrap">
                    <Typeahead heroesData={props.heroesData} />
                    <div style={{ display: 'flex', marginTop: '2rem' }}>
                        <>
                            <Img 
                                src={`https://www.heroesprofile.com/includes/images/heroes/${props.heroData[0].img}`}
                                style={{ borderRadius: '3px', border: '1px solid #030303', marginRight: '1rem' }}
                                loader={<div style={{ height: '34px', width: '34px', backgroundColor: '#2a2a2a', borderRadius: '3px', border: '1px solid #030303' }}/>}
                            />
                            <div className="hero-info">
                                <h2 style={{ margin: 0, color: 'rgb(202, 202, 202)' }}>{props.name}</h2>
                                <div>{props.heroData[0].role}</div>
                                {props.heroData[0].role !== props.heroData[0].subgroup ? <div>{props.heroData[0].subgroup}</div> : null}
                                <ul className="stats-header">
                                    <li>
                                        Games Played
                                        <span>{props.heroData[0].gamesPlayed}</span>
                                    </li>
                                    <li>
                                        Pick Rate
                                        <span>{props.heroData[0].pickrate}%</span>
                                    </li>
                                    <li>
                                        Win Rate
                                        <span>{props.heroData[0].winrate}%</span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    </div>
                </div>
                <style jsx>{`
                    .top-module {
                        background-color: #242424;
                        margin-top: 58px;
                    }

                    .wrap {
                        margin: 0 auto;
                        width: 50%;
                        position: relative;
                        padding: 10vh 0 5vh 0;
                    }

                    .hero-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .hero-info > div {
                        font-size: 13px;
                    }

                    .stats-header {
                        display: flex;
                        font-size: 13px;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                    }

                    .stats-header > li {
                        background: #1e1e1e;
                        padding: 5px 0 5px 10px;
                        border-radius: 4px;
                        margin-right: 6px;
                    }

                    .stats-header > li span {
                        margin: 0 14px;
                        color: #bfd4fd;
                    }

                    @media only screen and (max-width: 1500px) {
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
                        .stats-header {
                            display: none;
                        }

                        .hero-info > div {
                            display: none;
                        }
                    }
                `}</style>
            </div>
            <div className="container">
                <div className="wrap">
                    <>  
                        <div className="builds-module">
                            <h2 style={{ color: '#cacaca', marginBottom: 0 }}>Popular Builds</h2>
                            <header className="build-header">
                                <div className="build-header-stats">
                                    <div>
                                        Wins
                                    </div>
                                    <div>
                                        Losses
                                    </div>
                                    <div>
                                        Win Rate
                                    </div>
                                    <div className="export">
                                        Export
                                    </div>
                                </div>
                            </header>
                            <Builds builds={props.builds} talents={props.talents} />
                        </div>
                        {props.talents.map((tier, i) => {
                            return (
                                <div className="table" key={`table-${i}`}>
                                    <header>
                                        <h2>Level {props.name === 'Chromie' ? chromieConversion[i] : tierConversion[i]}</h2>
                                    </header>
                                    <header className="header">
                                        <div className="talent-header-name">
                                            <div className="talent-name">
                                                Talent
                                            </div>
                                        </div>
                                        <div className="talent-header-stats">
                                            <div className="games-played">
                                                # Games
                                            </div>
                                            <div className="popularity">
                                                Popularity
                                            </div>
                                            <div className="winrate">
                                                Win Rate
                                            </div>
                                            <div className="wins">
                                                Wins
                                            </div>
                                            <div className="losses">
                                                Losses
                                            </div>
                                        </div>
                                    </header>
                                    <TalentTables tier={tier} />
                                </div>
                            );
                        })}
                    </>
                </div>
                <style jsx>{`
                    .container {
                        margin-top: 5vh;
                        font-size: 14px;
                    }

                    .wrap {
                        margin: 0 auto;
                        width: 50%;
                        position: relative;
                    }

                    .builds-module {
                        margin-bottom: 3rem;
                    }

                    header {
                        color: #cacaca;
                    }

                    .build-header {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        display: flex;
                        font-weight: 600;
                        padding: 10px 0;
                        width: 100%;
                    }

                    .build-header-stats {
                        display: flex;
                        justify-content: space-between;
                        margin-left: calc(332px + 4%);
                        width: 100%;
                    }

                    .build-header-stats > div {
                        width: 97px;
                        text-align: center;
                    }

                    .header {
                        display: flex;
                        font-weight: 600;
                        padding: 10px 0;
                        width: 100%;
                    }

                    .cell {
                        padding-top: 14px;
                    }

                    .row {
                        display: flex;
                        height: 46px;
                        border-top: 1px solid #2a2a2a;
                        width: 100%;
                    }

                    .talent-img {
                        height: 34px;
                        margin: auto 10px auto 0;
                        width: fit-content;
                    }

                    .talent-img > img {
                        border-radius: 6px;
                        border: 1px solid #2a2a2a;
                    }

                    .talent-name {
                        margin-left: 46px;
                        width: 175px;
                    }

                    .talent-header-stats {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                    }

                    .talent-header-stats > div {
                        width: 75px;
                        text-align: center;
                    }

                    .table {
                        border-bottom: 1px solid #2a2a2a;
                        margin-bottom: 2rem;
                    }

                    h2 {
                        margin: 0.5rem 0;
                    }

                    @media only screen and (max-width: 1500px) {
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
                        .build-header-stats {
                            display: none;
                        }

                        .talent-header-stats {
                            display: none;
                        }
                    }
                `}</style>
                <style jsx global>{`
                    @import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

                    body {
                        color: #888;
                        font-family: lato,sans-serif;
                        background: #171717;
                        margin: 0;
                    }
                `}</style>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let heroes = require('../../Heroes.json');

    const [res, res2] = await Promise.all([
        axios.get(`https://herobuilds-api.herokuapp.com/api/hero/${context.query.pid}`),
        axios.get('https://herobuilds-api.herokuapp.com/api/heroes/')
    ])

    res2.data.heroes.map(hero => {
        heroes.forEach(i => {
          if (i.PrimaryName === hero.name) {
            hero.role = i.Group;
            hero.subgroup = i.SubGroup;
          }
        })
    })

    const filteredHeroData = res2.data.heroes.filter(hero => hero.name === context.query.pid)
    
    return {
        props: {
            ...res.data,
            heroesData: res2.data.heroes,
            heroData: filteredHeroData,
            name: context.query.pid
        }
    }
}

export default Page;