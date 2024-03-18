import './styles/Game.css'
import MenuListComposition from './components/MenuList';
import { useState } from 'react';

export default function Game(){
    const [circlePosition, setCirclePosition] = useState({ x: 1, y: 1 });
    const [menuOpen, setMenuOpen] = useState(false);

    const viewCircle = (e) => {
        const leftOffSet = e.target.offsetLeft;
        const topOffSet = e.target.offsetTop;
        const xpos = e.clientX - leftOffSet;
        const ypos = e.clientY - topOffSet;

        setCirclePosition({ x: xpos, y: ypos });
        setMenuOpen(true);

        const circle = document.getElementById('circle');
        circle.style.width = '0px';
        circle.style.height = '0px';
        circle.style.left = xpos + 'px';
        circle.style.top = ypos + 'px';
      
        setTimeout(() => {
          circle.style.width = '70px';
          circle.style.height = '70px';
          circle.style.left = (xpos +leftOffSet - 35) + 'px';
          circle.style.top = (ypos +topOffSet - 35) + 'px';
        }, 10);
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