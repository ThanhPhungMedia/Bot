module.exports.config = {
    name: "avtwibu",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "JRT",
    description: "Tạo ra một avt trên taoanhdep.",
    commandCategory: "Tạo ảnh",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": "",
        "axios": ""
    }
};
module.exports.handleReply = async function ({ event, api, handleReply }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const timeStart = Date.now();
    if (handleReply.author != event.senderID) return;
    const { threadID, messageID, senderID, body } = event;
    var id = handleReply.id;
    const name = this.config.name;
    switch (handleReply.type) {
      case "jrt": {
        var id = handleReply.id;
        var names = handleReply.names;
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`[!] 𝐁𝐚̣𝐧 đ𝐚̃ 𝐜𝐡𝐨̣𝐧 𝐜𝐡𝐮̛̃ 𝐧𝐞̂̀𝐧 𝐥𝐚̀ ${event.body}\n\n[!] 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐧𝐡𝐚̣̂𝐩 𝐯𝐚̀𝐨 𝐜𝐡𝐮̛̃ 𝐤𝐢́ 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 [!]`,threadID, function (err, info) {
          return global.client.handleReply.push({
                    type: "color",
                    name,
                    author: senderID,
                    id: id,
                    names,
                    nen: event.body,
                    messageID: info.messageID
                });
        },messageID)
      }
      case "color": {
        var nen = handleReply.nen;
        var id = handleReply.id;
        var names = handleReply.names;
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`[!] 𝐁𝐚̣𝐧 đ𝐚̃ 𝐜𝐡𝐨̣𝐧 𝐜𝐡𝐮̛̃ 𝐤𝐢́ : ${event.body}\n\n[!] 𝐍𝐡𝐚̣̂𝐩 𝐦𝐚̀𝐮 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 (𝐥𝐮̛𝐮 𝐲́: 𝐧𝐡𝐚̣̂𝐩 𝐭𝐞̂𝐧 𝐭𝐢𝐞̂́𝐧𝐠 𝐚𝐧𝐡 𝐜𝐮̉𝐚 𝐦𝐚̀𝐮 - 𝐧𝐞̂́𝐮 𝐤𝐡𝐨̂𝐧𝐠 𝐦𝐮𝐨̂́𝐧 𝐧𝐡𝐚̣̂𝐩 𝐦𝐚̀𝐮 𝐭𝐡𝐢̀ 𝐧𝐡𝐚̣̂𝐩 "𝐧𝐨") [!]`,threadID, function (err, info) {
          return global.client.handleReply.push({
                    type: "create",
                    name,
                    author: senderID,
                    id: id,
                    nen: nen,
                    names,
                    ky: event.body,
                    messageID: info.messageID
                });
        },messageID) 
      }
      case "create": {
        var nen = handleReply.nen;
        var id = handleReply.id;
        var ky = handleReply.ky;
        var color = event.body;
        var names = handleReply.names;
        var color2 = ``;
        api.unsendMessage(handleReply.messageID);
        if (color == "no") var color = `#`;
        var callback = () => api.sendMessage({body:`[⚜️] 𝐓𝐞̂𝐧 𝐧𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭: ${names}\n[⚜️] 𝐌𝐚̃ 𝐬𝐨̂́ 𝐧𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭: ${id}\n[⚜️] 𝐂𝐡𝐮̛̃ 𝐧𝐞̂̀𝐧: ${nen}\n[⚜️] 𝐂𝐡𝐮̛̃ 𝐤𝐲́: ${ky}\n[⚜️] 𝐌𝐚̀𝐮 𝐧𝐞̂̀𝐧: ${color}`,attachment: fs.createReadStream(__dirname + "/cache/tad.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tad.png"),event.messageID); 
       return request(encodeURI(`https://Source-API.tuanvudev2.repl.co/taoanhdep/avatarwibu?id=${id}&chu_nen=${nen}&chu_ky=${ky}`)).pipe(fs.createWriteStream(__dirname+'/cache/tad.png')).on('close',() => callback());    
    }
   }
 }
