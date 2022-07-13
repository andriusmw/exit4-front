
import { Link} from "react-router-dom"

export const ErrorMessage = ({message}) => {
    return ( 
    <>
        <p>{message}  </p>
        <Link to="/">Go back to Home Page</Link>
    </>
    )

};