import swal from "sweetalert";

//poner aquí servicio getAllEntrysService
//WITHVOTES

export const getAllEntriesWithVotesService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/votes`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);

    }

    return json.data;
};


//poner aquí servicio getSingleEntryService

export const getSingleEntryService = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries/votes/${id}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}


//--------------------register service-------------------------------------


export const registerUserService = async ({name,email,password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password})
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    } else {
        alert("Usuario registrado, comprueba tu correo para activar tu cuenta")
    }
};

//------------------- LOGIN SERVICE -----------------

export const loginUserService = async ({email,password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message)
    }

    return json.data;

};

//-------------------- GET USER DATA -------------------------

export const getMyUserDataService = async (token) => {
  // Pasamos token como parámetro.
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/profile`, // Hacemos el fetch al nuevo endpoint getUserProfile.
    { headers: { Authorization: `Bearer ${token}` } } // Enviamos el token en los headers.
  );
  //Le paso el email por procs en la ruta. Lleva método GET por defecto.

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
    //Si hay error muestra el error
  } else {
    console.log("else");
    console.log(json);
    console.log(json.data);
    console.log("response");
    console.log(response);
    return json.data;
    //Sino hay error devuelve el json.data
  }
};


//--------------------------- CREATE ENTRY ----------------------

export const sendEntryService = async ({data, token}) => {
    console.log("token")
    console.log(token)
    console.log("body.data")
    console.log(data)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries`,{
        method: "POST",
        body: data,
        headers: {
            Authorization: "BEARER " +  token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        console.log(json)
        throw new Error(json.message);
    }
   
    return json.data;
};


//------------------ DELETE ENTRY SERVICE --------------

export const deleteEntryService = async ({id, token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: "BEARER " +  token,
        },
    });
    const json = await response.json();

    if(!response.ok) {
        console.log("error al borrar")
        console.log(json)
        throw new Error(json.message);
    }
  
}


//---------------------------------- VOTE ENTRY SERVICE ------------------------

export const voteEntryService = async ({userId, entryId, token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/votes/`,{
        method: "POST",
        headers: {
            Authorization: "BEARER " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, entryId})
    });

    console.log("userid=" + userId + "entryid=" + entryId )
    //le estoy pasando undefined a userid y entryid
    const json = await response.json();

    if(!response.ok) {
        swal(`Error`,`already voted`,`error` )
        //alert("ya has votado esta entrada")
        throw new Error(json.message);
        
    } else {
        swal(`Success`,`voted `,`success` )
       
        //alert("votado correctamente")
    }
};







//------------------------ EDIT ENTRY SERVICE -------------------

export const editEntryService = async ({idEntry, data, token}) => {
    console.log("token")
    console.log(token)
    console.log("body.data")
    console.log(data)
    console.log(idEntry)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries/${idEntry}`,{
        method: "PATCH",
        body: data,
        headers: {
            Authorization: "BEARER " +  token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        console.log(json)
        throw new Error(json.message);
    }
   
    return json.data;
};


//----------------------  GET ENTRIES BARRIO SERVICE -------------------------------

export const getEntriesBarrioService = async (barrioID) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries/${barrioID}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);

    }

    return json.data;
};
