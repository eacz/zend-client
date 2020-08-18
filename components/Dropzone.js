import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext'

import FormForAuths from './FormForAuths'

const Dropzone = () => {
    const contextApp = useContext(appContext);
    const { showAlert, uploadFile, generateLink, loading } = contextApp;

    const contextAuth = useContext(authContext)
    const {  user, auth  } = contextAuth

    const onDropRejected = () => {
        showAlert(
            'The file has excess the size limit, 1MB, get an account for free to upload bigger files'
        );
    };

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        //console.log(acceptedFiles);

        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        uploadFile(formData, acceptedFiles[0].path);

        //console.log(res.data);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
    } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const files = acceptedFiles.map((file) => (
        <li
            key={file.lastModified}
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="font-bold text-xl">{file.path}</p>
            <p className="text-sm text-gray-500">
                {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
            </p>
        </li>
    ));

   

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-blue-400 border-2 bg-gray-100 px-4">
            {acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">
                        Files
                    </h4>

                    <ul>{files}</ul>

                    {auth ? <FormForAuths /> : ''}

                    {loading ? (
                        <p className="my-10 text-center text-gray-600">Uploading file...</p>
                    ) : (
                        <button
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-500"
                            onClick={() => generateLink()}
                        >
                            Generate link
                        </button>
                    )}
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                    <input className="h-100" {...getInputProps()} />
                    <div className="text-center">
                        {isDragActive ? (
                            <p className="text-2xl tex-center text-gray-600">
                                Drop it!
                            </p>
                        ) : (
                            <>
                                <p className="text-2xl tex-center text-gray-600">
                                    Drop your file here!
                                </p>
                                <button
                                    className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-500"
                                    type="button"
                                >
                                    Select a file to upload
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
