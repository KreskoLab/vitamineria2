import { Telegram } from 'telegraf';

const bot = new Telegram(process.env.TELEGRAM_KEY);

export async function notification(): Promise<void> {
	await bot.sendMessage(process.env.CHAT_ID, 'Нове замовлення!')
}
