import './styles/Game.css'
import MenuListComposition from './components/MenuList';
import { useState } from 'react';

export default function Game(){
    const [circlePosition, setCirclePosition] = useState({ x: 1, y: 1 });
    const [menuOpen, setMenuOpen] = useState(false);

    const viewCircle = (e) => {

        const leftOffSet = e.target.offsetLeft;
        const topOffSet = e.target.offsetTop;

        if(
            menuOpen
            &&e.clientX-leftOffSet === circlePosition.x
            &&e.clientY-topOffSet === circlePosition.y
            ){
            setMenuOpen(false);
        }else{
            setMenuOpen(true);
        }

        const xpos = e.clientX - leftOffSet;
        const ypos = e.clientY - topOffSet;

        setCirclePosition({ x: xpos, y: ypos });

        console.log('x: '+xpos)
        console.log('y: '+ypos)

        const circle = document.getElementById('circle');



        if(
            menuOpen
            &&e.clientX-leftOffSet === circlePosition.x
            &&e.clientY-topOffSet === circlePosition.y
            )   {
            circle.style.display = 'none'
          }else{circle.style.display = 'block'}

        circle.style.left = (xpos +leftOffSet - 25) + 'px';
        circle.style.top = (ypos +topOffSet - 25) + 'px';
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return(
        <div>
            <h1>Where's Waldo</h1>
            <img id='waldoSnowPic' src="public/waldo_snow.jpeg" alt="waldo_pic" width={'100%'} height={"auto"} onClick={viewCircle}/>
            <div id='circle'></div>
            <MenuListComposition circle={circlePosition} open={menuOpen} onClose={closeMenu}></MenuListComposition>
        </div>
    )
}