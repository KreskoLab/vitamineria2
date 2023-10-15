import { Context } from 'koa'

interface RequestBody {
	request: {
		body: {
			coupon: string;
		}
	},
}

export default async function(ctx: Context & RequestBody) {
	const bodyCoupon = ctx.request.body.coupon;

	const couponService = strapi.services['api::cuopon.cuopon']
	const { results } = await couponService.find(bodyCoupon);
	const coupon = results.find(item => item.name === bodyCoupon);

	if (coupon) {
		return coupon.discount;
	} else return 0
    
}
