import React from 'react'
import logo from '../../assets/wellreadlogo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img width={width} src={logo} alt="logo" />
		</div>
	);
}

export default Logo
