export default ({ env }) => ({
	upload: {
		config: {
			provider: 'cloudinary',
			providerOptions: {
				cloud_name: env('CLOUDINARY_NAME'),
				api_key: env('CLOUDINARY_KEY'),
				api_secret: env('CLOUDINARY_SECRET'),
			},
			actionOptions: {
				upload: {},
				delete: {},
			},
		},
	},
	
	'import-export-entries': {
		enabled: true,
		config: {
			serverPublicHostname: env('ADMIN_URL'),
		},
	},

	email: {
		config: {
			provider: 'sendgrid',
			providerOptions: {
				apiKey: env('SENDGRID_API_KEY'),
			},
			settings: {
				defaultFrom: env('EMAIL_FROM'),
				defaultReplyTo: env('EMAIL_FROM'),
			},
		},
	},

	graphql: {
		config: {
			endpoint: '/graphql',
			shadowCRUD: true,
			playgroundAlways: false,
			depthLimit: 7,
			amountLimit: 200,
			apolloServer: {
				tracing: false,
			},
		},
	},
});
