import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Card, Flex, Icon, Metric, Button, Text } from "@tremor/react";


interface MetricLink {
	text: string,
	href: string,
}

interface MetricBoxProps {
	color?: "neutral" | "slate" | "gray" | "zinc" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | undefined,
	label: string,
	metric: string,
	icon?: React.ElementType<any>,
	links?: MetricLink[]
}

function MetricCardLinks({ links }: { links: MetricLink[] }) {

	const linksJustification = (num: number) : "center" | "between" => num==1 ? 'center' : 'between'
	return (
		<>
			{links?.length > 0 &&
				(<Flex
					className="mt-4 pt-2 border-t border-slate-200"
					justifyContent={linksJustification(links?.length)}
				>
					{links?.slice(0, 2).map(link => (<Button
						key={link.text}
						size="xs"
						variant="light"
						icon={ChevronDoubleRightIcon}
						iconPosition="right"
					>
						{link.text}
					</Button>))}
				</Flex >)
			}
		</>
	)
}

export default function MetricBox({ label, metric, icon, color = 'neutral', links=[] }: MetricBoxProps) {
	return (
		<Card decoration="top" decorationColor={color}>
			<Flex justifyContent="start" className="space-x-4">
				{icon && <Icon
					icon={icon}
					variant="light"
					size="xl"
					color={color}
				/>}
				<div className="truncate">
					<Text>{label}</Text>
					<Metric className="truncate">{metric}</Metric>
				</div>
			</Flex>
			<MetricCardLinks links={links} />
		</Card >
	)
}