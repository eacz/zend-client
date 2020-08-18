import React, { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';

import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

const Home = () => {
    const contextAuth = useContext(authContext);
    const { authenticateUser } = contextAuth;

    const contextApp = useContext(appContext);
    const { messageFile, url } = contextApp;

    useEffect(() => {
        const token = localStorage.getItem('z_token');
        if (token) {
            authenticateUser();
        }
    }, []);

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                {url ? (
                    <>
                        <p className="text-center text-2xl mt-10">
                            {' '}
                            <span className="font-bold text-blue-700 text-3xl">
                                Your URL is
                            </span>{' '}
                            {`${process.env.frontendURL}/links/${url}`}
                        </p>
                        <button
                            type="button"
                            className="bg-blue-800 w-full p-3 hover:bg-blue-600 rounded text-white font-bold uppercase mt-10"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    `${process.env.frontendURL}/links/${url}`
                                )
                            }
                        >
                            Copy link
                        </button>
                    </>
                ) : (
                    <>
                        {messageFile && <Alert />}
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                            <Dropzone />
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                    Share your files simply and with privacy
                                </h2>
                                <p className="text-lg leading-loose">
                                    <span className="text-blue-700 font-bold">
                                        Zend
                                    </span>{' '}
                                    allows you to share files encrypted and it
                                    is removed after a defined number of
                                    downloads. So you can keep what you share
                                    privately and be sure that your stuff isn't
                                    online forever.
                                </p>
                                <Link href="/createaccount">
                                    <a className="text-blue-700 font-bold text-lg hover:text-blue-500">
                                        Create an account for more benefits
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Home;
