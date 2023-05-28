import { getSession } from "next-auth/react";
import GlobalNavigation from "./global-navigation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

interface LayoutProps {
	children: any
}

const InnerPortalLayout = ({ children }: LayoutProps) => {
	return (
		<div className="bg-slate-50 h-screen">
			{/* Sidebar */}
			<header className="shadow">
				<GlobalNavigation />
			</header>
			{/* Main content */}
			<div className="">
				<main className="p-4">{children}</main>
			</div>
		</div>
	);
};

export default InnerPortalLayout;

export async function getServerSideProps({req}: GetServerSidePropsContext) {
	const session = await getSession({req})

	if(!session) {
		return { redirect: { destination: "/login"}}
	}

	return {
		props: { session }
	}
}