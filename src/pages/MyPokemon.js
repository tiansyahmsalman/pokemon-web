import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

export default function MyPokemon() {

    let [myPokemon, setMyPokemon] = useState([])
    
    let data = localStorage.getItem('myPokemon')

    useEffect(() => {
        setMyPokemon(JSON.parse(data))
    }, [data])

    function release(name) {
        let newData = JSON.parse(JSON.stringify(myPokemon))
        let filter = newData.filter(poke => poke.nickName !== name)

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#D97706',
            cancelButtonColor: '#B91C1C',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {

                if(newData.length <= 1) {
                    localStorage.clear()
                    setMyPokemon(null)
                } else {
                    localStorage.setItem('myPokemon', JSON.stringify(filter))
                    setMyPokemon(filter)
                }
            }
          })
    }

    console.log(myPokemon, 'oke')
    if (!myPokemon) {
        return (
        <p>
            EMPTYY
        </p>
        )
    }
    
    if (myPokemon) {
        if (myPokemon.length === 0) {
            return (
                <p>
                    LOADINGGG
                </p>
            )
        }
    }


    return (
        <div className="bg-white">
        <div className="max-w-2xl mx-auto py-10 px-10 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pb-5">
          <h1 className="text-2xl font-serif">POKEMON</h1>
          <p>total owned: 0</p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {myPokemon.map((pokemon, index) => (
              <div key={index} className="group">
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
            ))}
          </div>
        </div>
      </div>
    )
}