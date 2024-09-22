import { Context } from 'koa'
import { getService } from '@strapi/plugin-users-permissions/server/utils';
import { validateUpdateUserBody } from '@strapi/plugin-users-permissions/server/controllers/validation/user';
import utils from '@strapi/utils';
import _ from 'lodash';
import { User } from 'shared-types';

interface RequestBody {
	request: {
		body: {
			email: string
		}
	}
}

const { sanitize } = utils;

const sanitizeOutput = (user: User, ctx: Context) => {
	const schema = strapi.getModel('plugin::users-permissions.user');
	const { auth } = ctx.state;

	return sanitize.contentAPI.output(user, schema, { auth });
};

export default async function(ctx: Context & RequestBody) {
	const advancedConfigs = await strapi
		.store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
		.get({});

	const { id } = ctx.state.user;
	const { email } = ctx.request.body;

	const user = await getService('user').fetch(id) as User;

	if (!user) {
		ctx.send(`User not found`);
	}

	await validateUpdateUserBody(ctx.request.body);

	if (_.has(ctx.request.body, 'email') && (advancedConfigs as any).unique_email) {
		const userWithSameEmail = await strapi
			.query('plugin::users-permissions.user')
			.findOne({ where: { email: email.toLowerCase() } });

		if (userWithSameEmail && userWithSameEmail.id != id) {
			ctx.send('Email already taken');
		}

		ctx.request.body.email = ctx.request.body.email.toLowerCase();
	}

	const updateData = {
		...ctx.request.body,
	};

	const data = await getService('user').edit(user.id, updateData) as User;
	const sanitizedData = await sanitizeOutput(data, ctx);

	ctx.send(sanitizedData);
}
