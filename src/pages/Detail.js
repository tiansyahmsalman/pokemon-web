import { useQuery } from "@apollo/client";
import React, {useState, Fragment, useEffect} from "react";
import { useParams } from "react-router-dom";
import { GET_DETAIL_POKEMON } from "../graphql/query";
import { Dialog, Transition } from '@headlessui/react'
import toast, { Toaster } from 'react-hot-toast';

export default function Detail() {
  let { name } = useParams();
  let [modalSuccess, setModalSuccess] = useState(false)
  let [modalFail, setModalFail] = useState(false)

  let [pokemonName, setPokemonName] = useState('')
  let [dialogEmpty, setDialogEmpty] = useState('')

  
  const gqlVariables = {
    name,
  };
  
  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: gqlVariables,
  });

  
  function buttonCatch() {
    const x = Math.floor(Math.random() * 2)

    if (x === 1) {
      setPokemonName('')
      setDialogEmpty('')
      setModalSuccess(true)
    } else {
      setModalFail(true)
    }

  }
 
  function closeModal() {
    setModalSuccess(false)
  }

  function closeModalFail() {
    setModalFail(false)
  }

  function savePokemon(pokemon) {
    let newData = JSON.parse(JSON.stringify(pokemon))
    if(!pokemonName) {
      setDialogEmpty('you must add name')
    } else {
      // console.log(pokemon)
      let data = localStorage.getItem('myPokemon')
      // console.log(data)
      if (!data) {
        newData.nickName = pokemonName
        let payload = [newData]
        localStorage.setItem('myPokemon', JSON.stringify(payload))
        setModalSuccess(false)
        toast.success(`Successfully added!`);
      } else if (data) {
        let oldData = JSON.parse(data)
        let check = oldData.map((el) => {
          if(el.nickName === pokemonName) {
            return true
          } else {
            return false
          }
        })
        console.log(check)
        
        if (check.includes(true)) {
          setDialogEmpty(`you already have ${pokemonName}`)
        } else {
          newData.nickName = pokemonName
          let payload = [...oldData, newData]
          localStorage.setItem('myPokemon', JSON.stringify(payload))
          setModalSuccess(false)
          toast.success('Successfully added!');
        }
 
      }
    }
  }

  function chamgeName(name) {
    setPokemonName(name)
  }


  if (loading) {
      return (
          <div>
              LOADING
          </div>
      )
  }

  return (
    <>  
        <div className="flex justify-center items-center">
        <div className="w-full max-w-7xl rounded bg-white shadow-lg m-5 p-10 sm:p-15 lg:p-20 text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 md:mb-0">
              <div className="relative">
                <div className="flex justify-center items-center">
                <img
                  src={data.pokemon.sprites.front_default}
                  className="w-full sm:w-3/4 z-10"
                  alt=""
                />
                </div>
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-1">
                  {data.pokemon.name}
                </h1>
                <div className="mb-5">
                    {
                        data.pokemon.types.map((type, index) => (
                            <span key={index} className="inline-block rounded-full text-gray-700 bg-yellow-200 px-2 py-1 text-sm font-bold mr-3">{type.type.name}</span>
                        ))
                    }
                </div>
                <div className="text-left">
                <p className="font-semibold mb-1">
                    Moves:
                </p>
                {
                    data.pokemon.moves.map((move, index) => (
                            <span key={index} className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xs font-bold mr-3">{move.move.name}</span>
                        
                    ))
                }
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      <div className="flex items-end justify-end fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-3 z-10">
        <div>
          <button
            onClick={() => {buttonCatch()}}
            className="block w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
              alt="catch"
            />
          </button>
        </div>
      </div>

      <Transition appear show={modalSuccess} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 mx-5 md:mx-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  YESSSS
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-black">
                    {data.pokemon.name} was caught!
                  </p>
                </div>
                <div className="w-full md:mb-0">
                  <div className="relative">
                    <div className="flex justify-center items-center">
                    <img
                      src={data.pokemon.sprites.front_default}
                      className="w-3/4"
                      alt=""
                    />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                <div className="flex border-b-2 border-gray-500">
                  <label className="self-center text-gray-600">Name:</label>
                  <input className="w-full py-1 pl-2 border-0 focus:outline-none" type="text" onChange={(e) => {chamgeName(e.target.value)}} required />
                </div>
                {
                  dialogEmpty ? <p className="text-xs text-red-500 mt-1">{dialogEmpty}</p> : ""
                }
                
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mx-1 text-sm font-medium text-yellow-900 bg-yellow-200 border border-transparent rounded-md hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {savePokemon(data.pokemon)}}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={modalFail} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalFail}
        >
          <div className="min-h-screen px-4 text-center mx-5 md:mx-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Noo
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-black">
                    {data.pokemon.name} run!!
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalFail}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      
      <Toaster />
    </>
  );
}
