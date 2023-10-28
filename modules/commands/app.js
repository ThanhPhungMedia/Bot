module.exports.config = {
  name: "app",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "Làm mới appstate.json",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5
}

module.exports.run = async function ({ api, event, args }) {
  const fs = global.nodemodule["fs-extra"];
  const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐚̂̀𝐧 𝐥𝐚̀𝐦 𝐦𝐨̛́𝐢 𝐚𝐩𝐩𝐬𝐭𝐚𝐭𝐞 𝐡𝐨̣̂ 𝐡𝐢𝐞̂́𝐮 đ𝐚̂𝐮", event.threadID, event.messageID);
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../${global.config.APPSTATEPATH}`, data, 'utf8', (err) => {
    if (err) {
      return api.sendMessage(`Error writing file: ${err}`, event.threadID);
    } else {
      return api.sendMessage(`Đ𝐚̃ 𝐥𝐚̀𝐦 𝐦𝐨̛́𝐢 ${global.config.APPSTATEPATH} 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠`, event.threadID);
    }
  });

}
