import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_DETAIL_POKEMON } from "../graphql/query";
import toast, { Toaster } from "react-hot-toast";
import ModalSucces from "../components/ModalSuccess";
import ModalFail from "../components/ModalFail";

export default function Detail() {
  let { name } = useParams();
  let [modalSuccess, setModalSuccess] = useState(false);
  let [modalFail, setModalFail] = useState(false);

  let [pokemonName, setPokemonName] = useState("");
  let [dialogEmpty, setDialogEmpty] = useState("");

  const gqlVariables = {
    name,
  };

  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: gqlVariables,
  });

  function buttonCatch() {
    const x = Math.floor(Math.random() * 2);

    if (x === 1) {
      setPokemonName("");
      setDialogEmpty("");
      setModalSuccess(true);
    } else {
      setModalFail(true);
    }
  }

  function closeModal() {
    setModalSuccess(false);
  }

  function closeModalFail() {
    setModalFail(false);
  }

  function savePokemon(pokemon) {
    let newData = JSON.parse(JSON.stringify(pokemon));
    if (!pokemonName) {
      setDialogEmpty("you must add name");
    } else {
      
      let data = localStorage.getItem("myPokemon");

      if (!data) {
        newData.nickName = pokemonName;
        let payload = [newData];
        localStorage.setItem("myPokemon", JSON.stringify(payload));
        setModalSuccess(false);
        toast.success(`Successfully added!`);
      } else if (data) {
        let oldData = JSON.parse(data);
        let check = oldData.map((el) => {
          if (el.nickName === pokemonName) {
            return true;
          } else {
            return false;
          }
        });

        if (check.includes(true)) {
          setDialogEmpty(`you already have ${pokemonName} name`);
        } else {
          newData.nickName = pokemonName;
          let payload = [...oldData, newData];
          localStorage.setItem("myPokemon", JSON.stringify(payload));
          setModalSuccess(false);
          toast.success("Successfully added!");
        }
      }
    }
  }

  function changeName(name) {
    setPokemonName(name);
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
                  {data.pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-full text-gray-700 bg-yellow-200 px-2 py-1 text-sm font-bold mr-3"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-semibold mb-1">Moves:</p>
                  {data.pokemon.moves.map((move, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xs font-bold mr-3"
                    >
                      {move.move.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-3 z-10">
        <div>
          <button
            onClick={() => {
              buttonCatch();
            }}
            className="block w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="http://pngimg.com/uploads/pokeball/pokeball_PNG30.png"
              alt="catch"
            />
          </button>
        </div>
      </div>

      <ModalSucces modalSuccess={modalSuccess} closeModal={() => {closeModal()}} pokemon={data.pokemon} changeName={changeName} dialogEmpty={dialogEmpty} savePokemon={savePokemon}/>
      
      <ModalFail modalFail={modalFail} closeModalFail={() => {closeModalFail()}} pokemon={data.pokemon} />

      <Toaster />
    </>
  );
}
