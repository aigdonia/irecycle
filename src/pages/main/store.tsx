import InnerPortalLayout from "@/layout/inner-layout";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Title, Text, Grid, List, ListItem, Icon } from "@tremor/react";
// import QRCode from 'react-qr-code'

const brands = [
	{
		name: "nike", display_name: "NIKE", display_image: "https://i.pinimg.com/originals/8e/b0/6f/8eb06fa14230208ce7468417dc8f22e3.jpg",
		vouchers: [
			{ amount: 100, display_text: "$10 Voucher", code: "NU64IR" },
			{ amount: 200, display_text: "$20 Voucher", code: "NU74IR" },
			{ amount: 300, display_text: "$30 Voucher", code: "NU84IR" }
		]
	},
	{
		name: "addidas", display_name: "Addidas", display_image: "",
		vouchers: [
			{ amount: 300, display_text: "$30 Voucher", code: "NU84IR" }
		]
	},
	{
		name: "reebok", display_name: "Reebok", display_image: "",
		vouchers: [
			{ amount: 100, display_text: "$10 Voucher", code: "NU64IR" },
			{ amount: 200, display_text: "$20 Voucher", code: "NU74IR" },
			{ amount: 300, display_text: "$30 Voucher", code: "NU84IR" },
			{ amount: 300, display_text: "$30 Voucher", code: "NU84IR" },
			{ amount: 300, display_text: "$30 Voucher", code: "NU84IR" }
		]
	},
]

export default function StorePage() {
	return (
		<InnerPortalLayout>
			<main className="p-6 sm:p-10">
				<Title>Store</Title>
				<Text>Redeem Your Points for Brands Vouchers</Text>

				<Grid numCols={1} numColsSm={2} numColsLg={2} className="mt-12 gap-3">
					{brands && brands.map(brand => (
						<>
							<div key={brand.name} className="card card-side bg-base-100 shadow-xl">
								{brand?.display_image && (<figure><img src={brand.display_image} alt="Movie" /></figure>)}
								<div className="card-body">
									<h2 className="card-title">{brand.display_name}</h2>
									<List className="mt-1">
										{brand.vouchers.map((v) => (
											<ListItem key={v.code}>
												<span> {v.display_text} </span>
												<span> {v.amount} Points </span>
												<Icon icon={QrCodeIcon} />
											</ListItem>
										))}
									</List>
								</div>
							</div>
						</>
					))}
				</Grid>
			</main>
		</InnerPortalLayout>
	)
}