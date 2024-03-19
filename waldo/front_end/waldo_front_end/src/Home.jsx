import { useState } from 'react'
import Button from '@mui/material/Button';


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
    <div>Home
      <Button onClick={handleClick}>Start Game</Button>
    </div>
  )
}

export default Home
