//------------------------------------------------------ IMPORTS ---------------------------------------------------
//
//-------------------------------------------------------------------------------------------------------------------//

import { useState } from "react";
import { getEntriesBarrioService } from "../services";
import { Entry } from "./Entry";

//----------------------------------------------------- FUNCIONES -------------------------------------------------
//
//----------------------------------------------------------------------------------------------------------------//

//------------------------------- funcion búsqueda barrio --------------
export const BusquedaBarrio = () => {
    

     //estado
     const [entries2, setEntries2] = useState([]);
     const [loading, setLoding] = useState(true);
     const [error, setError] = useState("");
     //estado visible y busqueda
     const [visible, setVisible] = useState(false)
     const [search, setSearch] = useState("");

    //--------------------------función handle form --------------------         
    const handleForm = async (e) => {
        e.preventDefault();
       

        try{
            setLoding(true);

           
            //const data = new FormData(e.target);
            //let barrioID = data;
            let barrioID = search
            const data2 = await getEntriesBarrioService(barrioID);
            
            setEntries2(data2)
            console.log("data2= " + data2);
            console.log("search " + search)
            console.log("search.value " + search.value)
            console.log("barrioID= " + barrioID)
            setVisible(true)
       
        } catch (error) {
            console.log(error)
            console.log(error.message)
            setError(error.message);
            setLoding(false);
        } finally {
            setLoding(false);
        }
    }

    //--------------------------------------------- RETURN ----------------------------------------------------------
    //
    //--------------------------------------------------------------------------------------------------------------//

    return (
        <article>
    <form onSubmit={handleForm}>
        <fieldset>
        <label htmlFor="neighborhood">search for Neighbourhood: </label>
            <input type="text" id="neighborhood" name="neighborhood" onChange={(e) => setSearch(e.target.value)}  />
        </fieldset>

        <button>SEARCH</button>
    </form>

       { /*VISIBLE EL RETURN Y MAPEO DE RESULTADOS:*/} 
       
       {visible ?  (entries2.length ? (
        <ul>
            {entries2.map((entry) => (
            <li key={entry.id}>
                <Entry entry={entry}  /> 
            </li>
            ))}
        </ul>
        ) :( 
        <p>No hay entradas disponibles...</p>
        )) : null}

</article>
    );
   
};