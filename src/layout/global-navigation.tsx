import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Dropdown, DropdownItem, Icon } from "@tremor/react";
import { signOut } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/24/outline';

interface NavLink {
  name: string;
  href: string;
  current: boolean;
}

interface NavigationLinks {
  [key: string]: NavLink[];
}

interface SidebarProps {
  activeSection: string;
  sidebarLinks: NavigationLinks;
}

const navigation: NavigationLinks = {
	app_user: [
		{ name: 'Home', href: '/main', current: false },
		{ name: 'Stores', href: '/store', current: false },
	],
	driver: [
		{ name: 'Dashboard', href: '/driver/home', current: false },
	],
	warehouse: [
		{ name: 'Dispatch', href: '/warehouse/dispatch', current: false },
		{ name: 'Collection', href: '/warehouse', current: false },
	]
}

const personas = Object.keys(navigation);

function classNames(...classes: String[]) {
	return classes.filter(Boolean).join(' ')
}

export default function GlobalLayout() {
	const [persona, setPersona] = useState('app_user')

	const handleSignOut = async () => {
		await signOut();
	}
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation[persona].map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								>
									<span className="sr-only">View notifications</span>
									<Icon icon={UserIcon} />
								</button>

								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<Dropdown
										className="mt-2"
										onValueChange={(value) => setPersona(value)}
										placeholder="Pick User Type"
									>
										{personas.map(p => (<DropdownItem key={p} value={p} text={p} />))}
									</Dropdown>
								</div>

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="sr-only">Open user menu</span>
											<Icon icon={UserIcon} />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
													>
														Your Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
													>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												<a
													href="#"
													onClick={handleSignOut}
													className='block px-4 py-2 text-sm text-gray-700'
												>
													Sign out
												</a>
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>

							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation[persona].map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
