import React, {useState, useEffect} from 'react';
import {GET_POKEMONS} from '../graphql/query'
import {useQuery} from '@apollo/client'
import { Link } from 'react-router-dom';
import ListPokemonCard from '../components/ListPokemonCard';

export default function Home() {

      let [totalOwned, setTotalOwned] = useState(0)
      let [storagePokemon, setStoragePokemon] = useState([])

      useEffect(() => {
        let pokemonOwned = localStorage.getItem('myPokemon')

        if (pokemonOwned) {
          let owned = JSON.parse(pokemonOwned).length
          setTotalOwned(owned)
          setStoragePokemon(JSON.parse(pokemonOwned))
        } else {
          setTotalOwned(0)
          setStoragePokemon([])
        }

      }, [])

      const gqlVariables = {
          limit: 20,
          offset: 1,
      };
    
      const {loading, error, data} = useQuery(GET_POKEMONS, {
        variables: gqlVariables
      })

      
      if (loading) {
        return (
          <p>LOADING</p>
          )
        }
        
        if (error) {
          return (
            <p>ERROR</p>
            )
          }
          
        function showOwned(pokemonName) {
          if(storagePokemon.length > 0) {
            let pokemonCount = storagePokemon.filter(el => el.name === pokemonName).length
            return pokemonCount
          } else {
            return 0
          }
        }

    

    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-10 px-10 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pb-5">
          <h1 className="text-2xl font-serif">POKEMON</h1>
          <p>total owned: {totalOwned}</p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.pokemons.results.map((pokemon, index) => (
              <ListPokemonCard key={index} pokemon={pokemon} ownedPokemon={showOwned(pokemon.name)} />
            ))}
          </div>
        </div>
      </div>
    );
}