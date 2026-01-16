"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateState } from "arctic";

// Redirect to the GitHub App installation page.
const handleAppInstall = async () => {
	const state = generateState();
	const appName = process.env.GITHUB_APP_NAME;
	const baseUrl = process.env.BASE_URL
		? process.env.BASE_URL
		: process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: "";

	// Log for debugging
	console.log('GITHUB_APP_NAME:', appName);

	if (!appName) {
		throw new Error('GITHUB_APP_NAME environment variable is not set');
	}

	if (!baseUrl) {
		throw new Error('BASE_URL or VERCEL_PROJECT_PRODUCTION_URL is not set');
	}

	const redirectUri = `${baseUrl}/settings`;
	const url = `https://github.com/apps/${appName}/installations/new?state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

	console.log('Redirecting to:', url);

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return redirect(url);
};

export { handleAppInstall };
