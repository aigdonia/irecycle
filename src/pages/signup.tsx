import React, { useState } from "react";
import Image from 'next/image'
import { Field, Formik, Form } from "formik";
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import axios from "axios";

const SignupPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");

	const loginInitialValues = {
		email,
		password,
		firstname,
		lastname
	}

	const redirectHome = () => {
		const { pathname } = Router;
		if (pathname === '/signup') Router.push('/main')
	}

	const loginUser = async (email: string, password: string) => {
		const res: any = await signIn("credentials", {
			email, password,
			redirect: false,
			callbackUrl: window.location.origin
		})
	}

	const registerUser = async (email: string, password: string, firstname: string, lastname: string) => {

		try {
			const res = await axios.post('/api/register', {
				email, password, firstname, lastname
			}, {
				headers: {
					Accept: "application/json",
					"Conent-Type": "application/json "
				}
			})

				await loginUser(email, password)
				redirectHome();

		} catch (error) {
			console.error(error)
		}

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
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register Free Account</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

					<Formik
						initialValues={loginInitialValues}
						validateOnBlur={false}
						validateOnChange={false}
						onSubmit={({ email, password, firstname, lastname }) => {
							registerUser(email, password, firstname, lastname)
						}}
					>
						{(props) => (
							<Form>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2 mb-1"> Email </label>
								<Field name="email" placeholder="Email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
								</Field>

								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4 mb-1"> Password </label>
								<Field name="password" type="password" placeholder="Password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

								<label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mt-4 mb-1"> First Name </label>
								<Field name="firstname" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

								<label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mt-4 mb-1"> Last Name </label>
								<Field name="lastname" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

								<div>
									<button
										type="submit"
										className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Register !
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
