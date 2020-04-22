import React from 'react'

export const Tooltip = props => {
    console.log(props)
    return (
        <>
            <div className="tooltip">
                <div className="tooltip-name">Talent Name</div>
                <div className="tooltip-keybind">Keybinding</div>
                <div className="tooltip-description">Description</div>
                <style jsx>{`
                    .tooltip {
                        position: absolute;
                        bottom: 42px;
                        left: -160px;
                        background-color: #555;
                        color: #fff;
                        width: 340px;
                        padding: 0.5rem;
                        border-radius: 6px;
                        opacity: ${props.show ? '100' : '0'};
                        transition: visibility 0s, opacity 0.2s linear;
                        visibility: ${props.show ? 'show' : 'hidden'};
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
                `}</style>
            </div>
        </>
    )
}

export default Tooltip;