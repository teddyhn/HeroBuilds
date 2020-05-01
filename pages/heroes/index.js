import React, { useState } from 'react'
import axios from 'axios'

export const Index = props => {
    const [activeRole, setActiveRole] = useState('All')

    return (
        <div className="container">
            <div className="wrap">
                <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="role-filters">
                        <a className={`role-selection all ${activeRole === 'All' ? 'active' : null}`} onClick={() => setActiveRole('All')}>
                            All
                        </a>
                        <a className={`role-selection tank ${activeRole === 'Tank' ? 'active' : null}`} onClick={() => setActiveRole('Tank')}>
                            <img className="role-img" src={require('../../public/assets/role/tank.png')} />
                            Tank
                        </a>
                        <a className={`role-selection bruiser ${activeRole === 'Bruiser' ? 'active' : null}`} onClick={() => setActiveRole('Bruiser')}>
                            <img className="role-img" src={require('../../public/assets/role/bruiser.png')} />
                            Bruiser
                        </a>
                        <a className={`role-selection ranged ${activeRole === 'Ranged Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Ranged Assassin')}>
                            <img className="role-img" src={require('../../public/assets/role/ranged.png')} />
                            Ranged Assassin
                        </a>
                        <a className={`role-selection melee ${activeRole === 'Melee Assassin' ? 'active' : null}`} onClick={() => setActiveRole('Melee Assassin')}>
                            <img className="role-img" src={require('../../public/assets/role/melee.png')} />
                            Melee Assassin
                        </a>
                        <a className={`role-selection healer ${activeRole === 'Healer' ? 'active' : null}`} onClick={() => setActiveRole('Healer')}>
                            <img className="role-img" src={require('../../public/assets/role/healer.png')} />
                            Healer
                        </a>
                        <a className={`role-selection support ${activeRole === 'Support' ? 'active' : null}`} onClick={() => setActiveRole('Support')}>
                            <img className="role-img" src={require('../../public/assets/role/support.png')} />
                            Support
                        </a>
                    </div>
                </header>
            </div>
            <style jsx>{`
                .container {
                    padding: 2.5vh 0;
                }

                .hero-img {
                    cursor: pointer;
                    height: 34px;
                    margin: auto 10px auto 0;
                    width: fit-content;
                }
        
                header {
                    color: #cacaca
                }
        
                .header {
                    display: flex;
                    font-weight: 600;
                    padding: 10px 0;
                }
        
                .header > div {
                    cursor: pointer;
                    user-select: none;
                }
        
                .role-filters {
                    display: flex;
                    border: 1px solid #2a2a2a;
                    border-radius: 4px;
                }
        
                .role-filters a {
                    font-size: 0.75rem;
                    padding: 10px 14px;
                    border-right: 1px solid #2a2a2a;
                    cursor: pointer;
                    user-select: none;
                }
        
                .role-filters a.support {
                    border-right: none;
                }
        
                .role-filters a.active {
                    color: #eee;
                    background: #272626;
                    font-weight: 700;
                }
        
                .role-img {
                    height: 16px;
                    margin-right: 5px;
                }
        
                .role-selection {
                    display: flex;
                    align-items: center;
                }
        
                .wrap {
                    margin: 0 auto;
                    width: 50%;
                    position: relative;
                }
            `}</style>
            <style jsx global>{`
                body {
                    color: #888;
                    font-family: lato,sans-serif;
                    background: #171717;
                    margin: 0;
                    width: calc(100vw - 34px);
                }
            `}</style>
        </div>
    )
}

export async function getStaticProps() {
    let heroes = require('../../Heroes.json');
  
    return await axios.get('https://herobuilds-api.herokuapp.com/api/heroes/').then(res => {
      res.data.heroes.map(hero => {
        heroes.forEach(i => {
          if (i.PrimaryName === hero.name) {
            hero.role = i.Group;
            hero.subgroup = i.SubGroup;
          }
        })
      })
  
      return {
        props: res.data
      }
    })
  }
  
export default Index;