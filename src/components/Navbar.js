import { Link } from "react-router-dom";
import logo from '../pokeball.svg'

export default function Navbar() {
  return (
    <div className="bg-current font-sans m-0">
      <div className="bg-current shadow">

          <div className="flex items-center justify-between mx-5 py-4">
            <Link to="/">
                <div className="h-10 w-10 mr-10">
                    <img src={logo} alt="oke"/>
                </div>
            </Link>

            <div className="flex items-center">
              <Link
                to="/my-pokemon"
                className="text-white text-xs font-semibold border px-2 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
              >
                My Pokemon
              </Link>
            </div>
          </div>

      </div>
    </div>
  );
}
