import React from 'react'
import Img from 'react-image'

export const Tooltip = props => {
    return (
        <>
            <div className="tooltip">
                <Img 
                    height="34px" 
                    src={`https://www.heroesprofile.com/includes/images/talents/${props.talent.img}`}
                    style={{ border: '1px solid #2a2a2a', marginRight: '10px' }}
                    loader={<div style={{ height: '34px', width: '34px', backgroundColor: '#2a2a2a', borderRadius: '6px' }}/>}
                />
                <div className="tooltip-info">
                    <div className="tooltip-name">{props.talent.name}</div>
                    <div className="tooltip-keybind" style={{ color: '#bfd4fd' }}>{props.talent.keybinding}</div>
                    <div className="tooltip-description">{props.talent.description}</div>
                    <div className="tooltip-arrow-border" style={{ marginBottom: '-3px', borderColor: 'black' }} />
                </div>
                <style jsx>{`
                    .tooltip {
                        display: flex;
                        border: 2px solid black;
                        position: absolute;
                        bottom: ${props.offset || '42px'};
                        left: -162px;
                        background-color: #555;
                        color: #fff;
                        width: 340px;
                        padding: 0.5rem;
                        border-radius: 6px;
                        opacity: ${props.show ? '100' : '0'};
                        transition: visibility 0s, opacity 0.2s linear;
                        visibility: ${props.show ? 'show' : 'hidden'};
                        z-index: 1000;
                    }

                    .tooltip::after {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-top: 8px solid #555;
                        text-align: center;
                        left: 170px;
                        bottom: -8px;
                    }

                    .tooltip-name {
                        font-weight: 600;
                    }

                    .tooltip-keybind {
                        margin: 0.5rem 0;
                    }

                    .tooltip-arrow-border {
                        position: absolute;
                        border-left: 10px solid transparent!important;
                        border-right: 10px solid transparent!important;
                        border-top: 10px solid;
                        bottom: -8px;
                        left: 168px;
                    }
                `}</style>
            </div>
        </>
    )
}

export default Tooltip;