import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import './styles/Home.css'

function Home() {


const handleClick = () => {

   fetch('http://localhost:3000/', {
    method: 'POST',
   })
   .then((result) => result.json())
   .then(gameId => {
    window.location.href = `/game?gameId=${gameId}`
   })
   .catch(err => console.log(err))

}

  return (
    <div>
      <h1 style={{textAlign:'center', fontSize:'50px', boxShadow:'0px 0px 5px 2px', padding:'20px'}}>Where's Waldo?</h1>
      <div className='imageContainer'>
        <img className='characterPic' src="../public/Waldo.png" alt="Waldo"/>
        <img className='characterPic' src="../public/Odlaw.png" alt="Odlaw"/>
        <img className='characterPic' src="../public/Wenda.png" alt="Wenda"/>
        <img className='characterPic' src="../public/Wizard.png" alt="Wizard"/>
      </div>
      <Button onClick={handleClick} style={{width:'100%', padding:'20px', fontSize:'25px'}}>Start Game</Button>
    </div>
  )
}

export default Home
