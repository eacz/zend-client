import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {
    const contextAuth = useContext(authContext);
    const { authenticateUser, user, logout } = contextAuth;

    const contextApp = useContext(appContext);
    const { cleanState } = contextApp;

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('z_token');
        if (token) {
            authenticateUser();
        }
    }, []);

    const redirect = () => {
        router.push('/');
        cleanState();
    };

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
                onClick={() => redirect()}
                src="/logo.png"
                alt="logo"
                className="w-64 mb-8 md:mb-0 cursor-pointer"
            />

            <div>
                {user ? (
                    <div className="flex items-center">
                        <p className="mr-2">Welcome {user.name}</p>
                        <button
                            type="button"
                            className="bg-blue-800 px-5 py-3 rounded text-white font-bold uppercase mr-2"
                            onClick={logout}
                        >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-blue-800 px-5 py-3 rounded text-white font-bold uppercase mr-2">
                                Login
                            </a>
                        </Link>
                        <Link href="/createaccount">
                            <a className="bg-blue-600 px-5 py-3 rounded text-white font-bold uppercase">
                                Sign in
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
