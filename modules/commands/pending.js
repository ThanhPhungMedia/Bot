module.exports.config = {
	name: "pending",
	version: "1.0.5",
	credits: "Mirai Team",
	hasPermssion: 2,
	description: "Quản lý tin nhắn chờ của bot",
	commandCategory: "Tiện ích",
	cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "invaildNumber": "%1 𝐊𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́ 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂",
        "cancelSuccess": "Đ𝐚̃ 𝐭𝐮̛̀ 𝐜𝐡𝐨̂́𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 %1 𝐍𝐡𝐨́𝐦!",
        "notiBox": "𝐁𝐨𝐱 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐚𝐝𝐦𝐢𝐧 𝐩𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭",
        "approveSuccess": "Đ𝐚̃ 𝐩𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 %1 𝐍𝐡𝐨́𝐦!",

        "cantGetPendingList": "𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐥𝐚̂́𝐲 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐜𝐚́𝐜 𝐧𝐡𝐨́𝐦 đ𝐚𝐧𝐠 𝐜𝐡𝐨̛̀!",
        "returnListPending": "「𝘽𝙊𝙏 𝙍𝙮𝙤🎀」❮ 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐧𝐡𝐨́𝐦 𝐜𝐚̂̀𝐧 𝐝𝐮𝐲𝐞̣̂𝐭: %1 𝐍𝐡𝐨́𝐦 ❯\n\n%2",
        "returnListClean": "「𝘽𝙊𝙏 𝙍𝙮𝙤🎀」𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐧𝐡𝐨́𝐦 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐡𝐚̀𝐧𝐠 𝐜𝐡𝐨̛̀"
    },
    "en": {
        "invaildNumber": "%1 is not an invalid number",
        "cancelSuccess": "Refused %1 thread!",
        "notiBox": "Your box has been approved to use bot",
        "approveSuccess": "Approved successfully %1 threads!",

        "cantGetPendingList": "Can't get the pending list!",
        "returnListPending": "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
        "returnListClean": "「PENDING」There is no thread in the pending list"
    }
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(getText("notiBox"), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
    }
}

module.exports.run = async function({ api, event, getText }) {
	const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;

    try {
		var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
		var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
	} catch (e) { return api.sendMessage(getText("cantGetPendingList"), threadID, messageID) }

	const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getText("returnListPending", list.length, msg), threadID, (error, info) => {
		global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
	}, messageID);
    else return api.sendMessage(getText("returnListClean"), threadID, messageID);
}