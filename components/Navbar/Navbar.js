import React, { useEffect, useState } from "react"
import Link from 'next/link'

export const Navbar = () => {
    const [activescroll, setActivescroll] = useState()

    useEffect(() => {
        const handleScroll = () => {
            const activescroll = window.scrollY < 100 ? false : true;
            setActivescroll(activescroll)
        }

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    })

    return (
        <header className={`nav ${activescroll ? 'active-scroll' : ''}`}>
            <div className="wrap">
                <Link href="/">
                    <div className="logo">
                        <h2 style={{ color: '#bfd4fd' }}>Hero</h2>
                        <h2 style={{ color: '#cacaca' }}>Builds</h2>
                    </div>
                </Link>
                <Link href="/heroes">
                    <div className="heroes-link">
                        Heroes
                    </div>
                </Link>
            </div>
            <style jsx>{`
                header {
                    position: fixed;
                    top: 0;
                    z-index: 9999;
                    width: 100%;
                    background: #242424;
                }

                .active-scroll {
                    box-shadow: 0 2px 4px 0 rgba(5,5,5,.5);
                    border-bottom: 1px solid #353535;
                }

                .wrap {
                    display: flex;
                    align-items: center;
                    width: 50%;
                    margin: auto;
                    padding: 15px 0;
                }

                .logo {
                    display: flex;
                    cursor: pointer;
                    margin-right: 40px;
                }

                .logo h2 {
                    margin: 0;
                }

                .heroes-link {
                    cursor: pointer;
                    color: #cbcbcb;
                }

                .heroes-link:hover {
                    color: #bfd4fd;
                }

                @media only screen and (max-width: 1500px) {
                    .wrap {
                        width: 80%;
                    }
                }

                @media only screen and (max-width: 1200px) {
                    .wrap {
                        width: 90%;
                    }
                }
            `}</style>
        </header>
    )
}

export default Navbar;