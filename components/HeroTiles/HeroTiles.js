import React from 'react'
import Img from 'react-image'
import Link from 'next/link'

export const HeroTiles = props => {

    const renderRoleImg = role => {
        switch(role) {
            case "Tank":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/tank.png')} />
            case "Bruiser":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/bruiser.png')} />
            case "Ranged Assassin":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/ranged.png')} />
            case "Melee Assassin":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/melee.png')} />
            case "Healer":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/healer.png')} />
            case "Support":
                return <img style={{ height: '16px' }} src={require('../../public/assets/role/support.png')} />
        }
    }

    return (
        <div className="hero-tiles">
            {props.heroes.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }

                if (b.name > a.name) {
                    return -1
                }

                return 0
            }).map((hero, i) => {
                return (
                    <Link href="/heroes/[pid]" as={`/heroes/${hero.name}`} key={`tile-${i}`}>
                        <div className="hero-tile">
                            <div className="left">
                                <Img 
                                    height="70px" 
                                    src={`https://www.heroesprofile.com/includes/images/heroes/${hero.img}`}
                                    style={{ borderRadius: '5px', border: '1px solid rgb(51, 51, 51)' }}
                                />
                            </div>
                            <div className="hero-details">
                                <h3 className="hero-name" style={{ fontSize: '0.9rem', marginTop: 0, marginBottom: '0.25rem', color: '#bfd4fd' }}>{hero.name}</h3>
                                <ul className="hero-tags">
                                    <li className="hero-tags tag">{hero.role}</li>
                                    {hero.role !== hero.subgroup ? <li className="hero-tags tag">{hero.subgroup}</li> : null}
                                </ul>
                            </div>
                            <div className="right">
                                <div className="role-img">{renderRoleImg(hero.role)}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
            <style jsx>{`
                .hero-tiles {
                    display: grid;
                    grid-template-columns: 25% 25% 25% 25%;
                    grid-template-rows: auto auto auto auto; 
                    column-gap: 10px;
                    row-gap: 5px;
                    margin-top: 0.5rem;
                }

                .hero-tile {
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid rgb(51, 51, 51);
                    border-radius: 4px;
                    background: rgb(32, 32, 32);
                    margin-bottom: 0.5rem;
                }

                .hero-tile:hover {
                    border-color: #bfd4fd;
                    cursor: pointer;
                }

                .left {
                    margin-right: 8px;
                }

                .right {
                    margin-left: auto;
                }

                .role-img {
                    padding: 2px;
                    border: 1px solid rgb(51, 51, 51);
                    border-radius: 50%;
                    height: 16px;
                    background: #171717;
                }

                .hero-details {
                    padding-top: 0.5rem;
                }

                .hero-tags {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-size: 0.75rem;
                }

                @media only screen and (max-width: 1200px) {
                    .hero-tiles {
                        grid-template-columns: 33% 33% 33%;
                        grid-template-rows: auto auto auto;
                    }
                }

                @media only screen and (max-width: 900px) {
                    .hero-tiles {
                        grid-template-columns: 50% 50%;
                        grid-template-rows: auto auto;
                    }
                }

                @media only screen and (max-width: 600px) {
                    .hero-tiles {
                        grid-template-columns: 100%;
                        grid-template-rows: auto;
                    }
                }
            `}</style>
        </div>
    )
}

export default HeroTiles;