import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import TooltipTrigger from '../../components/TooltipTrigger'
import Progress from '../../components/ProgressBar/Progress'

config.autoAddCss = false;

const Hero = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const tierConversion = { 0: 1, 1: 4, 2: 7, 3: 10, 4: 13, 5: 16, 6: 20 }
    const chromieConversion = { 0: 1, 1: 2, 2: 5, 3: 8, 4: 11, 5: 14, 6: 18 }

    console.log(props)

    const renderBuilds = builds => {
        return builds.map(build => {
            return (
                <div>
                    <div className="row">
                        <div className="build">
                            {build.talents.map((x, i) => {
                                return (
                                    <div className="talent">
                                        {props.talents[i].map((talent, j) => {
                                            if (talent.name === x) {
                                                return <TooltipTrigger talent={props.talents[i][j]} offset={'48px'} />
                                            }
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="stats">
                            <div className="stat build-wins">
                                {build.wins}
                            </div>
                            <div className="stat build-losses">
                                {build.losses}
                            </div>
                            <div className="stat build-winrate">
                                {build.winrate}%
                            </div>
                        </div>
                        <div className="export-build">
                            <FontAwesomeIcon icon={faFileExport} />
                        </div>
                    </div>
                    <style jsx>{`
                        .row {
                            display: flex;
                            background: #1e1e1e;
                            width: 100%;
                            padding: 7px 10px 5px;
                            border-radius: 5px;
                            margin: 5px 0;
                        }

                        .build {
                            display: flex;
                            align-items: center;
                        }

                        .build-winrate {
                            color: #85df49;
                        }

                        .stats {
                            display: flex;
                            padding-top: 6px;
                            margin-right: 30px;
                        }

                        .stat {
                            width: 97px;
                            margin: 0 30px;
                            background: #121212;
                            border-radius: 3px;
                            height: 25px;
                            text-align: center;
                            line-height: 25px;
                        }

                        .talent {
                            position: relative;
                            margin-right: 10px;
                        }

                        .export-build {
                            padding-top: 10px;
                        }
                    `}</style>
                </div>
            )
        })
    }

    const renderTalentTable = tier => {
        return tier.map(talent => {
            return (
                <div className="row">
                    <div className="talent-img">
                        <TooltipTrigger talent={talent} />
                    </div>  
                    <div className="talent-name cell cell-mr">
                        {talent.name}
                    </div>
                    <div className="games-played cell cell-mr">
                        {talent.gamesPlayed}
                    </div>
                    <div className="popularity cell cell-mr">
                        {talent.popularity}%
                    </div>
                    <div className="winrate cell cell-mr">
                        {talent.winrate}%
                    </div>
                    <div className="wins cell cell-mr">
                        {talent.wins}
                    </div>
                    <div className="losses cell cell-mr">
                        {talent.losses}
                    </div>
                    <style jsx>{`
                        .container {
                            font-size: 14px;
                        }

                        .wrap {
                            margin: 0 auto;
                            width: 860.625px;
                            position: relative;
                        }

                        .header {
                            display: flex;
                            font-weight: 600;
                            padding: 10px 0;
                        }

                        .header > .talent-name {
                            margin-left: 46px;
                        }

                        .cell {
                            padding-top: 14px;
                        }

                        .cell-mr {
                            margin-right: 25px;
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
                            position: relative;
                            width: fit-content;
                        }

                        .talent-name {
                            width: 175px;
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
                
                        .winrate {
                            width: 120px;
                        }

                        .wins {
                            width: 75px;
                        }

                        .losses {
                            width: 75px;
                        }
                    `}</style>
                </div>
            )
        })
  }

  useEffect(() => {
      setIsLoading(false);
  }, [])

  return (
      <div className="container">
        <Progress isAnimating={isLoading} />
        <div className="wrap">
            <>  
                <div className="builds-module">
                    <h2 style={{ color: '#cacaca' }}>Popular Builds</h2>
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
                        </div>
                        <div className="export">
                            Export
                        </div>
                    </header>
                    {renderBuilds(props.builds)}
                </div>
                {props.talents.map((tier, i) => {
                    return (
                        <div className="table">
                            <header>
                                <h2>Level {props.name === 'Chromie' ? chromieConversion[i] : tierConversion[i]}</h2>
                            </header>
                            <header className="header">
                                <div className="talent-name cell-mr">
                                    Talent
                                </div>
                                <div className="games-played cell-mr">
                                    # Games
                                </div>
                                <div className="popularity cell-mr">
                                    Popularity
                                </div>
                                <div className="winrate cell-mr">
                                    Win Rate
                                </div>
                                <div className="wins cell-mr">
                                    Wins
                                </div>
                                <div className="losses cell-mr">
                                    Losses
                                </div>
                            </header>
                            {renderTalentTable(tier)}
                        </div>
                    );
                })}
            </>
        </div>
        <style jsx>{`
            .container {
                margin-top: 20vh;
                font-size: 14px;
            }

            .wrap {
                margin: 0 auto;
                width: 860.625px;
                position: relative;
            }

            .builds-module {
                margin-bottom: 3rem;
            }

            header {
                color: #cacaca;
            }

            .build-header {
                display: flex;
                font-weight: 600;
                padding: 10px 0;
                width: fit-content;
            }

            .build-header-stats {
                display: flex;
                justify-content: space-between;
                width: 411px;
                margin-left: 362px;
                margin-right: 42px;
            }

            .build-header-stats > div {
                width: 97px;
                text-align: center;
            }

            .header {
                display: flex;
                font-weight: 600;
                padding: 10px 0;
                width: fit-content;
            }

            .header > .talent-name {
                margin-left: 46px;
            }

            .cell {
                padding-top: 14px;
            }

            .cell-mr {
                margin-right: 25px;
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
                width: 175px;
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
    
            .winrate {
                width: 120px;
            }

            .wins {
                width: 75px;
            }

            .losses {
                width: 75px;
            }

            .table {
                border-bottom: 1px solid #2a2a2a;
                margin-bottom: 2rem;
            }

            h2 {
                margin: 0.5rem 0;
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
}

export async function getServerSideProps(context) {
  
    return await axios.get(`https://herobuilds-api.herokuapp.com/api/hero/${context.query.pid}`).then(res => {
      return {
        props: { ...res.data, name: context.query.pid }
      }
    })
}

export default Hero;