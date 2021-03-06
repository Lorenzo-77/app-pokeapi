import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searcbar';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import React from 'react';

const {useState, useEffect} = React;


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async ()=>{
    try{
      setLoading(true);
      const data = await getPokemons(21, 21 * page);
      const promises = data.results.map(async (pokemon)=>{
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
      setLoading(false);
      setTotal(Math.ceil(data.count / 21));
      setNotFound(false);
    }catch(err){}
  }

  useEffect(()=>{
    if(!searching){
      fetchPokemons();
    }
  },[page]);

  const onSearch = async (pokemon) =>{
    if(!pokemon){
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result){
      setNotFound(true);
      setLoading(false);
      return;
    }else{
    setPokemons([result]);
    setPage(0);
    setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  }

  return (
    <div>
      <Navbar/>
    <div className="App">
      <Searchbar onSearch={onSearch}/>
      { notFound ?(
      <div className='not-found-text'>
      <img src='http://1.bp.blogspot.com/-shejHVi2aXs/UwogO2nGM2I/AAAAAAAAUho/HSSG_Lz6ODU/s1600/Banned.png'></img>
      <audio src='pokemon-atrapalosYa.mp3' autoplay="autoplay"></audio>
      </div> ):(
        <Pokedex 
        loading={loading}
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}
        />
        )}
    </div>
    </div>
  );
}

export default App;
