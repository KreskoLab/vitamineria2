export default ({ env }) => ({
	auth: {
		secret: env('ADMIN_JWT_SECRET', 'ca929e11c187475d65f1f6838a51dc31'),
	},
});
