import React from "react";
import { FaTruck, FaClock, FaCoins } from "react-icons/fa";

const StagePage = () => {
	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto mb-10">
					<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
						Welcome back,
					</h2>
					<h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Omar Ehab
					</h1>
					<div className="flex items-center mt-2">
						<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-2">
							Active Member
						</span>
						<span className="text-gray-600 text-sm font-medium">
							Reward Points: 200
						</span>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

					<div className="bg-white rounded-lg shadow-md px-6 py-8">
						<div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white">
							<FaClock className="h-8 w-8" />
						</div>
						<h2 className="mt-6 text-lg font-medium text-gray-900">Schedule Waste Collection</h2>
						<p className="mt-2 text-sm text-gray-500">
							Schedule a new delivery of your recycled items.
						</p>
						<div className="mt-6">
							<a
								href="#"
								className="text-base font-medium text-indigo-600 hover:text-indigo-500"
							>
								Schedule Collection
							</a>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-md px-6 py-8">
						<div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-800 text-white">
							<FaCoins className="h-8 w-8" />
						</div>
						<h2 className="mt-6 text-lg font-medium text-gray-900">Points</h2>
						<p className="mt-2 text-sm text-gray-500">
							Track your earned reward points and redeem from favorite stores.
						</p>
						<div className="mt-6">
							<a
								href="#"
								className="text-base font-medium text-indigo-600 hover:text-indigo-500"
							>
								View Stores
							</a>
						</div>
					</div>

				</div>

				<div className="mt-8">
					<h3 className="text-indigo-600 font-bold">Collections</h3>
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Request Number
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Status
									</th>
									<th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Details</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#0001</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 22, 2023</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
											Scheduled
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<a href="#" className="text-indigo-600 hover:text-indigo-900">
											Details
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StagePage;

