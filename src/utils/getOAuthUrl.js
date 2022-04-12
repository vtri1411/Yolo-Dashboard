const getGoogleOAuthUrl = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

	const options = {
		client_id:
			'1082897750063-htja233etc5m6lvaq3fq6sk9c38oeqas.apps.googleusercontent.com',
		redirect_uri:
			process.env.NODE_ENV === 'production'
				? 'https://yolo-shop.up.railway.app/oauth/google'
				: 'http://localhost:3000/oauth/google',
		response_type: 'token',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
		prompt: 'consent',
	}

	const qs = new URLSearchParams(options)
	return `${rootUrl}?${qs.toString()}`
}

export const googleOAuthUrl = getGoogleOAuthUrl()
