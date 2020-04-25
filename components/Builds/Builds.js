import React from 'react'
import TooltipTrigger from '../../components/TooltipTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

const Builds = ({ builds, talents }) => {
    return builds.map(build => {
        return (
            <div>
                <div className="row">
                    <div className="build">
                        {build.talents.map((x, i) => {
                            return (
                                <div className="talent">
                                    {talents[i].map((talent, j) => {
                                        if (talent.name === x) {
                                            return <TooltipTrigger talent={talents[i][j]} offset={'48px'} />
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
                        <FontAwesomeIcon
                            icon={faFileExport} 
                            onClick={() => {
                                initializeStore.dispatch({
                                    type: 'SET_MODAL_SHOW',
                                    payload: true
                                })
                            }}
                        />
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

export default Builds;