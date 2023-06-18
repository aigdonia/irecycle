import React, { useState } from "react";
import Image from 'next/image'
import { Field, Formik, Form } from "formik";
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import axios from "axios";
import Link from "next/link";

const LoginPage = () => {
	const loginInitialValues = {
		email: "aigdonia@gmail.com",
		password: "123456"
	}

	const doRedirct = (path: string) => {
		const { pathname } = Router;
		if (pathname === '/login') Router.push(path)
	}

	const loginUser = async (email: string, password: string) => {
		const res: any = await signIn("credentials", {
			email, password,
			redirect: false,
			callbackUrl: `${window.location.origin}/main`
		})

		res.error ? console.error(res.error) : doRedirct(res.url);
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image
					className="text-center mx-auto pb-6"
					src='/irecycle-logo.png'
					alt="Logo"
					width={196}
					height={196}
				/>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

					<Formik
						initialValues={loginInitialValues}
						validateOnBlur={false}
						validateOnChange={false}
						onSubmit={({ email, password }) => {
							loginUser(email, password)
						}}
					>
						{(props) => (
							<Form>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2"> Email </label>
								<Field type="email" name="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4 mb-2"> Password </label>
								<Field type="password" name="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

								<div>
									<button
										type="submit"
										className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Sign in
									</button>
								</div>
							</Form>
						)}
					</Formik>
					<div className="text-center mt-2 pt-1">
						<span>Not a user? <Link href="/signup" className="text-green-500">Signup Now</Link></span>
					</div>
				</div>
			</div>
		</div >
	);
};

export default LoginPage;
