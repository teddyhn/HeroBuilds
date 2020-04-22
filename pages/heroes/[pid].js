import React from 'react'
import axios from 'axios'
import TooltipTrigger from '../../components/TooltipTrigger'

const Hero = (props) => {
  console.log(props)

  const tierConversion = { 0: 1, 1: 4, 2: 7, 3: 10, 4: 13, 5: 16, 6: 20 }

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

  return (
      <div className="container">
        <div className="wrap">
            <>
                {props.talents.map((tier, i) => {
                    return (
                        <div className="table">
                            <header>
                                <h2>Level {tierConversion[i]}</h2>
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
                font-size: 14px;
            }

            .wrap {
                margin: 0 auto;
                width: 860.625px;
                position: relative;
            }

            header {
                color: #cacaca;
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
        props: res.data
      }
    })
}

export default Hero;