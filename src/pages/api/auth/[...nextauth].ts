import NextAuth, { AuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '../../../utils/mongose'
import User from '../../../models/user.model'
import { compare } from 'bcryptjs' 

export const authOptions: AuthOptions = {

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
		async jwt(params: any) {
			const {token, user} = params;
			if(token && user) {
				token.points = user.points;
			}

      return token
    },
		session( {session, token}){

			if(token && session.user) {
				session.user.points = token.points
				session.user.id = token.sub ?? "";
			}

			return session
		}
	}
}
export default NextAuth(authOptions)