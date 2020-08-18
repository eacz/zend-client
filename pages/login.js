import React, { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '../types';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Alert from '../components/Alert';

const Login = () => {
    const contextAuth = useContext(authContext);
    const { message, auth, login } = contextAuth;

    const router = useRouter();

    useEffect(() => {
        if (auth) {
            router.push('/');
        }
    }, [auth]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('The email is invalid')
                .required('The email is required'),
            password: Yup.string().required('The password is required'),
        }),
        onSubmit: (values) => {
            login(values);
        },
    });
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans text-gray-800 text-center my-4">
                    Login
                </h2>
                {message && <Alert />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-black text-sm font-bold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-600 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}

                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-black text-sm font-bold mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-600 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                            <input
                                type="submit"
                                value="Login"
                                className="bg-blue-800 w-full p-3 hover:bg-blue-600 rounded text-white font-bold uppercase"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
