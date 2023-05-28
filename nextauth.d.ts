import { DefaultSession, DefaultUser, Session } from "next-auth";

export enum Role {
	user = "user",
	driver = "driver",
	warehouse = "warehouse"
}

interface IUser extends DefaultUser {
	points?: number;
	role?: Role;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}