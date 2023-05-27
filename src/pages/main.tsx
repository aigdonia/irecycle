import { useState } from "react";
import { Badge, Button, Card, Col, Flex, Grid, Icon, Metric, Tab, TabList, Color, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import Layout from '../layout/inner-layout'
import { ArrowNarrowRightIcon, GiftIcon, ChevronDoubleRightIcon, TruckIcon } from '@heroicons/react/outline'

const colors: { [key: string]: Color } = {
	Scheduled: "blue",
	"Re Schedule": "blue",
	Missed: "rose",
	Completed: "emerald",
};

const transactions = [{
  "requestId": "41da495f9ea324bdddbd14f207c372fd",
  "date": "01/05/2023",
  "status": "Scheduled",
  "reward_points": 140
}, {
  "requestId": "65e5eba068f318d09310f918933b459d",
  "date": "04/04/2023",
  "status": "Completed",
  "reward_points": 300
}, {
  "requestId": "65e5eba068f318d09310f918933b459d",
  "date": "01/04/2023",
  "status": "Re Schedule",
  "reward_points": null
}, {
  "requestId": "aa5597699fa8f7892e7d2d6986a1ae4c",
  "date": "01/03/2023",
  "status": "Missed",
  "reward_points": null
}, {
  "requestId": "560d51f4a2ed85b85dcd7fceaa3896f2",
  "date": "01/02/2023",
  "status": "Completed",
  "reward_points": 100
}, {
  "requestId": "1ad3cd2ed63c388e48c5f7ce1c69df2e",
  "date": "01/01/2023",
  "status": "Completed",
  "reward_points": 30
}];

const shortenId = (passedId:String) => passedId.substring(8,-1)

export default function KpiCardGrid() {
	return (
		<Layout>
			<main className="p-6 sm:p-10">
				<Title>Hi, Omar</Title>
				<Text>Here is your Account Summary</Text>

				{(
					<Grid numColsLg={6} className="gap-6 mt-6">
						{/* Main section */}
						<Col numColSpanLg={4}>
							<Card className="h-full">

									<Flex justifyContent="start" className="space-x-2">
										<Title>Pickups</Title>
										<Badge color="gray">{transactions.length}</Badge>
									</Flex>
									<Text className="mt-2">Here your recent pickups</Text>

									<Table className="mt-6">
										<TableHead>
											<TableRow>
												<TableHeaderCell>Request ID</TableHeaderCell>
												<TableHeaderCell>Date</TableHeaderCell>
												<TableHeaderCell>Status</TableHeaderCell>
												<TableHeaderCell className="text-right">Reward</TableHeaderCell>
												<TableHeaderCell>Support</TableHeaderCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{transactions.map((item) => (
												<TableRow key={item.requestId}>
													<TableCell>{ shortenId(item.requestId) }</TableCell>
													<TableCell>{item.date}</TableCell>
													<TableCell>
														<Badge color={colors[item.status]} size="xs">
															{item.status}
														</Badge>
													</TableCell>
													<TableCell className="text-right">{item.reward_points}</TableCell>
													<TableCell>
														<Button size="xs" variant="secondary" color="gray">
															Problem?
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Card>

						</Col>

						{/* KPI sidebar */}
						<Col numColSpanLg={2}>
							<div className="space-y-6">
								<Card decoration="top" decorationColor="green">
									<Flex justifyContent="start" className="space-x-4">
										<Icon
											icon={GiftIcon}
											variant="light"
											size="xl"
											color="green"
										/>
										<div className="truncate">
											<Text> Points </Text>
											<Metric className="truncate">200</Metric>
										</div>
									</Flex>
									<Flex className="mt-4 pt-2 border-t border-slate-200" justifyContent="center">
										<Button
											size="xs"
											variant="light"
											icon={ChevronDoubleRightIcon}
											iconPosition="right"
										>
											Go Shopping
										</Button>
									</Flex>
								</Card>
								<Card decoration="top" decorationColor="blue">
									<Flex justifyContent="start" className="space-x-4">
										<Icon
											icon={TruckIcon}
											variant="light"
											size="xl"
											color="blue"
										/>
										<div className="truncate">
											<Text>Next Pickup</Text>
											<Metric className="truncate">21<sup>st</sup> June</Metric>
										</div>
									</Flex>
									<Flex className="mt-4 pt-2 border-t border-slate-200" >
										<Button
											size="xs"
											variant="light"
											icon={ChevronDoubleRightIcon}
											iconPosition="right"
										>
											Reschedule
										</Button>

										<Button
											size="xs"
											variant="light"
											icon={ChevronDoubleRightIcon}
											iconPosition="right"
										>
											All Pickups
										</Button>
									</Flex>
								</Card>
							</div>
						</Col>
					</Grid>
				)}
			</main>
		</Layout>
	);
}