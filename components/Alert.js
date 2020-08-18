import React, {useContext} from 'react'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'

const Alert = () => {
    const contextAuth = useContext(authContext)
    const { message} = contextAuth
    const contextApp = useContext(appContext);
    const { messageFile } = contextApp;

    return ( 
        <div className="bg-blue-700 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            {message || messageFile}
        </div>
     );
}
 
export default Alert;