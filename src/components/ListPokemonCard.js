import React from "react"
import { Link } from "react-router-dom"


export default function ListPokemonCard({pokemon, ownedPokemon}) {

    return (
        <>
        <Link to={`/pokemon/${pokemon.name}`} className="group">
                <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-100">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="flex flex-col justify-end items-center bg-gradient-to-t from-yellow-200 pb-2">
                    <h3 className="mt-2 text-2xl text-gray-700">{pokemon.name}</h3>
                    <p className="text-sm">Owned: {ownedPokemon}</p>
                  </div>
                </div>
        </Link>
        </>
    )
}