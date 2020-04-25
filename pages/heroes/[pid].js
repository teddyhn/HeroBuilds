import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Builds from '../../components/Builds/Builds'
import TalentTables from '../../components/TalentTable/TalentTable'
import TooltipTrigger from '../../components/TooltipTrigger'
import Progress from '../../components/ProgressBar/Progress'
import Layout from '../../components/Layout'
import Modal from '../../components/Modal/Modal'
import initializeStore from '../../src/store'

config.autoAddCss = false;

const Hero = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const tierConversion = { 0: 1, 1: 4, 2: 7, 3: 10, 4: 13, 5: 16, 6: 20 }
    const chromieConversion = { 0: 1, 1: 2, 2: 5, 3: 8, 4: 11, 5: 14, 6: 18 }

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <Layout>
            <Modal />
            <div className="container">
            <Progress isAnimating={isLoading} />
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
                            </div>
                            <div className="export">
                                Export
                            </div>
                        </header>
                        <Builds builds={props.builds} talents={props.talents} />
                    </div>
                    {props.talents.map((tier, i) => {
                        return (
                            <div className="table">
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
        </Layout>
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