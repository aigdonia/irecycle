import GlobalNavigation from "./global-navigation";

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
