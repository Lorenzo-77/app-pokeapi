import React from 'react';
import Music from '../music/pokemon.mp3';
import ReactHowler from 'react-howler'
const {useState, useEffect} = React;

const audio = Music;

const Navbar = () =>{
    let imgUrl = "https://i.pinimg.com/originals/d8/43/ad/d843addbfcec31846d8699feebcf358b.png";
    const { play, setPlay } = useState(false);
    return <nav>
        <div/>
        <div>
        <img src={imgUrl} alt="poke-logo" className='navbar-image'/>
        </div>
        <div>
        <ReactHowler src={audio} playing={play} />
        <button onClick={()=> setPlay(!play)}>
            {play ? 'Pause' : 'Play'}
        </button>
        </div>
    </nav>;
}

export default Navbar;