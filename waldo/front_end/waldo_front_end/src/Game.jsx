import './styles/Game.css'
import MenuListComposition from './components/MenuList';
import { useState, useEffect } from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Button from '@mui/material/Button';
import { v4 } from 'uuid';

export default function Game(){
    const [circlePosition, setCirclePosition] = useState({ x: null, y: null });
    const [leftRatio, setLeftRatio] = useState(null);
    const [topRatio, setTopRatio] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [waldo, setWaldo] = useState(false);
    const [wenda, setWenda] = useState(false);
    const [odlaw, setOdlaw] = useState(false);
    const [wizard, setWizard] = useState(false);
    const [game, setGame] = useState(false)
    const [incorrect, setIncorrect] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [chooseMessage, setChooseMessage] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('gameId');

    const viewCircle = (e) => {
        const leftOffSet = e.target.offsetLeft;
        const topOffSet = e.target.offsetTop;
        setIncorrect(false);
        setCorrect(false)
        setChooseMessage(true)

        if(
            menuOpen
            &&e.clientX + window.scrollX -leftOffSet === circlePosition.x
            &&e.clientY + window.scrollY - topOffSet === circlePosition.y
            ){
            setMenuOpen(false);
            setChooseMessage(false);
        }else{
            setMenuOpen(true);
        }


        const xpos = e.clientX + window.scrollX - leftOffSet;
        const ypos = e.clientY + window.scrollY - topOffSet;

        const leftRatio = xpos/e.target.width;
        const topRatio = ypos/e.target.height;

        setLeftRatio(leftRatio);
        setTopRatio(topRatio);
        setCirclePosition({ x: xpos, y: ypos });


        const circle = document.getElementById('circle');



        if(
            menuOpen
            &&e.clientX + window.scrollX -leftOffSet === circlePosition.x
            &&e.clientY + window.scrollY - topOffSet === circlePosition.y
            )   {
            circle.style.display = 'none'
            setChooseMessage(false)
          }else{circle.style.display = 'block'}

        circle.style.left = (xpos +leftOffSet - 25) + 'px';
        circle.style.top = (ypos +topOffSet - 25) + 'px';
    }

    const isCorrect = (name) => {
        const data = {
            name : name,
            left : leftRatio,
            top : topRatio
        }

        fetch('http://localhost:3000/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(result => result.json())
        .then(answer => {
            if(answer === 'correct')
            {
                setCorrect(true)
                setChooseMessage(false)
                switch(name){
                    case 'waldo':
                        setWaldo(true);
                        break;
                    case 'wenda':
                        setWenda(true);
                        break;
                    case 'odlaw':
                        setOdlaw(true);
                        break;
                    case 'wizard':
                        setWizard(true);
                        break;
                }
            }else{
                setIncorrect(true)
                setChooseMessage(false)
            }
        })
        .catch(err => console.log(err))
    }

    const closeMenu = (name) => {
        isCorrect(name)
        setMenuOpen(false);
    }

    useEffect( () => {
        if(waldo && wenda && odlaw && wizard)
    {
        if(!game){
            const data = {
                gameId : gameId,
            }
            fetch('http://localhost:3000/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'  
           })
           .then(result => result.json())
           .then(data => console.log(data))
           .catch(err=>console.log(err))
        }
        setGame(true)
    }},[isCorrect] )

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            gameId : gameId,
            username : e.target.username.value
        }
        fetch('http://localhost:3000/username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'  
           })
           .then(result => result.json())
           .then(data => {
            window.location.href = '/scores'
           })
           .catch(err=>console.log(err))
        }

    return(
        <div>
            {game && 
            <div className='game'>
                <h1>You Win!</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" style={{fontSize:'.7em'}}>Enter Your Username:</label>
                    <br></br>
                    <input type="text" name='username' style={{minHeight:'2em', minWidth:'20em', textAlign:'center'}}/>
                    <br></br>
                    <Button type='submit' id='subButton'>Submit</Button>
                    </form>

            </div>}


            <h1 style={{textAlign:'center'}}>Where's Waldo?</h1>
            <img id='waldoSnowPic' src="/static/images/waldo_snow.jpeg" alt="waldo_pic" width={'100%'} height={"auto"} onClick={viewCircle}/>
            <div id='circle'></div>
            <MenuListComposition circle={circlePosition} open={menuOpen} onClose={closeMenu}></MenuListComposition>
            {correct && <div className='message'>Found Him!</div>}
            {incorrect && <div className='message'>That's not him!</div>}
            {chooseMessage && <div className='message'>Choose a Character!</div>}
            {(!correct && !incorrect && !chooseMessage) && <div className='message'>Find All The Characters Below!</div>}
            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                
                <div className='characterContainer'>
                    <img src="/public/Waldo.png" alt="waldo" height={'100px'} width={'auto'}/>
                    {waldo && <DoneOutlineIcon style={{position:'absolute'}}></DoneOutlineIcon>}
                </div>

                <div className='characterContainer'>
                    <img src="/public/Wenda.png" alt="Wenda" height={'100px'} width={'auto'}/>
                    {wenda &&<DoneOutlineIcon style={{position:'absolute'}}></DoneOutlineIcon>}
                </div>
              
                <div className='characterContainer'>
                    <img src="/public/Odlaw.png" alt="Odlaw" height={'100px'} width={'auto'}/>
                    {odlaw && <DoneOutlineIcon style={{position:'absolute'}}></DoneOutlineIcon>}
                </div>

                <div className='characterContainer'>
                    <img src="/public/Wizard.png" alt="Wizard" height={'100px'} width={'auto'}/>
                    {wizard && <DoneOutlineIcon style={{position:'absolute'}}></DoneOutlineIcon>}
                </div>
            </div>
        </div>
    )
}