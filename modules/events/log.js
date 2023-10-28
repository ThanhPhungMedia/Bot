 module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "Mirai Team",
	description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);
    //let threadName = await Threads.getInfo(threadID).threadName;
    var datathread = await api.getThreadInfo(event.threadID);
    var nameThread = datathread.name;
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "======== 𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼 𝘁𝘂̛̀ 𝗛𝗲̣̂ 𝗧𝗵𝗼̂́𝗻𝗴 ========" +
                      "\n\n» 𝗧𝗲̂𝗻 𝗕𝗼𝘅: " + `${nameThread}` + 
                      "\n» 𝗡𝗵𝗼́𝗺 𝗰𝗼́ 𝗜𝗗: " + event.threadID +
                      "\n» 𝗖𝗼́ 𝗵𝗮̀𝗻𝗵 𝗱𝗼̣̂𝗻𝗴: {task}" +
                      "\n» 𝗛𝗮̀𝗻𝗵 𝗱𝗼̣̂𝗻𝗴 𝗯𝗼̛̉𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: " + nameUser + 
                      "\n» 𝗖𝗼́ 𝗜𝗗: " + event.author +
                      "\n» " + Date.now() +" «",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Tên không tồn tại",
                    newName = event.logMessageData.name || "Tên không tồn tại";
            task = "Người dùng thay đổi tên nhóm từ: '" + oldName + "' thành '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "𝙉𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 𝙙𝙖̃ 𝙩𝙝𝙚̂𝙢 𝙗𝙤𝙩 𝙫𝙖̀𝙤 𝙢𝙤̣̂𝙩 𝙣𝙝𝙤́𝙢 𝙢𝙤̛́𝙞!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "𝙉𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 𝙙𝙖̃ 𝙠𝙞𝙘𝙠 𝙗𝙤𝙩 𝙧𝙖 𝙠𝙝𝙤̉𝙞 𝙣𝙝𝙤́𝙢!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}