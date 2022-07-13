//--------------------------------------------------------- IMPORTS -------------------------------------
//
//-------------------------------------------------------------------------------------------------------//

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../services";
import swal from "sweetalert";

//-----------------------------------------------FUNCTIONS -----------------------------------------------
//
//-------------------------------------------------------------------------------------------------------//

//----------------LOGIN FUNCTION----------------------
export const LoginPage = () => {
  //Controlamos los estados de los input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //cargamos el contexto
  const { login } = useContext(AuthContext);
  //cargamos navigate
  const navigate = useNavigate();
  //Cargamos el setemailauth para poder usarlo aquí y tener email en el contexto
  //para poder pasarlo a la funcion del contexto: getmyUserDataService

  //-----------------HANDLE FORM ------------------------
  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUserService({ email, password });

      //console.log(data);
      login(data.token);
      //Le pasa el token al context

      navigate("/");
      //redigirimos al home
    } catch (error) {
      swal(`Error`,`${error.message}`,`error` )
      setError(error.message);
    }
  };


  //--------------------------------------------------- RETURN -------------------------------------
  //
  //-----------------------------------------------------------------------------------------------//
  
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button>Login</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};

