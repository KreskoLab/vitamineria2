import myOrders from './order/my-orders';
import myOrder from './order/my-order';
import createOrder from './order/create-order';
import updateMe from './user/update-me';
import sitemapRoutes from './sitemap-routes';

export default (plugin) => {
	plugin.controllers.user['myOrders'] = myOrders
	plugin.controllers.user['myOrder'] = myOrder
	plugin.controllers.user['createOrder'] = createOrder
	plugin.controllers.user['updateMe'] = updateMe
	plugin.controllers.user['sitemapRoutes'] = sitemapRoutes

	plugin.routes['content-api'].routes.push(
		{
			method: 'PUT',
			path: '/me',
			handler: 'user.updateMe',
			config: {
				policies: [],
				prefix: '',
			}
		},
		{
			method: 'PUT',
			path: '/me/order',
			handler: 'user.createOrder',
			config: {
				policies: [],
				prefix: '',
			}
		},
		{
			method: 'GET',
			path: '/me/order',
			handler: 'user.myOrder',
			config: {
				policies: [],
				prefix: '',
			}
		},
		{
			method: 'GET',
			path: '/me/orders',
			handler: 'user.myOrders',
			config: {
				policies: [],
				prefix: '',
			}
		},
		{
			method: 'GET',
			path: '/sitemap',
			handler: 'user.sitemapRoutes',
			config: {
				policies: [],
				prefix: '',
			}
		},
	);

	return plugin;
}
