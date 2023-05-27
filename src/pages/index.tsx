import React from "react";
import Link from 'next/link'
import Image from 'next/image'

const LandingPage = () => {
	return (
		<div className="bg-white min-h-screen flex-col items-center justify-between p-24">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<Image
						className="text-center mx-auto pb-6"
						src='/irecycle-logo.png'
						alt="Logo"
						width={92}
						height={92}
					/>
					<h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Recycle with ease and save the planet
					</h1>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						iRecycle makes recycling easy, fun and rewarding. Join us in our mission to save the planet, and win prizes from your favorite store
					</p>
				</div>

				<div className="mt-10">
					<div className="flex justify-center">
						<Link
							href="/signup"
							className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
						>
							Sign up for free
						</Link>
						<Link
							href="/login"
							className="ml-4 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