module.exports.run = async function({ api, event, args, permssion }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	 if (this.config.credits != 'JRT') {
        console.log('\x1b[33m[⚜️] WARN [⚜️]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[⚜️] WARN [⚜️] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      } 
	
if (args[0] == "list") {
    axios.get(`https://Source-API.tuanvudev2.repl.co/taoanhdep/list`).then(res => {
      var count = res.data.listAnime.length;
      var data = res.data.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].Name} |  ${data[i].color}\n`;
      }
      msg += `[⚜️] 𝐭𝐫𝐚𝐧𝐠 (${page}/${numPage})\n[⚜️] 𝐃𝐮̀𝐧𝐠 ${global.config.PREFIX}${this.config.name} 𝐥𝐢𝐬𝐭 <𝐬𝐨̂́ 𝐭𝐫𝐚𝐧𝐠>`;
      return api.sendMessage(msg, threadID,messageID);
    });
  }
	else if (args[0] == "color") {
        var callback = () => api.sendMessage({body:`𝐂𝐮̉𝐚 𝐛𝐚̣𝐧 đ𝐚̂𝐲 UwU`,attachment: fs.createReadStream(__dirname + "/cache/taoanhdep.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/taoanhdep.png"),event.messageID); 
       return request(encodeURI(`https://www.studytienganh.vn/upload/2017/08/40.jpg`)).pipe(fs.createWriteStream(__dirname+'/cache/taoanhdep.png')).on('close',() => callback());    
    } 
else if (args[0] == "search") {
	let nhanvat = args.join(" ");
	const res = await axios.get(`https://Source-API.tuanvudev2.repl.co/taoanhdep/search?key=${nhanvat}`);
	var text = res.data.search.Name;
	var idz = res.data.search.ID;
	var color = res.data.search.color;
  var source = res.data.search.source;
	if (!nhanvat) return api.sendMessage(`[⚜️] 𝐍𝐡𝐚̣̂𝐩 𝐢𝐝 𝐜𝐚̂̀𝐧 𝐜𝐨𝐢 𝐢𝐧𝐟𝐨 đ𝐢\n[⚜️] 𝐃𝐮̀𝐧𝐠 ${global.config.PREFIX}𝐓𝐚𝐨𝐚𝐧𝐡𝐝𝐞𝐩 𝐥𝐢𝐬𝐭 đ𝐞̂̉ 𝐜𝐨𝐢 da𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐧𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭 `, event.threadID, event.messageID);

return api.sendMessage(`[⚜️] 𝐍𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭: ${text} \n[⚜️] 𝐈𝐃: ${idz}\n[⚜️] 𝐌𝐚̀𝐮 𝐦𝐚̣̆𝐜 đ𝐢̣𝐧𝐡: ${color}\n[⚜️] 𝐍𝐠𝐮𝐨̂̀𝐧: ${source}`, event.threadID, event.messageID)
}
else if(args[0] == "find"){
       const ress = await axios.get('https://Source-API.tuanvudev2.repl.co/taoanhdep/data')
      var nhanvat = args[1]
      const data2 = ress.data.anime[nhanvat - 1].imgAnime
      var imag = (await axios.get(`${data2}`, {
          responseType: "stream"
        })).data;
        var msg = {
          body: `[⚜️] 𝐀̉𝐧𝐡 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 đ𝐚̂𝐲`,
          attachment: imag
        }
      return api.sendMessage(msg, threadID, messageID)
    }
else {
    if (senderID == api.getCurrentUserID()) return;
    const name = this.config.name;
    var id = args[0];
    axios.get(`https://Source-API.tuanvudev2.repl.co/taoanhdep/list`).then (res => {
      if (!res.data.listAnime[id]) return api.sendMessage(`[⚜️] 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐢̀𝐦 𝐭𝐡𝐚̂́𝐲 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮!!!`,threadID,messageID);
      var names = res.data.listAnime[id - 1].Name;
   return api.sendMessage(`[!] Đ𝐚̃ 𝐭𝐢̀𝐦 𝐭𝐡𝐚̂́𝐲 𝐈𝐃 𝐧𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭  : ${id}[!]\n[!] 𝐍𝐚𝐦𝐞 𝐧𝐡𝐚̂𝐧 𝐯𝐚̣̂𝐭 𝐥𝐚̀ ${names}\n\n[!] 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐜𝐡𝐮̛̃ 𝐧𝐞̂̀𝐧 𝐜𝐡𝐨 𝐡𝐢̀𝐧𝐡 𝐚̉𝐧𝐡 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 [!]`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
            type: "jrt",
            name,
            author: senderID,
            id: id,
            names,
            messageID: info.messageID
        });
    },event.messageID);
 })
}
}