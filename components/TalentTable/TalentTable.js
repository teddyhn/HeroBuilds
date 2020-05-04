import React from 'react'
import TooltipTrigger from '../Tooltip/TooltipTrigger'

const TalentTable = ({ tier }) => {

    return tier.map((talent, i) => {
        return (
            <div className="row" key={i}>
                <div className="talent-info">
                    <div className="talent-img">
                        <TooltipTrigger talent={talent} />
                    </div>  
                    <div className="talent-name">
                        {talent.name}
                    </div>
                </div>
                <div className="talent-stats">
                    <div className="games-played cell">
                        <span className="label"># Games</span>
                        {talent.gamesPlayed}
                    </div>
                    <div className="popularity cell">
                        <span className="label">Popularity</span>
                        {talent.popularity}%
                    </div>
                    <div className="winrate cell">
                        <span className="label">Winrate</span>
                        {talent.winrate}%
                    </div>
                    <div className="wins cell">
                        <span className="label">Wins</span>
                        {talent.wins}
                    </div>
                    <div className="losses cell">
                        <span className="label">Losses</span>
                        {talent.losses}
                    </div>
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
                        width: 60px;
                        text-align: center;
                    }

                    .cell > .label {
                        display: none;
                    }

                    .row {
                        display: flex;
                        height: 46px;
                        border-top: 1px solid #2a2a2a;
                        width: 100%;
                    }

                    .talent-info {
                        display: flex;
                    }

                    .talent-img {
                        height: 34px;
                        margin: auto 10px auto 0;
                        position: relative;
                        width: fit-content;
                    }

                    .talent-name {
                        padding-top: 14px;
                        width: 175px;
                    }

                    .talent-stats {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                    }

                    @media only screen and (max-width: 900px) {
                        .row {
                            flex-direction: column;
                            height: fit-content;
                        }
                    }

                    @media only screen and (max-width: 900px) {
                        .cell > .label {
                            display: block;
                        }

                        .cell {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                `}</style>
            </div>
        )
    })
}

export default TalentTable;