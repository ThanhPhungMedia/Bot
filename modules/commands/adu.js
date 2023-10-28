const fs = require("fs");
module.exports.config = {
	name: "adu",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by LTD", 
	description: "hihihihi",
	commandCategory: "Không cần dấu lệnh",
	usages: "adu",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("yêu")==0 || (event.body.indexOf("yeu")==0)) {
		var msg = {
				body: "𝐑𝐨̂̀𝐢 𝐚𝐢 𝐲𝐞̂𝐮 𝐭𝐮𝐢🥺",
				attachment: fs.createReadStream(__dirname + `/noprefix/adu.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}