module.exports.config = {
  name: "bot",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Lmao tủn tủn",
  description: "nhắc bot cái ầu uồi:)))",
  commandCategory: "Bổ não",
  usages: "[trống]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ api, event, Users }) => {
  const cc = [
    "𝗬𝗲̂𝘂 𝗹𝗮̀ 𝗽𝗵𝗮̉𝗶 𝗻𝗼́𝗶 𝗰𝘂̃𝗻𝗴 𝗻𝗵𝘂̛ đ𝗼́𝗶 𝗹𝗮̀ 𝗽𝗵𝗮̉𝗶 𝗮̆𝗻<3", 
    "𝗞𝗲̂𝘂 𝘁𝘂𝗶 𝗰𝗼́ 𝗰𝗵𝘂𝘆𝗲̣̂𝗻 𝗴𝗶̀ 𝘃𝗮̣̂𝘆 𝗵𝗲𝗹𝗽 𝗺𝗲𝗻𝘂 đ𝗲̂̉ 𝘅𝗲𝗺 𝗹𝗲̣̂𝗻𝗵 <3", 
    "𝗡𝗼́𝗶 𝗹𝗶𝗲̂𝗻 𝘁𝘂̣𝗰 ", 
    "𝗧𝗵𝗮̣̂𝘁 𝗱𝗼̂ 𝗻𝗴𝗵𝗶̃𝗮><", 
    "𝗚𝗼̣𝗶 𝗻𝘂̛̃𝗮 𝘁𝘂𝗶 𝗯𝗮𝗻𝗱 đ𝗼́ 𝗻𝗵𝗮><",
    "𝗗𝗼𝗻𝗮𝘁𝗲 𝗰𝗵𝗼 𝗮𝗻𝗵 𝗵𝗶𝗲̂́𝘂 𝟱𝗸 𝗺𝘂𝗮 𝗺𝗶̀ đ𝗶🥺",
    "𝗕𝗮̣𝗻 𝗰𝗼́ 𝗯𝗶𝗲̂́𝘁 𝗮𝗱𝗺𝗶𝗻 𝗵𝗶𝗲̂́𝘂 𝗿𝗮̂́𝘁 đ𝗲̣𝗽 𝘁𝗿𝗮𝗶=))"
  ];
  let name = await Users.getNameUser(event.senderID)
  if (event.body.toLowerCase() == "bot"){ 
    return api.sendMessage(
      name + ` ${cc[Math.floor(Math.random() * cc.length)]}`
      , event.threadID, event.messageID)
  }
  
}

module.exports.run = async ({ api, event, Users }) => {
  let name = await Users.getNameUser(event.senderID)
  return api.sendMessage(name + ' 𝑲𝒉𝒐̂𝒏𝒈 𝒄𝒂̂̀𝒏 𝒅𝒂̂́𝒖 𝒍𝒆̣̂𝒏𝒉 đ𝒂̂𝒖 𝒃𝒂̣𝒏 𝒏𝒈𝒖 𝒗𝒖̛̀𝒂 𝒕𝒉𝒐̂𝒊', event.threadID, event.messageID)
}
