import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongoClient from '../../../utils/mongo-db'
import dbConnect from '../../../utils/mongose'
import User from '../../../models/user.model'
import { compare } from 'bcrypt' 

export const authOptions = {
	// adapter: MongoDBAdapter(mongoClient),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "Your Email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				await dbConnect();

				const user = await User.findOne({
					email: credentials?.email,
				});
				if (!user) {
					throw new Error("Email is not registered");
				}
				const isPasswordCorrect = compare(credentials!.password, user.password)
				if (!isPasswordCorrect) {
					throw new Error("Password is incorrect");
				}

				const persistedUser = {
					id: user._id,
					email: user.email,
					name: `${user.firstName} ${user.lastName}`,
					points: user.points
				}

				return persistedUser;
			}
		})
	],
	callbacks: {
		async session( {session, token}){
			return {
				user: {
					id: token.sub,
					...session.user,
				}
			}
		},
		async jwt(params) {
			const {token, user} = params;
      return token
    }
	}
}
export default NextAuth(authOptions)