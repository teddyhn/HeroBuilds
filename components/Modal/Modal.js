import React from 'react'
import { connect } from 'react-redux'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

const Modal = (props) => {

    return (
        <div className="modal-container">
            <div className="modal-window" style={{ color: '#cacaca' }}>
                <FontAwesomeIcon
                    icon={faTimes} 
                    className="close-modal" 
                    style={{ position: 'absolute', top: '8px', right: '12px', cursor: 'pointer' }}
                    onClick={() => props.modalShow(false)}
                />
                <h3 style={{ color: 'rgb(255,255,255)', marginTop: 0 }}>Export build into the game client</h3>
                <p>
                    1. Log into your Heroes of the Storm game client.<br />
                    2. Open the Talents menu in Hero select.<br />
                    3. Click the cog button and paste the code below.
                </p>
                <button
                    className="copy-build"
                >
                    COPY CODE
                </button>
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

                .modal-container {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 9999;
                    visibility: ${props.show ? 'visible' : 'hidden'}
                }

                .modal-window {
                    position: absolute;
                    top: 35%;
                    left: 37.5%;
                    width: 25%;
                    text-align: center;
                    padding: 36px 0;
                    border-radius: 6px;
                    background-color: #2a2a2a;
                }

                .modal-window > p {
                    margin: 0;
                }

                .copy-build {
                    background-color: rgb(235, 117, 3);
                    color: white;
                    font-family: 'Roboto', sans-serif;
                    font-weight: bold;
                    font-size: 12px;
                    border: none;
                    border-radius: 3px;
                    padding: 8px 12px;
                    margin-top: 16px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        modalShow: (show) => dispatch({ type: 'SET_MODAL_SHOW', payload: show })
    }
}

const mapStateToProps = state => ({
    show: state.modal.show
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)