import './styles/Game.css'
import MenuListComposition from './components/MenuList';
import { useState } from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export default function Game(){
    const [circlePosition, setCirclePosition] = useState({ x: null, y: null });
    const [leftRatio, setLeftRatio] = useState(null);
    const [topRatio, setTopRatio] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [waldo, setWaldo] = useState(null);
    const [wenda, setWenda] = useState(null);
    const [odlaw, setOdlaw] = useState(null);
    const [wizard, setWizard] = useState(null);

    const viewCircle = (e) => {

        const leftOffSet = e.target.offsetLeft;
        const topOffSet = e.target.offsetTop;

        if(
            menuOpen
            &&e.clientX-leftOffSet === circlePosition.x
            &&e.clientY + window.scrollY - topOffSet === circlePosition.y
            ){
            setMenuOpen(false);
        }else{
            setMenuOpen(true);
        }


        const xpos = e.clientX - leftOffSet;
        const ypos = e.clientY + window.scrollY - topOffSet;

        const leftRatio = xpos/e.target.width;
        const topRatio = ypos/e.target.height;

        setLeftRatio(leftRatio);
        setTopRatio(topRatio);
        setCirclePosition({ x: xpos, y: ypos });


        const circle = document.getElementById('circle');



        if(
            menuOpen
            &&e.clientX-leftOffSet === circlePosition.x
            &&e.clientY + window.scrollY - topOffSet === circlePosition.y
            )   {
            circle.style.display = 'none'
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
        .then(answer => console.log(answer))
        .catch(err => console.log(err))
    }

    const closeMenu = (name) => {
        console.log(name)
        isCorrect(name)
        setMenuOpen(false);
    }

    return(
        <div>
            <h1>Where's Waldo</h1>
            <img id='waldoSnowPic' src="public/waldo_snow.jpeg" alt="waldo_pic" width={'100%'} height={"auto"} onClick={viewCircle}/>
            <div id='circle'></div>
            <MenuListComposition circle={circlePosition} open={menuOpen} onClose={closeMenu}></MenuListComposition>
            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                
                <div className='characterContainer'>
                    <img src="/public/Waldo.png" alt="waldo" height={'100px'} width={'auto'}/>
                    {waldo && <DoneOutlineIcon></DoneOutlineIcon>}
                </div>

                <div className='characterContainer'>
                    <img src="/public/Wenda.png" alt="Wenda" height={'100px'} width={'auto'}/>
                    {wenda &&<DoneOutlineIcon></DoneOutlineIcon>}
                </div>
              
                <div className='characterContainer'>
                    <img src="/public/Odlaw.png" alt="Odlaw" height={'100px'} width={'auto'}/>
                    {odlaw && <DoneOutlineIcon></DoneOutlineIcon>}
                </div>

                <div className='characterContainer'>
                    <img src="/public/Wizard.png" alt="Wizard" height={'100px'} width={'auto'}/>
                    {wizard && <DoneOutlineIcon></DoneOutlineIcon>}
                </div>
            </div>
        </div>
    )
}