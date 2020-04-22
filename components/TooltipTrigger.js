import React, { useState } from 'react'
import Tooltip from './Tooltip'

export const TooltipTrigger = props => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div
                className="tooltip-trigger"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <img height="34px" src={`https://www.heroesprofile.com/includes/images/talents/${props.talent.img}`} />
            </div>
            <Tooltip show={show} />
            <style jsx>{`
                .tooltip-trigger > img {
                    border-radius: 6px;
                    border: 1px solid #2a2a2a;
                }
            `}</style>
        </>
    )
}

export default TooltipTrigger;