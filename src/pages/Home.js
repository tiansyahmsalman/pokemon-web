import React, {useState, useEffect} from 'react';
import {GET_POKEMONS} from '../graphql/query'
import {useQuery} from '@apollo/client'

export default function Home() {
    
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
    
      console.log(data.pokemons.results)

    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-10 px-10 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pb-5">
          <h1 className="text-2xl">POKEMON</h1>
          <p>total owned: 0</p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.pokemons.results.map((pokemon, index) => (
              <a key={index} href={pokemon.url} className="group">
                <div className="w-full bg-gray-200 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:scale-110">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="flex flex-col justify-end items-center bg-gradient-to-t from-black pb-2">
                    <h3 className="mt-2 text-2xl text-gray-700">{pokemon.name}</h3>
                    <p className="text-sm">Owned: 0</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
}