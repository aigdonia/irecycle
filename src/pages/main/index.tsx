import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Flex, Grid, Icon, Metric, Tab, TabList, Color, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title, Callout } from "@tremor/react";
import Layout from '@/layout/inner-layout'
import { GiftIcon, TruckIcon, ExclamationCircleIcon, ArchiveBoxIcon, LifebuoyIcon } from '@heroicons/react/24/outline'
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MetricBox from "@/components/metric-box";
import RequestBagsModal from './request-bag-modal'
import User from "@/models/user.model";
import axios from "axios";
import dayjs from "dayjs";

interface PickupRequst {
	requestId: string,
	date: string,
	status: string,
	reward_points: string
}

const colors: { [key: string]: Color } = {
	scheduled: "blue",
	missed: "rose",
	completed: "emerald",
};

const shortenId = (passedId: String) => passedId.substring(8, -1)

export default function CustomerMainPage() {

	const { data } = useSession();
	const user = data?.user;
	const points = user?.points ?? 10;

	const [requests, setRequests] = useState<PickupRequst[]>([])
	const [upcomingPickup, setUpcomingPickup] = useState("")

	useEffect(() => {
		fetchPickups().then(r => {
			setRequests(r);
			const upcoming = r.find((i: any) => (i.status === "scheduled"))
			setUpcomingPickup(upcoming?.date ?? undefined)
		});
	}, [])

	return (
		<Layout>
			<main className="p-6 sm:p-10">
				<Title>Hi, {`${user?.name}`}</Title>
				<Text>Here is your Account Summary</Text>
				{(
					<Grid numColsLg={6} className="gap-6 mt-6">
						{/* Main section */}
						<Col numColSpanLg={4}>
							<Card className="h-full">

								<Flex>
									<Flex justifyContent="start" className="space-x-2">
										<Title>Pickups</Title>
										<Badge color="gray">{requests?.length ?? 0}</Badge>
									</Flex>
									{requests?.length > 0 && (<Button
										color="emerald"
										icon={TruckIcon}
										variant="secondary"
										size="xs"
										onClick={() => scheduleDummyPickup()}
									> Schedule Pickup! </Button>)}
								</Flex>
								{requests?.length > 0 ? (<>
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
											{requests && requests?.map((item) => (
												<TableRow key={item?.requestId}>
													<TableCell>{shortenId(item?.requestId)}</TableCell>
													<TableCell>{dayjs(item?.date).format('D MMMM YYYY')}</TableCell>
													<TableCell>
														<Badge color={colors[item?.status]} size="xs">
															{item?.status}
														</Badge>
													</TableCell>
													<TableCell className="text-right">{item?.reward_points}</TableCell>
													<TableCell>
														<Button size="xs" variant="secondary" color="gray" icon={LifebuoyIcon}>
															Help?
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</>) : (<>
									<Flex flexDirection="col" className="h-full" justifyContent="center">
										<Icon icon={ArchiveBoxIcon} size="xl" color="neutral" />
										<h1 className="text-4xl text-neutral-400 mb-2">Schedule Your First Pickup Now!</h1>
										<Button
											color="emerald"
											icon={TruckIcon}
											variant="secondary"
											onClick={() => scheduleDummyPickup()}
											className="my-12"
										> Schedule First Pickup! </Button>
									</Flex>
								</>)}

							</Card>

						</Col>

						{/* KPI sidebar */}
						<Col numColSpanLg={2}>
							<div className="space-y-6">

								<Card>

									<Flex justifyContent="start">
										<Icon icon={ExclamationCircleIcon} color="amber" size="xl" />
										<Flex>
											<Title color="amber"> Out Of Bags? </Title>
											<RequestBagsModal />
										</Flex>
									</Flex>
								</Card>

								<MetricBox
									label="Current Points"
									metric={points.toString()}
									icon={GiftIcon}
									color="green"
									links={[
										{ text: "Go Shopping", href: "/store" },
									]}
								/>

								{upcomingPickup && (<MetricBox
									label="Next Pickup"
									metric={dayjs(upcomingPickup).format("DD MMMM")}
									icon={TruckIcon}
									color="blue"
									links={[
										{ text: "Reschedule", href: "/store" },
										{ text: "All Pickups", href: "/store" },
									]}
								/>)}
							</div>
						</Col>
					</Grid>
				)}
			</main>
		</Layout>
	);
}

const fetchPickups = async () => {
	const { data: { requests } } = await axios.get('/api/pickup-request');
	// return undefined;
	return requests?.map((request: any) => ({
		requestId: request._id,
		date: request.scheduledDate,
		status: request.status,
		reward_points: request.rewardPoints
	}))
}

const scheduleDummyPickup = async () => {
	const res = await axios.post('/api/pickup-request', { date: "20/05/2023" })
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

	const { req, res } = ctx
	const session = await getServerSession(req, res, authOptions)

	console.log("here are some stuff you need to know")

	if (!session) {
		return { redirect: { destination: "/login", permenant: false } }
	}

	const currentUser = await User.findById(session?.user?.id);

	return {
		props: {
			session: {
				user: {
					name: session?.user?.name,
					email: session?.user?.email,
					points: session?.user?.points,
				}
			}
		}
	}
}