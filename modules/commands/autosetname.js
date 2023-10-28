module.exports.config = {
    name: "autosetname",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Tự động setname cho thành viên mới",
    commandCategory: "Nhóm",
    usages: "[add <name> /remove] ",
    cooldowns: 5
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
const axios = require("axios");
    const pathData = join(__dirname, "cache", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    switch (args[0]) {
        case "add": {
            if (content.length == 0) return api.sendMessage("𝐏𝐡𝐚̂̀𝐧 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐭𝐞̂𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 𝐛𝐨̉ 𝐭𝐫𝐨̂́𝐧𝐠!", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐱𝐨𝐚́ 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐭𝐞̂𝐧 𝐜𝐮̃ 𝐭𝐫𝐮̛𝐨̛́𝐜 𝐤𝐡𝐢 đ𝐚̣̆𝐭 𝐭𝐞̂𝐧 𝐦𝐨̛́𝐢!!!", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`Đ𝐚̣̆𝐭 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐭𝐞̂𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠\n𝐏𝐫𝐞𝐯𝐢𝐞𝐰: ${content} ${name}\n𝐍𝐠𝐮̛𝐨̛̀𝐢 đ𝐚̣̆𝐭: ${name}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("𝐍𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̣̆𝐭 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐭𝐞̂𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢!!", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`𝐗𝐨𝐚́ 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐩𝐡𝐚̂̀𝐧 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐭𝐞̂𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢`, threadID, messageID);
                break;
        }
        default: {
                api.sendMessage({body: `𝐃𝐮̀𝐧𝐠: 𝐚𝐮𝐭𝐨𝐬𝐞𝐭𝐧𝐚𝐦𝐞 𝐚𝐝𝐝 <𝐧𝐚𝐦𝐞> đ𝐞̂̉ 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 𝐛𝐢𝐞̣̂𝐭 𝐝𝐚𝐧𝐡 𝐜𝐡𝐨 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢\𝐧𝐃𝐮̀𝐧𝐠: 𝐚𝐮𝐭𝐨𝐬𝐞𝐭𝐧𝐚𝐦𝐞 𝐫𝐞𝐦𝐨𝐯𝐞 đ𝐞̂̉ 𝐱𝐨́𝐚 𝐜𝐚̂́𝐮 𝐡𝐢̀𝐧𝐡 đ𝐚̣̆𝐭 𝐛𝐢𝐞̣̂𝐭 𝐝𝐚𝐧𝐡 𝐜𝐡𝐨 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐦𝐨̛́𝐢`}, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        }
