import React, { useState, useContext } from 'react';
import axiosClient from '../../config/axios';
import appContext from '../../context/app/appContext';

import Layout from '../../components/Layout';
import Alert from '../../components/Alert';

export async function getServerSideProps({ params }) {
    const { link } = params;
    const res = await axiosClient.get(`/api/links/${link}`);
    //console.log(res.data)

    return {
        props: {
            link: res.data,
        },
    };
}

export async function getServerSidePaths() {
    const links = await axiosClient.get('/api/links');
    return {
        paths: links.data.links.map((link) => ({
            params: { link: link.url },
        })),
        fallback: false,
    };
}

const Link = ({ link }) => {
    const [isPassword, setIsPassword] = useState(link.password);
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(link.file);
    //console.log(isPassword);

    const contextApp = useContext(appContext);
    const { messageFile, showAlert } = contextApp;

    const verifyPassword = async (e) => {
        e.preventDefault();

        if (!password) {
            return;
        }

        const res = await axiosClient.post(`/api/links/${link.link}`, {
            password,
        });

        const { match, file } = res.data;

        if (match) {
            setFile(file);
            setIsPassword(false);
        } else {
            showAlert("The password doesn't match");
        }
    };

    return (
        <Layout>
            {isPassword ? (
                <>
                    <p className="text-center text-lg">
                        This link is protected by a password.
                    </p>
                    {messageFile && <Alert />}
                    <div className="flex justify-center mt-10 ">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={(e) => verifyPassword(e)}
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <input
                                        type="submit"
                                        value="Validate"
                                        className="bg-blue-800 w-full p-3 hover:bg-blue-600 rounded text-white font-bold uppercase"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl text-center text-gray-700">
                        Download your file
                    </h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            className="bg-blue-600 text-center px-10 py-3 text-white rounded uppercase font-bold hover:bg-blue-500"
                            href={`${process.env.backendURL}/api/files/${file}`}
                        >
                            Here
                        </a>
                    </div>
                </>
            )}
        </Layout>
    );
};
export default Link;
