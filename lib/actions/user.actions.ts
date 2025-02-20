"use server";
import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

//sign in the user with credentials

export async function signInWithCredentials(
	prevState: unknown,
	formData: FormData
  
) {
	try {
		const user = signInFormSchema.parse({
			email: formData.get("email"),
			password: formData.get("password"),
		});
		await signIn("credentials", user);
		return { success: true, message: "Signed in successfully" };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: "Invalid email or password" };
	}
}
//sign user out
export async function signOutUser() {
	await signOut();
}

//sign up user
export async function signUpUser(prevState: unknown, formdata: FormData) {
	try {
		const user = signUpFormSchema.parse({
			name: formdata.get("name"),
			email: formdata.get("email"),
			password: formdata.get("password"),
			confirmPassword: formdata.get("confirmPassword"),
		});
		user.password = hashSync(user.password, 10);
		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		});
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: "User was not" };
	}
}
