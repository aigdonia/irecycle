// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/mongose"
import User from "../../models/user.model"
import bcrypt from "bcrypt";

interface ResponseData {
  error?: string;
  msg?: string;
	user?: any
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  email: string,
  password: string,
	firstname: string,
	lastname: string
) => {
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

	if(!firstname.length || ! lastname.length) {
		return { error: "First or Last Name missing" };
	}

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  // get and validate body variables
  const { email, password, firstname, lastname } = req.body;

  const errorMessage = await validateForm(email, password, firstname, lastname);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

	const userCreationData = {
		email,
    password: hashedPassword,
		firstName: firstname, 
		lastName: lastname
	}

	try {
  const savedUser = await User.create(userCreationData)

	return res.status(200).json({
		msg: "Successfuly created new User: ",
		user: savedUser.getPublicAttributes()
	})
	} catch (error) {
		res.status(400).json({ error: "Error on '/api/register': " + error })
	}
}