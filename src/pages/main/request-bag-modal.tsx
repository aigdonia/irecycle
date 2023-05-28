import { TrashIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Grid, Title, Flex, Icon, Button } from "@tremor/react";
import { useState } from "react";

interface CategoryToggleBoxProps {
	category: string,
	isToggled: boolean,
	handleClick: (v: any) => {},
	color?: string,
	colorAccent?: string,
	children: JSX.Element
}

interface IWasteCategory {
	name?: string,
	displayName?: string,
	color?: "neutral" | "slate" | "gray" | "zinc" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | undefined,
	accent?: string
}

function CategoryToggleBox({ category, isToggled, handleClick, color = "slate", colorAccent = "100", children }: CategoryToggleBoxProps) {
	const boxColorStyle = (color: string): string => (`bg-${color}-${colorAccent} border-${color}-400`)
	return (
		<div
			className={`cursor-pointer rounded-lg border border-solid  ${isToggled ? boxColorStyle(color) : ""} p-4`}
			onClick={() => handleClick(category)}
		>
			{children}
		</div>);
}

export default function ModalRequestBags() {

	const defaultSelectedCategories = ["organic"]

	const [checkedValues, setCheckedValues] = useState(defaultSelectedCategories);
	const [modalStatus, setModalStatus] = useState(false)

	function openModal() {
		setModalStatus(true);
	}

	function handleOrderBags() {
		setTimeout(() => {
			setModalStatus(false)
			setCheckedValues(defaultSelectedCategories);
		}, 300)

	}

	const handleCategoryToggle = (value: string) => {
		if (checkedValues.includes(value)) {
			setCheckedValues(checkedValues.filter((item) => item !== value));
		} else {
			setCheckedValues([...checkedValues, value]);
		}
	};

	const isToggled = (value: string) => {
		return checkedValues.includes(value);
	};

	const wasteCategories: IWasteCategory[] = [
		{ name: "paper", displayName: "Paper", color: "blue" },
		{ name: "organic", displayName: "Organic", color: "stone" },
		{ name: "glass", displayName: "Glass", color: "green" },
		{ name: "metal", displayName: "Metal", color: "orange" },
		{ name: "plastic", displayName: "Plastic", color: "yellow" },
		{ name: "ewaste", displayName: "E-Waste", color: "rose" },
	]

	return (
		<>
			<Button 
				onClick={() => openModal()}
				size="xs"
				icon={ShoppingBagIcon}
				color="amber"
				variant="secondary"
			>Get Bags!</Button>

			<input type="checkbox" id="order-bags" className="modal-toggle"
				checked={modalStatus}
				onChange={(e) => {
					setModalStatus(!modalStatus)
					e.target.checked = !modalStatus;
					e.preventDefault();
				}}
			/>
			<div className={`modal`}>

				<div className="modal-box">

					{/* <ul className="steps">
						<li className="step step-success">Pick Categories</li>
						<li className="step step-success">Delivery Address</li>
						<li className="step">Confirm</li>
					</ul> */}

					<div>
						<h3 className="font-bold text-lg">Pick Your Waste Bags Categories {checkedValues.length}</h3>

						<div className="p-4 space-y-2">
							<Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
								{wasteCategories.map(c => (
									<CategoryToggleBox
										key={c.name}
										color={c.color}
										category={c?.name ?? ""}
										isToggled={isToggled(c?.name ?? "")}
										handleClick={async (name) => handleCategoryToggle(name)}
										colorAccent={c?.accent ? c.accent : undefined}
									>
										<Flex flexDirection="col" justifyContent="center" alignItems="center">
											<Icon icon={TrashIcon} size="xl" variant="light" color={c.color}></Icon>
											<Title>{c.displayName}</Title>
										</Flex>
									</CategoryToggleBox>))}
							</Grid>
						</div>
					</div>

					<div className="modal-action">
						{/* <button className="btn" onClick={() => handleOrderBags()}>Order Bags</button> */}
						<Button
							onClick={() => handleOrderBags()}
							color="neutral"
							size="xs"
							icon={ShoppingBagIcon}
						>
							Order Bags
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}