import { Link } from "react-router-dom";
import logo from '../pokeball.svg'

export default function Navbar() {
  return (
    <div className="bg-yellow-300 font-sans m-0">
      <div className="bg-yellow-200 shadow">

          <div className="flex items-center justify-between mx-5 py-4">
            <Link to="/">
                <div>
                    <img src={logo} style={{ width: "50px", height: "50px" }} alt="oke"/>
                </div>
            </Link>

            <div className="flex items-center">
              <Link
                to="/mypokemon"
                className="text-black text-sm font-semibold border border-black px-2 py-2 rounded-lg hover:text-yellow-900 hover:border-yellow-900"
              >
                My Pokemon
              </Link>
            </div>
          </div>

      </div>
    </div>
  );
}
