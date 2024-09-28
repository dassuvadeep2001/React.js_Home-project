import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
  const product="Mobile"
  const brand="samsung s24 ultra pro max"
  return (
    <nav>
        <div className="navlist">
            <ul>
                <li><Link to="">BITCOIN</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header