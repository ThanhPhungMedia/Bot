module.exports.config = {
	name: "ban",
	version: "2.0.5",
	hasPermssion: 1,
	credits: "NTKhang & edited by DuyVuong",
	description: "Ban thành viên vĩnh viễn khỏi nhóm (Nhớ set cho bot qtv nha)\nAuthor: NTKhang",
	commandCategory: "group",
	usages: "[key]",
	cooldowns: 5,
	info: [
		{
			key: '[tag] hoặc [reply tin nhắn] "lý do"',
			prompt: 'thêm 1 lần cảnh cáo user',
			type: '',
			example: 'ban [tag] "lý do cảnh cáo"'
  		},

		{
			key: 'listban',
			prompt: 'xem danh sách user bị cấm vào nhóm',
			type: '',
			example: 'ban listban'
  		},

		{
			key: 'uban',
			prompt: 'xóa user khỏi danh sách bị cấm vào nhóm',
			type: '',
			example: 'ban unban [id của user cần xóa]'
  		},
		{
			key: 'view',
			prompt: '"tag" hoặc "để trống" hoặc "view all", lần lượt dùng để xem người được tag hoặc bản thân hoặc thành viên trong box bị cảnh cáo bao nhiêu lần ',
			type: '',
			example: 'ban view [@tag] / warns view'
  		},

		{
			key: 'reset',
			prompt: 'Reset toàn bộ dữ liệu ban trong nhóm của bạn',
			type: '',
			example: 'ban reset'
  		}

  		]
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
	let {messageID, threadID, senderID} = event;
	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('𝐁𝐨𝐭 𝐜𝐚̂̀𝐧 𝐪𝐮𝐲𝐞̂̀𝐧 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐲\𝐧𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐭𝐡𝐞̂𝐦 𝐯𝐚̀ 𝐭𝐡𝐮̛̉ 𝐥𝐚̣𝐢!!', threadID, messageID);
	var fs = require("fs-extra");
	
	if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
			const dataaa = {warns: {}, banned: {}};
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(dataaa));
					}
  var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); //đọc nội dung file
  /*
  {warns: {}, banned: {tid: []}};
  */
  if(!bans.warns.hasOwnProperty(threadID)) {
			bans.warns[threadID] = {}; 
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	
  }

  
  if(args[0] == "view") {
  	if(!args[1]) {
  		var msg = "";
  		var mywarn = bans.warns[threadID][senderID];
  		if(!mywarn) return api.sendMessage('✅𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐛𝐢̣ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨 𝐥𝐚̂̀𝐧 𝐧𝐚̀𝐨', threadID, messageID);
  		var num = 1;
  		for(let reasonwarn of mywarn) {
  			msg += `reasonwarn\n`;
  		}
  		api.sendMessage(`❎𝐁𝐚̣𝐧 đ𝐚̃ 𝐛𝐢̣ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨 𝐯𝐨̛́𝐢 𝐥𝐢́ 𝐝𝐨 : ${msg}`, threadID, messageID);
  	}
  	else if(Object.keys(event.mentions).length != 0) {
  		var message = "";
  		var mentions = Object.keys(event.mentions);
  		for(let id of mentions) {
  			var name = (await api.getUserInfo(id))[id].name;
  			var msg = "";
  			var so = 1;
  			var reasonarr = bans.warns[threadID][id];
  			if(typeof reasonarr != "object") {
  				msg += " 𝐜𝐡𝐮̛𝐚 𝐛𝐢̣ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨 𝐥𝐚̂̀𝐧 𝐧𝐚̀𝐨\n"
  			} else {
  			for(let reason of reasonarr) {
  				msg += ""+reason+"\n";
  			}
  			}
  			message += "⭐️"+name+" :"+msg+"";
  		}
  		api.sendMessage(message, threadID, messageID);
  	}
  	
  	else if(args[1] == "all") {
  		var dtwbox = bans.warns[threadID];
  		var allwarn = "";
  		for(let idtvw in dtwbox) {
  			var name = (await api.getUserInfo(idtvw))[idtvw].name, msg = "", solan = 1;
  			for(let reasonwtv of dtwbox[idtvw]) {
  				msg += `${reasonwtv}`
  			}
  			allwarn += `${name} : ${msg}\n`;
  		}
  		allwarn == "" ? api.sendMessage("✅𝐍𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐚𝐢 𝐛𝐢̣ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨", threadID, messageID) : api.sendMessage("𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 đ𝐚̃ 𝐛𝐢̣ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨:\n"+allwarn, threadID, messageID);
  	}
  }
  
  else if(args[0] == "unban") {
  	var id = parseInt(args[1]), mybox = bans.banned[threadID];
  	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('❎𝐂𝐡𝐢̉ 𝐪𝐭𝐯 𝐦𝐨̛́𝐢 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐮𝐧𝐛𝐚𝐧!', threadID, messageID);
	
  	if(!id) return api.sendMessage("❎𝐂𝐚̂̀𝐧 𝐧𝐡𝐚̣̂𝐩 𝐢𝐝 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐚̂̀𝐧 𝐱𝐨𝐚́ 𝐤𝐡𝐨̉𝐢 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐛𝐢̣ 𝐜𝐚̂́𝐦 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦", threadID, messageID);
  	bans.banned;
  	if(!mybox.includes(id)) return api.sendMessage("✅𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐚̀𝐲 𝐜𝐡𝐮̛𝐚 𝐛𝐢̣ 𝐜𝐚̂́𝐦 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧", threadID, messageID);
			api.sendMessage(`✅Đ𝐚̃ 𝐱𝐨𝐚́ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐜𝐨́ 𝐢𝐝 ${id} 𝐊𝐡𝐨̉𝐢 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐛𝐢̣ 𝐜𝐚̂́𝐦 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦`, threadID, messageID);
			mybox.splice(mybox.indexOf(id), 1);
			delete bans.warns[threadID][id]
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  }
  
  else if(args[0] == "listban") {
  	var mybox = bans.banned[threadID];
  	var msg = "";
  	for(let iduser of mybox) {
  		var name = (await api.getUserInfo(iduser))[iduser].name;
  		msg += "╔Name: " + name + "\n╚ID: " + iduser + "\n";
  	}
  	msg == "" ? api.sendMessage("✅𝐍𝐡𝐨́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐚𝐢 𝐛𝐢̣ 𝐜𝐚̂́𝐦 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦", threadID, messageID) : api.sendMessage("❎𝐍𝐡𝐮̛̃𝐧𝐠 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 đ𝐚̃ 𝐛𝐢̣ 𝐜𝐚̂́𝐦 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦:\n"+msg, threadID, messageID);
  }
  else if(args[0] == "reset") {
  	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('❎𝐂𝐡𝐢̉ 𝐪𝐭𝐯 𝐦𝐨̛́𝐢 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 𝐥𝐞̣̂𝐧𝐡 𝐫𝐞𝐬𝐞𝐭!', threadID, messageID);
  	
  	bans.warns[threadID] = {};
  	bans.banned[threadID] = [];
  	fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	api.sendMessage("Đ𝐚̃ 𝐫𝐞𝐬𝐞𝐭 𝐭𝐨𝐚̀𝐧 𝐛𝐨̣̂ 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐛𝐚𝐧 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐨́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧", threadID, messageID);
  }
  	 //◆━━━━━━━━━◆WARN◆━━━━━━━━━◆\\
  	 else{ 
  	 	   if (event.type != "message_reply" && Object.keys(event.mentions).length == 0)	return utils.throwError(this.config.name, threadID, messageID);
   
       //◆━━━━━━◆get iduser and reason<<<<<<<<\\
       var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('𝐂𝐡𝐢̉ 𝐪𝐭𝐯 𝐧𝐡𝐨́𝐦 𝐦𝐨̛́𝐢 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐜𝐚̉𝐧𝐡 𝐜𝐚́𝐨 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧!', threadID, messageID);
  var reason = "";
		  if (event.type == "message_reply") {
		  	var iduser = [];
		  	iduser.push(event.messageReply.senderID);
		  	reason = (args.join(" ")).trim();
		  }
		  
		  else if (Object.keys(event.mentions).length != 0) {
		  	var iduser = Object.keys(event.mentions);
		  	var stringname = "";
		  	var nametaglength = (Object.values(event.mentions)).length;
		  	var namearr = Object.values(event.mentions);
		  	for(let i = 0; i < nametaglength; i++) {
		  		stringname += (Object.values(event.mentions))[i];
		  	}
		  	var message = args.join(" ");
		  	//var reason = (message.slice(stringname.length + nametaglength -1)).trim();
		  	for(let valuemention of namearr) {
		  		console.log(namearr);
		  		console.log(message);
		  		vitrivalue = message.indexOf(valuemention);
		  		console.log(vitrivalue);
		  		message = message.replace(valuemention,"");
		  	}
		 	var reason = message.replace(/\s+/g, ' ');
		  }
		  var arraytag = [];
		  var arrayname = [];
		  //Check xem đã bị cảnh cáo lần nào chưa
		for(let iid of iduser) {
			var id = parseInt(iid);
			var nametag = (await api.getUserInfo(id))[id].name;
			arraytag.push({id: id, tag: nametag});
			
			if(!reason) reason += "𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐥𝐢́ 𝐝𝐨 𝐧𝐚̀𝐨 đ𝐮̛𝐨̛̣𝐜 đ𝐮̛𝐚 𝐫𝐚";
			/*if(!bans.warns.hasOwnProperty(threadID)) {
			bans.warns[threadID] = {}; 
			}*/
			var dtwmybox = bans.warns[threadID];
			if(!dtwmybox.hasOwnProperty(id)) { 
			dtwmybox[id] = [];
			}
			var solan = (bans.warns[threadID][id]).length;
			arrayname.push(nametag);
			var pushreason = bans.warns[threadID][id];
			pushreason.push(reason);
			if(!bans.banned[threadID]) {
				bans.banned[threadID] = [];
			}
			if((bans.warns[threadID][id]).length > 0) {
				
				api.removeUserFromGroup(parseInt(id), threadID)
				var banned = bans.banned[threadID];
				    banned.push(parseInt(id));
				fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
			}
		
		}//for

		api.sendMessage({body: `Đ𝐚̃ 𝐛𝐚𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 ${arrayname.join(", ")} 𝐕𝐢̃𝐧𝐡 𝐯𝐢𝐞̂̃𝐧 𝐤𝐡𝐨̉𝐢 𝐧𝐡𝐨́𝐦 𝐯𝐨̛́𝐢 𝐥𝐢́ 𝐝𝐨: ${reason}`, mentions: arraytag}, threadID, messageID);
		fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
}
  
};