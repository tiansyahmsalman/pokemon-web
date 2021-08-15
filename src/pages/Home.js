import React, {useState, useEffect} from 'react';
import {GET_POKEMONS} from '../graphql/query'
import {useQuery} from '@apollo/client';
import ListPokemonCard from '../components/ListPokemonCard';

export default function Home() {

      let [totalOwned, setTotalOwned] = useState(0)
      let [storagePokemon, setStoragePokemon] = useState([])
      let [limitPokemon, setLimitPokemon] = useState(20)

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
          limit: limitPokemon,
          offset: 1,
      };
    
      const {loading, error, data} = useQuery(GET_POKEMONS, {
        variables: gqlVariables
      })

      function upLimit() {
        setLimitPokemon(limitPokemon + 20)
      }

      
      if (loading) {
        return (
          <div className="flex justify-center items-center">
      <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_rBOODA.json" className="object-center object-cover"  background="transparent"  speed="1"  style={{maxWidth: "400px", maxHeight: "400px"}}  loop  autoplay></lottie-player>
          </div>
          )
        }
        
        if (error) {
          return (
            <div className="text-center my-5">
            <p className="text-2xl">ERROR 404</p>
            </div>
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

          <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-200 shadow-xl border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={upLimit}
                  >
                    Load More
                  </button>
                </div>
        </div>
      </div>
    );
}