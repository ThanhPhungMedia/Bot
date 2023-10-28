const fs = require("fs");
module.exports.config = {
name: "adbot",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "nnl",
	description: "adm",
	commandCategory: "Không cần dấu lệnh",
	usages: "Prefix",
	cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"", 
    "axios":""
  }
};
module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.body.indexOf("hiếu đâu")==0 || 
event.body.indexOf("jkay")==0 ||
event.body.indexOf("Jkay")==0 ||
event.body.indexOf("ad")==0 ||
event.body.indexOf("Ad")==0 ||
event.body.indexOf("JKAY")==0) {
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/2GxUtFH.jpg",
  ];
  var callback = () => api.sendMessage({body:`🧧𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐚𝐝𝐦𝐢𝐧🧧 \n😍𝐀𝐃𝐌𝐈𝐍 𝐍𝐀𝐌𝐄😍:𝙏𝙧𝙖̂̀𝙣 𝙏𝙝𝙖𝙣𝙝 𝙋𝙝𝙪̣𝙣𝙜\n🥺𝐁𝐢𝐞̣̂𝐭 𝐝𝐚𝐧𝐡🥺:𝙍𝙮𝙤  🍒\n🔯𝐂𝐮𝐧𝐠 𝐡𝐨𝐚̀𝐧𝐠 đ𝐚̣𝐨🔯:𝐊𝐡𝐨̂𝐧𝐠 𝐧𝐡𝐨̛́\n🤷𝐓𝐢́𝐧𝐡 𝐜𝐚́𝐜𝐡🤷:𝐂𝐨̣𝐜 𝐭𝐢́𝐧𝐡 𝐧𝐡𝐮̛𝐧𝐠 𝐝𝐞̂̃ 𝐠𝐚̂̀𝐧\n🤗𝐂𝐡𝐢𝐞̂̀𝐮 𝐜𝐚𝐨 🤗:𝟏𝐦𝟕𝟐\n🔰𝐂𝐚̂𝐧 𝐧𝐚̣̆𝐧𝐠🔰:𝙭𝙭\n🧐𝐒𝐢𝐧𝐡 𝐧𝐠𝐚̀𝐲🧐:𝙭𝙭/𝙭𝙭/𝙭𝙭𝙭𝙭\nꕥ𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 ꕥ:....\n♆𝐓𝐢𝐤𝐭𝐨𝐤♆: ....\n🍀𝐋𝐈𝐍𝐊 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 https://www.facebook.com/RyO2K0/\n🍃𝐈𝐃 𝐅𝐀𝐂𝐄🍃:...\n𝐂𝐡𝐚̀𝐨 đ𝐚̂𝐲 𝐥𝐚̀ 𝐛𝐨𝐭 𝐜𝐮̉𝐚 𝙏𝙧𝙖̂̀𝙣 𝙏𝙝𝙖𝙣𝙝 𝙋𝙝𝙪̣𝙣𝙜 𝐜𝐨́ 𝐦𝐨̣̂𝐭 𝐬𝐨̂́ 𝐥𝐮̛𝐮 𝐲́ 𝐬𝐚𝐮\n🎉𝐒𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐡𝐮̛̉𝐢 𝐛𝐨𝐭 𝐯𝐢̀ 𝐧𝐨́ 𝐜𝐮𝐭𝐞𝐞𝐞𝐞 𝐥𝐚̆́𝐦 𝐧𝐡𝐚\n🎉𝐍𝐠𝐮̛̣𝐚 𝐧𝐠𝐮̛̣𝐚 𝐛𝐨̛́𝐭 𝐬𝐩𝐚𝐦 𝐧𝐡𝐚 𝐡𝐮̛ 𝐛𝐨𝐭 đ𝐚̂́𝐲\n🎉Không 𝐊𝐡𝐨̂𝐧𝐠 𝐫𝐞𝐩𝐨𝐫𝐭 𝐛𝐨𝐭 𝐧𝐡𝐚 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢\n▬▬ι═══════ﺤ 𝐂𝐚̉𝐦 𝐨̛𝐧 𝐛𝐚̣𝐧 đ𝐚̃ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐝𝐢̣𝐜𝐡 𝐯𝐮̣ 𝐛𝐨𝐭 𝐛𝐞̂𝐧 𝐦𝐢̀𝐧𝐡 𝐦𝐨𝐧𝐠 𝐡𝐚̃𝐲 𝐥𝐚̀𝐦 đ𝐮́𝐧𝐠 𝐥𝐮̛𝐮 𝐲́ 𝐧𝐡𝐚́ <3 𝐂𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭 𝐯𝐮𝐢 𝐯𝐞̉ 🧨\n🌸🍒🌸\n\n`,attachment: fs.createReadStream(__dirname + "/cache/5.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.mp4"), event.messageID);  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.mp4")).on("close",() => callback());
}
                                                                                                         }
module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

   };