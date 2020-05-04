import React from 'react'
import { connect } from 'react-redux'
import TooltipTrigger from '../../components/Tooltip/TooltipTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

const Builds = ({ builds, talents, modalShow, modalCode }) => {

    return builds.map((build, i) => {
        return (
            <div className="row" key={i}>
                <div className="build">
                    {build.talents.map((x, i) => {
                        return (
                            <div className="talent" key={i}>
                                {talents[i].map((talent, j) => {
                                    if (talent.name === x) {
                                        return <TooltipTrigger talent={talents[i][j]} offset={'48px'} key={j} />
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="stats">
                    <div className="build-wins">
                        <span>Wins</span>
                        <div className="stat">
                            {build.wins}
                        </div>
                    </div>
                    <div className="build-losses">
                        <span>Losses</span>
                        <div className="stat">
                            {build.losses}
                        </div>
                    </div>
                    <div>
                        <span>Winrate</span>
                        <div className="stat build-winrate">
                            {build.winrate}%
                        </div>
                    </div>
                    <div>
                        <span>Export</span>
                        <div className="build-export">
                            <FontAwesomeIcon
                                icon={faFileExport} 
                                onClick={() =>{
                                    modalCode(build.code);
                                    modalShow(true)
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .row {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        display: flex;
                        background: #1e1e1e;
                        width: 100%;
                        padding-left: 10px;
                        border-radius: 5px;
                        margin: 5px 0;
                        padding: 5px 0 5px 10px;
                    }

                    .build {
                        display: flex;
                        align-items: center;
                        margin-right: 4%;
                    }

                    .build-winrate {
                        color: #85df49;
                    }

                    .build-export {
                        text-align: center;
                        width: 97px;
                    }

                    .stats {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-left: auto;
                        width: 100%;
                    }

                    .stat {
                        background: #121212;
                        border-radius: 3px;
                        height: 25px;
                        text-align: center;
                        line-height: 25px;
                        width: 97px;
                    }

                    .stats span {
                        display: none;
                    }

                    .talent {
                        position: relative;
                        margin-right: 10px;
                    }

                    @media only screen and (max-width: 900px) {
                        .row {
                            flex-direction: column;
                        }

                        .stats {
                            justify-content: normal;
                        }

                        .stats > div > span {
                            display: block;
                            margin-right: 10px;
                            margin-bottom: 3px;
                        }

                        .stats > div {
                            margin-right: 10px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        .stats > div > .build-export {
                            width: fit-content;
                            height: 25px;
                            display: flex;
                            align-items: center;
                        }
                    }

                    @media only screen and (max-width: 600px) {
                        .stats > .build-wins {
                            display: none;
                        }

                        .stats > .build-losses {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        )
    })
}

const mapDispatchToProps = dispatch => {
    return {
        modalShow: (show) => dispatch({ type: 'SET_MODAL_SHOW', payload: show }),
        modalCode: (code) => dispatch({ type: 'SET_MODAL_CODE', payload: code })
    }
}

export default connect(null, mapDispatchToProps)(Builds)