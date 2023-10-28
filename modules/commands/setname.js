module.exports.config = {
	name: "setname",
	version: "1.1.0",
	hasPermssion: 0,
	credits: "TrúcCute",
	description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag",
	commandCategory: "Bổ não",
	usages: "[trống/tag/reply] + [name]",
	cooldowns: 5
}

module.exports.run = async ({ api, event, args, Users }) => {
  let { threadID, messageReply, senderID, mentions, type } = event;
  const delayUnsend = 60;// tính theo giây
	if (type == "message_reply") {
    let name2 = await Users.getNameUser(messageReply.senderID)
    const name = args.join(" ")
    return api.changeNickname(`${name}`, threadID, messageReply.senderID),
      api.sendMessage(`[𝐓𝐇𝐎̂𝐍𝐆 𝐁𝐀́𝐎] »Đ𝐚̃ đ𝐨̂̉𝐢 𝐭𝐞̂𝐧 𝐜𝐮̉𝐚 ${name2} 𝐓𝐡𝐚̀𝐧𝐡 ${name || "𝐓𝐞̂𝐧 𝐠𝐨̂́𝐜"}`, threadID, (err, info) =>
	setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnsend * 1000))
  }
  else {
	const mention = Object.keys(mentions)[0];
	const name2 = await Users.getNameUser(mention || senderID)
    if (args.join().indexOf('@') !== -1 ) {
      const name = args.join(' ')
      return api.changeNickname(`${name.replace(mentions[mention],"")}`, threadID, mention),
        api.sendMessage(`[𝐓𝐇𝐎̂𝐍𝐆 𝐁𝐀́𝐎] »Đ𝐚̃ đ𝐨̂̉𝐢 𝐭𝐞̂𝐧 𝐜𝐮̉𝐚 ${name2} 𝐓𝐡𝐚̀𝐧𝐡 ${name.replace(mentions[mention],"") || "𝐓𝐞̂𝐧 𝐠𝐨̂́𝐜"}`, threadID, (err, info) =>
          setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
      } else {
    const name = args.join(" ")
      return api.changeNickname(`${name}`, threadID, senderID),
        api.sendMessage(`[𝐓𝐇𝐎̂𝐍𝐆 𝐁𝐀́𝐎] »Đ𝐚̃ đ𝐨̂̉𝐢 𝐭𝐞̂𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐭𝐡𝐚̀𝐧𝐡 ${name || "𝐓𝐞̂𝐧 𝐠𝐨̂́𝐜"}`, threadID, (err, info) =>
          setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
      }
    }
  }
