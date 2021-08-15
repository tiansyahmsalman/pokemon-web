import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import MyPokemonCard from "../components/MyPokemonCard"

export default function MyPokemon() {

    let [myPokemon, setMyPokemon] = useState([])
    
    
    useEffect(() => {
        let data = localStorage.getItem('myPokemon')
        setMyPokemon(JSON.parse(data))
    }, [])

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
          <div className="pb-5 mb-2">
          <h1 className="text-2xl font-serif">MY POKEMON</h1>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {myPokemon.map((pokemon, index) => (
                <MyPokemonCard key={index} pokemon={pokemon} release={release} />
            ))}
          </div>
        </div>
      </div>
    )
}