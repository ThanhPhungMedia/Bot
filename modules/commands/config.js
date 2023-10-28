module.exports.config = {
  name: "config",
  version: "0.0.1",
  hasPermssion: 1,
  credits: "Adonis-Lyhai",
  description: "xem thông tin về bot",
  commandCategory: "Dành cho admin",
  usages: "",
  cooldowns: 0
};
const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
function handleByte(byte) {
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	let i = 0, usage = parseInt(byte, 10) || 0;

	while(usage >= 1024 && ++i){
		usage = usage/1024;
	}
  
	return(usage.toFixed(usage < 10 && i > 0 ? 1 : 0) + ' ' + units[i]);
}

function handleOS(ping) {
	var os = require("os");
	var cpus = os.cpus();
	var speed, chips;
	for (var i of cpus) chips = i.model, speed = i.speed;
	if (cpus == undefined) return;
	else return msg = 
	`📌 Ping: ${Date.now() - ping}ms.\n\n`;

}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function({ api, args, event, Users,handleReply,permssion, Threads }) {
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const { threadID, messageID, senderID } = event;
   return api.sendMessage({body: `====[ 𝐀𝐃𝐌𝐈𝐍 ]====\n[1] 𝐂𝐡𝐚̣𝐲 𝐥𝐚̣𝐢 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠 𝐛𝐨𝐭\n[2] 𝐑𝐞𝐥𝐨𝐚𝐝 𝐜𝐨𝐧𝐟𝐢𝐠\n[3] 𝐂𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐜𝐚́𝐜 𝐛𝐨𝐱\n[4] 𝐂𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠\n[5] Đ𝐚̆𝐧𝐠 𝐱𝐮𝐚̂́𝐭 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤\n====[ 𝐐𝐔𝐀̉𝐍 𝐓𝐑𝐈̣ 𝐕𝐈𝐄̂𝐍 ]====\n[6] 𝐁𝐚̣̂𝐭 𝐭𝐚̆́𝐭 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 𝐛𝐨𝐭\n[7] 𝐁𝐚̣̂𝐭 𝐭𝐚̆́𝐭 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐜𝐚̂́𝐦 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐯𝐚̀𝐨 𝐛𝐨𝐱 \n[8] 𝐁𝐚̣̂𝐭 𝐭𝐚̆́𝐭 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐜𝐡𝐨́𝐧𝐠 𝐜𝐮̛𝐨̛́𝐩 𝐛𝐨𝐱\n[9] 𝐁𝐚̣̂𝐭 𝐭𝐚̆́𝐭 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐚𝐧𝐭𝐢𝐨𝐮𝐭\n[10] 𝐊𝐢𝐜𝐤 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤\n====[ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 ]====\n[11] 𝐗𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐯𝐞̂̀ 𝐛𝐨𝐭\n[12] 𝐗𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐛𝐨𝐱\n[13] 𝐗𝐞𝐦 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦\n[14] 𝐗𝐞𝐦 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐀𝐃𝐌𝐈𝐍\n[15] 𝐗𝐞𝐦 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐧𝐡𝐨́𝐦\n-----------\n👉 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐭𝐡𝐞𝐨 𝐬𝐨̂́ 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐜𝐡𝐨̣𝐧♥️\n\n`
        }, threadID, (error, info) => {
            global.client.handleReply.push({
               name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "choosee",
            })
        }, event.messageID)
}
module.exports.handleReply = async function({
  args, event, Users,Threads, api, handleReply, permssion
}) {
  const { threadID, messageID, senderID } = event;
  switch (handleReply.type) {
    case "choosee": {
      switch (event.body) {
        case "1": {
             const permission = ["100044997840433", "", "", ""];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲!!!", event.threadID, event.messageID);
 

	const { threadID, messageID } = event;
	return api.sendMessage(`《Restarted successfully》`, threadID, () => process.exit(1));
}break;
         case "2": {
           const permission = ["100044997840433", "", ""];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲!!!", event.threadID, event.messageID);
           const listAdmin = global.config.ADMINBOT[0];
    if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
          delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("Đ𝐚̃ 𝐫𝐞𝐥𝐨𝐚𝐝 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 config.json", event.threadID, event.messageID);    
}break;
        case "3": {
          const permission = ["100044997840433", "", "", ""];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲 !!!", event.threadID, event.messageID);
          const { threadID } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    console.log(`Đ𝐚̃ 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐜𝐮̉𝐚 𝐛𝐨𝐱 𝐈𝐝: ${groupInfo.threadID}`)
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
  }
    console.log(`Đ𝐚̃ 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐜𝐮̉𝐚 ${lengthGroup} 𝐁𝐨𝐱`)
    return api.sendMessage(`Đ𝐚̃ 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐜𝐮̉𝐚 ${lengthGroup} 𝐁𝐨𝐱`, threadID)
}break;
        case "4": {
          const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲 !!!", event.threadID, event.messageID);
    const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    var inbox = await api.getThreadList(100, null, ['INBOX']);
    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
    for (var groupInfo of list) {
        var { participantIDs } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
        for (var id of participantIDs) {
            let data = await api.getUserInfo(id);
            data.name
            let userName = data[id].name
            await Users.setData(id, { name: userName, data: {} });
            console.log(`Đ𝐚̃ 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐜𝐮̉𝐚 𝐈𝐝: ${id}`)
        }
    }
    console.log(`Update successful!`)
    return api.sendMessage(`Successfully updated all user data!`, threadID)
}break;        
        case "5": {
          const fs = global.nodemodule["fs-extra"];
  const permission = ["100044997840433"];
	if (!permission.includes(event.senderID)) return api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐮̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̉ 𝐦𝐚̣𝐧𝐡 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲!!!", event.threadID, event.messageID);
api.sendMessage("Đ𝐚𝐧𝐠 đ𝐚̆𝐧𝐠 𝐱𝐮𝐚̂́𝐭 𝐤𝐡𝐨̉𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤...",event.threadID,event.messageID)
api.logout()
}break;
        case "6": {
          const { writeFileSync } = global.nodemodule["fs-extra"];
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;  
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐓𝐚̆́𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐭𝐚̂́𝐭 𝐜𝐚̉ 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 đ𝐞̂̀𝐮 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭 🔓", threadID, messageID);
        } else {
            api.sendMessage("[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐁𝐚̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐪𝐭𝐯𝐨𝐧𝐥𝐲 (𝐜𝐡𝐢̉ 𝐚𝐝𝐦𝐢𝐧 𝐯𝐨̛́𝐢 𝐪𝐭𝐯 𝐛𝐨𝐱 𝐦𝐨̛́𝐢 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭) 🔒", threadID, messageID);
            adminbox[threadID] = true;
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
}break;
        case "7": {
          const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐁𝐨𝐭 𝐜𝐚̂̀𝐧 𝐪𝐮𝐲𝐞̂̀𝐧 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`» Đ𝐚̃ ${(data.newMember == true) ? "𝐁𝐚̣̂𝐭" : "𝐓𝐚̆́𝐭"} 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐚̂́𝐦 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐯𝐚̀𝐨 𝐛𝐨𝐱`, event.threadID, event.messageID);
}break;
        case "8": {
            const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('[𝘽𝙊𝙏 𝙍𝙮𝙤 🎀] »𝐁𝐨𝐭 𝐜𝐚̂̀𝐧 𝐪𝐮𝐲𝐞̂̀𝐧 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`Đ𝐚̃ ${(data["guard"] == true) ? "𝐁𝐚̣̂𝐭" : "𝐓𝐚̆́𝐭"} 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐜𝐡𝐨́𝐧𝐠 𝐜𝐮̛𝐨̛́𝐩 𝐛𝐨𝐱`, event.threadID, event.messageID);
}break;
          case "9": {
           var info = await api.getThreadInfo(event.threadID);
 let data = (await Threads.getData(event.threadID)).data || {};
 if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
 else data["antiout"] = false;
 await Threads.setData(event.threadID, { data });
 global.data.threadData.set(parseInt(event.threadID), data);
 return api.sendMessage(`Đ𝐚̃ ${(data["antiout"] == true) ? "𝐁𝐚̣̂𝐭" : "𝐓𝐚̆́𝐭"} 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐚𝐧𝐭𝐢𝐨𝐮𝐭!`, event.threadID);
}break;
        case "10": {
          var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
    var success = 0, fail = 0;
    var arr = [];
    for (const e of userInfo) {
        if (e.gender == undefined) {
            arr.push(e.id);
        }
    };

    adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
    if (arr.length == 0) {
        return api.sendMessage("𝐓𝐫𝐨𝐧𝐠 𝐧𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢 '𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤'.", event.threadID);
    }
    else {
        api.sendMessage("𝐍𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ " + arr.length + " '𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤'.", event.threadID, function () {
            if (!adminIDs) {
                api.sendMessage("𝐍𝐡𝐮̛𝐧𝐠 𝐛𝐨𝐭 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐥𝐨̣𝐜 đ𝐮̛𝐨̛̣𝐜.", event.threadID);
            } else {
                api.sendMessage("𝐁𝐚̆́𝐭 đ𝐚̂̀𝐮 𝐥𝐨̣𝐜..", event.threadID, async function() {
                    for (const e of arr) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(e), event.threadID);   
                            success++;
                        }
                        catch {
                            fail++;
                        }
                    }
                  
                    api.sendMessage("Đ𝐚̃ 𝐥𝐨̣𝐜 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 " + success + " 𝐍𝐠𝐮̛𝐨̛̀𝐢.", event.threadID, function() {
                        if (fail != 0) return api.sendMessage("𝐋𝐨̣𝐜 𝐭𝐡𝐚̂́𝐭 𝐛𝐚̣𝐢 " + fail + " 𝐍𝐠𝐮̛𝐨̛̀𝐢.", event.threadID);
                    }); 
                  })
            }
        })
    }
}break;
        case "11": {
         const moment = require("moment-timezone");
    const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
    const namebot = config.BOTNAME
    const PREFIX = config.PREFIX
    const admin = config.ADMINBOT
    const ndh = config.NDH
    const { commands } = global.client;
    const threadSetting = (await Threads.getData(String(event.threadID))).data || 
    {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
    : global.config.PREFIX;
	  var ping = Date.now();
  
    var threadInfo = await api.getThreadInfo(event.threadID);
    var time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
	 var severInfo = handleOS(ping);
	 var msg =`⏰ 𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀: ${gio} 𝐆𝐢𝐨̛̀ ${phut} 𝐏𝐡𝐮́𝐭 ${giay} 𝐆𝐢𝐚̂𝐲\n🤖 𝐓𝐞̂𝐧 𝐛𝐨𝐭: ${namebot}\n⏱ Đ𝐚̃ 𝐡𝐨𝐚̣𝐭 đ𝐨̣̂𝐧𝐠:${hours < 10 ? (hours > 0 ? " 0" + hours + " 𝐆𝐢𝐨̛̀" : 
   "") : (hours > 0 ? " " + hours + " 𝐆𝐢𝐨̛̀" : "")} ${minutes < 10 ? (minutes > 0 ? " 0"  + minutes + " 𝐏𝐡𝐮́𝐭" : "") : (minutes > 0 ? " " + minutes + " 𝐏𝐡𝐮́𝐭" : 
 "")}${seconds < 10 ? (seconds > 0 ? " 0" + seconds + " 𝐆𝐢𝐚̂𝐲." : "") : (seconds > 0 ? " " + 
 seconds + " 𝐆𝐢𝐚̂𝐲." : "")}\n--------------\n` +
	`👨‍👨‍👧‍👦 𝐓𝐨̂̉𝐧𝐠 𝐧𝐡𝐨́𝐦: ${global.data.allThreadID.length} 𝐧𝐡𝐨́𝐦.\n
👤 𝐀𝐃𝐌𝐈𝐍 𝐁𝐎𝐓: ${admin.length}.\n` + 
`📝 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐥𝐞̣̂𝐧𝐡: ${commands.size }\n--------------\n`+`🌟 𝐏𝐫𝐞𝐟𝐢𝐱 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠 : ${PREFIX}\n🥀 𝐏𝐫𝐞𝐟𝐢𝐱 𝐛𝐨𝐱: ${prefix}\n${severInfo ? severInfo : `📌 𝐏𝐢𝐧𝐠: 
${Date.now() - ping}𝐌𝐬.\n\n`}`
    return api.sendMessage(msg, event.threadID)
}break; 
        case "12": {
          const moment = require("moment-timezone");
    const request = require("request")
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let timeByMS = Date.now();

    var memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    };
    var nam = gendernam.length;
    var nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let u = threadInfo.nicknames;
    let icon = threadInfo.emoji;

    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


    if (!totalChat[event.threadID]) {
      totalChat[event.threadID] = {
        time: timeByMS,
        count: sl,
        ytd: 0
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }

    let mdtt = "𝐂𝐡𝐮̛𝐚 𝐜𝐨́ 𝐭𝐡𝐨̂́𝐧𝐠 𝐤𝐞̂";
    let preCount = totalChat[event.threadID].count || 0;
    let ytd = totalChat[event.threadID].ytd || 0;
    let hnay = (ytd != 0) ? (sl - preCount) : "𝐂𝐡𝐮̛𝐚 𝐜𝐨́ 𝐭𝐡𝐨̂́𝐧𝐠 𝐤𝐞̂";
    let hqua = (ytd != 0) ? ytd : "𝐂𝐡𝐮̛𝐚 𝐜𝐨́ 𝐭𝐡𝐨̂́𝐧𝐠 𝐤𝐞̂";
    if (timeByMS - totalChat[event.threadID].time > _24hours) {
      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
        totalChat[event.threadID].count = sl;
        totalChat[event.threadID].time = timeByMS - _24hours;
        totalChat[event.threadID].ytd = sl - preCount;
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
      if (ytd == 0) mdtt = 100;
      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
      mdtt += "%";
    }
    
    var callback = () =>
      api.sendMessage({
        body: `» 𝐓𝐞̂𝐧 𝐛𝐨𝐱: ${threadName}\n» 𝐈𝐃 𝐛𝐨𝐱: ${id}\n» 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n» 𝐄𝐦𝐨𝐣𝐢: ${icon}\n» 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧:\n» 𝐓𝐨̂̉𝐧𝐠 ${threadMem} 𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧\n» 👨‍🦰𝐍𝐚𝐦: ${nam} 𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 \n» 👩‍🦰𝐍𝐮̛̃: ${nu} 𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧\n» 🕵️‍♂️𝐕𝐨̛́𝐢 ${qtv} 𝐐𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧\n» 💬 𝐓𝐨̂̉𝐧𝐠: ${sl} 𝐓𝐢𝐧 𝐧𝐡𝐚̆́𝐧\n» 📈 𝐌𝐮̛́𝐜 đ𝐨̣̂ 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜: ${mdtt}\n🌟 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐡𝐨̂𝐦 𝐪𝐮𝐚: ${hqua}\n🌟 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐡𝐨̂𝐦 𝐧𝐚𝐲: ${hnay}\n   === 「${timeNow}」 ===`,
        attachment: fs.createReadStream(__dirname + '/cache/box.png')
      },
        threadID,
        () => fs.unlinkSync(__dirname + '/cache/box.png')
      );
    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/box.png'))
      .on('close', () => callback());
}break;      
       case "13": {
         var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 ${qtv} 𝐐𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐠𝐨̂̀𝐦:\n ${listad}`,event.threadID,event.messageID)
}break;
        case "14": {
          const { ADMINBOT } = global.config;
           listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`»  ${name}\nLink: fb.me/${idAdmin}`);              
                }
            }
           return api.sendMessage(`======〘『𝐀𝐃𝐌𝐈𝐍』〙======\n${msg.join("\n")}\n`, event.threadID, event.messageID);
}break;
        case "15": {
            let threadInfo = await api.getThreadInfo(event.threadID);
          var inbox = await 
api.getThreadList(300, null, ["INBOX"]);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

var abc = "💌 𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐛𝐨𝐭 đ𝐚𝐧𝐠 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 💌\n"; let i = 0;
  for (var groupInfo of list) {
    abc += `${i+=1}. ${groupInfo.name}\n💌 𝐈𝐃 𝐛𝐨𝐱: ${groupInfo.threadID}\n------------------------------\n`;
  }
  api.sendMessage(abc, event.threadID);
}break;
     }
   }
 }
}


module.exports.handleEvent = async ({ api, event }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
    fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}
