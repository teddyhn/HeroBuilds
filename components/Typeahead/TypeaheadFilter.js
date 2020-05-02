import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const TypeaheadFilter = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = e => {
        setSearchQuery(e.target.value);
        props.filterTiles(e.target.value);
    }

    return (
        <div className="typeahead-container">
            <form className="typeahead" onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search" 
                    value={searchQuery} 
                    spellCheck={false}
                    onChange={handleChange}
                    style={{ 
                        position: 'relative',
                        verticalAlign: 'top',
                        backgroundColor: 'transparent'
                    }}
                />
            </form>
            <div 
                className="typeahead-submit"
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    style={{ background: '#bfd4fd', padding: '6px', borderRadius: '50%' }}
                />
            </div>
            <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
                    
                    .typeahead-container {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        display: flex;
                        width: 50%;
                        margin-bottom: 10px;
                    }

                    .typeahead {
                        font-family: 'Roboto', sans-serif;
                        position: relative;
                        background: #e5e5e5;
                        border-radius: 4px 0 0 4px;
                        width: 100%;
                    }

                    .typeahead-submit {
                        border-radius: 0 4px 4px 0;
                        background: #e5e5e5;
                        color: #171717;
                        font-size: 12px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        padding-right: 6px;
                    }
    
                    input {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        -webkit-appearance: none;
                        width: 100%;
                        border-radius: 4px;
                        border: none;      
                        padding: 0.75rem 0.5rem;
                        color: #888;
                        background: #e5e5e5;
                    }
    
                    input:focus {
                        outline: none;
                        color: #171717;
                    }
                `}</style>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterTiles: (query) => dispatch({ type: 'SET_QUERY', payload: query }),
    }
}

export default connect(null, mapDispatchToProps)(TypeaheadFilter);