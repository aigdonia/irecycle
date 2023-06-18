import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import PickupRequest from "@/models/pickupRequest.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	console.log(session)

	const method = req.method;
	

	if (method == "GET") {
		const requests = await getUserRequests(session?.user?.id ?? "")
		res.json({
			requests
		})
	} else if(method == 'POST') {
		await scheduleDummyPickups(session?.user?.id ?? "");
		res.json({ok: true})
	}
}

async function getUserRequests(user_id:string, limit=5) {
	return PickupRequest.find({customer: user_id}).limit(limit).sort({status: -1, scheduledDate: -1})
}

async function scheduleDummyPickups(user_id:string) {
	PickupRequest.insertMany([
		{customer:user_id, driver: "64750b658a73635b451b9e72", scheduledDate: new Date("2023-06-05"), status: "scheduled"},
		{customer:user_id, driver: "64750b658a73635b451b9e72", scheduledDate: new Date("2023-05-05"), status: "completed", rewardPoints: 100},
		{customer:user_id, driver: "64750b658a73635b451b9e72", scheduledDate: new Date("2023-04-05"), status: "completed", rewardPoints: 115},
		{customer:user_id, driver: "64750b658a73635b451b9e72", scheduledDate: new Date("2023-03-05"), status: "completed", rewardPoints: 100}
	])
}