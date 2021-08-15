import React from 'react'

export default function MyPokemonCard({pokemon, release}) {
    return (
        <>
        <div className="group">
                <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-100">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="flex flex-col justify-end items-center bg-gradient-to-t from-yellow-200 pb-2">
                    <h3 className="mt-2 text-2xl text-gray-700">{pokemon.nickName}</h3>
                    <p className="text-sm">{pokemon.name}</p>
                    <button
                    onClick={() => release(pokemon.nickName)}
                    type="button"
                    className="inline-flex justify-center px-4 py-1 mt-2 rounded-full text-sm font-medium text-red-900 bg-red-300 border border-transparent hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Release
                  </button>
                  </div>
                </div>
              </div>
        </>
    )
}