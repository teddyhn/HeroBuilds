import React, { useState } from 'react'
import Img from 'react-image'
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
                <Img 
                    height="34px" 
                    src={`https://www.heroesprofile.com/includes/images/talents/${props.talent.img}`}
                    style={{ borderRadius: '6px', border: '1px solid #2a2a2a' }}
                    loader={<div style={{ height: '34px', width: '34px', backgroundColor: '#2a2a2a', borderRadius: '6px' }}/>}
                />
            </div>
            <Tooltip show={show} talent={props.talent} offset={props.offset} img={props.talent.img} />
        </>
    )
}

export default TooltipTrigger;