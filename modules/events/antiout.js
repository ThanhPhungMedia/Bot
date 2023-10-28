module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
   const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`=== 『 𝘽𝙊𝙏 𝙍𝙮𝙤🎀 』 ===\n━━━━━━━━━━━━━━━━━━\n→ 𝗧𝗵𝗲̂𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗺𝗮𝗻𝗴 𝘁𝗲̂𝗻 ${name} 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺 𝘁𝗵𝗮̂́𝘁 𝗯𝗮̣𝘁\n→ 𝗟𝗶́ 𝗱𝗼: 𝗱𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗰𝗵𝗮̣̆𝗻 𝗯𝗼𝘁 , 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝘂́𝘁 𝘁𝗵𝗲̂𝗺 𝗯𝗮̣𝗻 𝗯𝗲̀ , 𝗻𝗵𝗮̆́𝗻 𝘁𝗶𝗻 🐰`, event.threadID)
   } else api.sendMessage(`『𝘽𝙊𝙏 𝙍𝙮𝙤🎀』\n[⚜️] 𝗖𝗮̣̂𝘂 𝗖𝗵𝘂̉ ${name} đã rời 𝗞𝗵𝗼̉𝗶 𝗡𝗵𝗼́𝗺 [⚜️]\n●▬▬▬▬๑۩۩๑▬▬▬▬●\n『 𝐊𝐢́𝐜𝐡 𝐇𝐨𝐚̣𝐭   』 ➣ 𝐂𝐡𝐨̂́𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠 』 ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢   』 ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧  』 ➣ ${timeNow}『       𝐍𝐨𝐭𝐢       』 ➣ 𝐑𝐨̛̀𝐢 𝐂𝐨𝐧 𝐂𝐚̣̆𝐜 𝐍𝐠𝐨̂̀𝐢 𝐘𝐞̂𝐧 🙂`, event.threadID);
  })
 }
}