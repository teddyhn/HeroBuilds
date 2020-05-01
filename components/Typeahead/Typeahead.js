import React, { useState } from 'react'
import Img from 'react-image'
import Link from 'next/link'

export const Typeahead = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [hover, setHover] = useState(false)

    console.log(props)

    let heroes = require('../../Heroes.json');

    const handleChange = e => {
        setSearchQuery(e.target.value);

        if (!e.target.value.length) {
            setSearchResults([])
            return;
        }

        let query = e.target.value;
        let results = [];

        heroes.forEach(hero => {
            let name = hero.PrimaryName;
            name = name.replace(/[.' -]/g, '').toLowerCase()

            // Handle accented character in Lúcio's name
            if (hero.PrimaryName === "Lúcio") {
                name = "lucio"
            }

            if (name.slice(0, query.length).includes(query.toLowerCase().replace(/[.' -]/g, ''))) {
                results.push(hero.PrimaryName)
            }
        })

        setSearchResults(results);
    }

    return (
        <div className="typeahead">
            <input
                className="t-hint"
                disabled={true}
                value={searchResults.length && showResults ? searchQuery.concat(searchResults[0].replace(/[.'-]/g, '').slice(searchQuery.length)) : ''}
                type="text"
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    borderColor: 'transparent',
                    boxShadow: 'none',
                    background: 'none 0px 0px / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)'
                }}
             />
            <input
                type="text"
                placeholder="Search" 
                value={searchQuery} 
                spellCheck={false}
                onChange={handleChange}
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}
                style={{ 
                    position: 'relative',
                    verticalAlign: 'top',
                    backgroundColor: 'transparent'
                }}
            />
            <div 
                className="search-results"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {searchResults.map(result => {
                    console.log(result)
                    return (
                        <Link href="/heroes/[pid]" as={`/heroes/${result}`}>
                            <div className="result">
                                {props.heroesData.map(hero => {
                                    if (hero.name === result) {
                                        return (
                                            <Img
                                                height="26px"
                                                width="26px"
                                                src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`}
                                                style={{ marginRight: "5px", border: "2px solid black", borderRadius: "4px" }}
                                            />
                                        )
                                    }
                                })}
                                <span>{result}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

                .typeahead {
                    margin-bottom: 1rem;
                    font-family: 'Roboto', sans-serif;
                    width: 60%;
                    position: relative;
                    background: #e5e5e5;
                    border-radius: 4px;
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

                .search-results {
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    position: absolute;
                    z-index: 100;
                    color: #171717;
                    background: #e5e5e5;
                    width: 100%;
                    border-radius: 4px;
                    padding: 0.25rem;
                    margin-top: 0.5rem;
                    visibility: ${showResults && searchResults.length || hover ? 'visible' : 'hidden'};
                }

                .result {
                    display: flex;
                    align-items: center;
                    padding: 0.25rem;
                    cursor: pointer
                }

                .result:hover {
                    background: #dbdbdb;
                }
            `}</style>
        </div>
    )
}

export default Typeahead;