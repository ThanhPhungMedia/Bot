module.exports.config = {
	name: "off",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Des Bủh - Dựa trên demo của manhIT", /* vui lòng k sửa credit :) */
	description: "Tắt Bot",
	commandCategory: "Tiện ích",
	cooldowns: 0
        };
        
module.exports.run = async({event, api}) =>{

   const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲!", event.threadID, event.messageID);

api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »𝗕𝘆𝗲! 𝗵𝗲̣𝗻 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 𝗰𝗮́𝗰 𝗯𝗮̣𝗻",event.threadID, () =>process.exit(0))}