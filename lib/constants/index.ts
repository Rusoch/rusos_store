export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? `Rusos Store`;
export const APP_DESCRIPTION =
	process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
	`A modern e commerce site built with next.js`;
export const APP_SERVER_URL =
	process.env.NEXT_PUBLIC_APP_SERVER_URL ?? `http://localhost:3000`;

	export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

	export const signInDefaultValues = {
		email: '',
		password: ''
	};

	export const signUpDefaultValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	}
