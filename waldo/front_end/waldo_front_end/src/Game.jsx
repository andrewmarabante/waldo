import './styles/Game.css'

export default function Game(){

    const viewCircle = (e) => {
        const leftOffSet = e.target.offsetLeft;
        const topOffSet = e.target.offsetTop;
        const x = e.clientX - leftOffSet;
        const y = e.clientY - topOffSet;

        console.log('x: '+x)
        console.log('y: '+y)

        circle.style.width = '0px';
        circle.style.height = '0px';
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
      
        setTimeout(() => {
          circle.style.width = '70px';
          circle.style.height = '70px';
          circle.style.left = (x +leftOffSet - 35) + 'px';
          circle.style.top = (y +topOffSet - 35) + 'px';
        }, 10);
    }

    return(
        <div>
            <h1>Where's Waldo</h1>
            <img id='waldoSnowPic' src="public/waldo_snow.jpeg" alt="waldo_pic" width={'100%'} height={"auto"} onClick={viewCircle}/>
            <div id='circle'></div>
        </div>
    )
}