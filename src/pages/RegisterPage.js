//------------------------------------------IMPORTS -----------------------------------
//
//------------------------------------------------------------------------------------//

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";

//-----------------------------------------FUNCTIONS -------------------------------
//
//-------------------------------------------------------------------------------------//

//---------------register--------------------
export const RegisterPage = () => {
    const navigate = useNavigate();

    //Creamos estados para controlar los input
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");
    const [error, setError] = useState("");

    //---------------handleForm---------------
    const HandleForm = async (e) => {
        e.preventDefault();
        setError(""); 
        //Borra estado de error

        if(pass1 !== pass2) {
            setError("passwords do not match");
            return;
            //Establece estado de error si las passwords no coinciden
        }

        try {
            //intentamos comunicarnos con la db usando servicios
            await registerUserService({name,email,password: pass1});
            //ir a login
            navigate("/login");

        } catch (error) {
            setError(error.message);
        }

    }

    //--------------------------------------------- RETURN--------------------------------------------
    //
    //------------------------------------------------------------------------------------------------//

    return (
    <section>
        <h1>Register</h1>
        
        <form onSubmit={HandleForm}>
        <fieldset>
                <label htmlFor="name">Name: </label>
                <input type="name" id="name" name="name" required onChange={(e) => setName(e.target.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="pass1">Password: </label>
                <input type="pass1" id="pass1" name="pass1" required onChange={(e) => setPass1(e.target.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="pass2">Repeat Password: </label>
                <input type="pass2" id="pass2" name="pass2" required onChange={(e) => setPass2(e.target.value)} />
            </fieldset>

            <button>Register</button>

            {error ? <p>{error}</p> : null}
            

        </form>



    </section>
    );
    //{error ? <p>{error}</p> : null} --> si hay un error al darle al submit se muestra

};