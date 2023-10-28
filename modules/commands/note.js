module.exports.config = {
    name: "note",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Áp dụng code từ buildtooldev và pastebin và github",
    commandCategory: "Admin",
    usages: "[reply or text]",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100044997840433"];
	if (!permission.includes(event.senderID))  api.sendMessage( "[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »𝐏𝐡𝐚́𝐭 𝐡𝐢𝐞̣̂𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 đ𝐚̃ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐜𝐚̂𝐮 𝐥𝐞̣̂𝐧𝐡 '𝐧𝐨𝐭𝐞'\n- 𝐓𝐢𝐧 𝐧𝐡𝐚̆́𝐧 đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐠𝐮̛̉𝐢 đ𝐞̂́𝐧 𝐜𝐡𝐨 𝐀𝐃𝐌𝐈𝐍", event.threadID, event.messageID);

  var idad = "100044997840433"
  const permissions = ["100044997840433"];
var name = global.data.userName.get(event.senderID)
const uid = event.senderID;
  var time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
	if (!permissions.includes(event.senderID)) 
    return api.sendMessage(`𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${name}\n𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: facebook.com/${uid}\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${time}`, idad);
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name) return api.sendMessage('[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐥𝐢𝐧𝐤 𝐦𝐮𝐨̂́𝐧 𝐚́𝐩 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐝𝐞 𝐡𝐨𝐚̣̆𝐜 𝐠𝐡𝐢 𝐭𝐞̂𝐧 𝐟𝐢𝐥𝐞 đ𝐞̂̉ 𝐮𝐩 𝐜𝐨𝐝𝐞 𝐥𝐞̂𝐧 𝐩𝐚𝐬𝐭𝐞𝐛𝐢𝐧!', threadID, messageID);
    if(!text && name) {
        var data = fs.readFile(
          `${__dirname}/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`𝐋𝐞̣̂𝐧𝐡 ${args[0]} 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢!.`, threadID, messageID);
            const { PasteClient } = require('pastebin-api')
            const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = text.match(urlR);
    if (url[0].indexOf('pastebin') !== -1 || url[0].indexOf('github') !== -1 || url[0].indexOf('phamvandien') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐱𝐚̉𝐲 𝐫𝐚 𝐥𝐨̂̃𝐢 𝐤𝐡𝐢 𝐚́𝐩 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐝𝐞 𝐯𝐚̀𝐨 ${args[0]}.js`, threadID, messageID);
                    api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐚́𝐩 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐝𝐞 𝐯𝐚̀𝐨 ${args[0]}.js, 𝐒𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐥𝐨𝐚𝐝 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠!`, threadID, messageID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: messageReply.body
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐜𝐡𝐢̉ 𝐫𝐞𝐩𝐥𝐲 𝐥𝐢𝐧𝐤 ( 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐡𝐮̛́𝐚 𝐠𝐢̀ 𝐤𝐡𝐚́𝐜 𝐧𝐠𝐨𝐚̀𝐢 𝐥𝐢𝐧𝐤 )', threadID, messageID);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐱𝐚̉𝐲 𝐫𝐚 𝐥𝐨̂̃𝐢 𝐤𝐡𝐢 𝐚́𝐩 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐝𝐞 𝐦𝐨̛́𝐢 𝐜𝐡𝐨 "${args[0]}.js".`, threadID, messageID);
                        return api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐭𝐡𝐞̂𝐦 𝐜𝐨𝐝𝐞 𝐧𝐚̀𝐲 𝐯𝐚̀𝐨 "${args[0]}.js", 𝐒𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐥𝐨𝐚𝐝 đ𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠!`, threadID, messageID);
                    }
                );
            });
        });
        return
    }
  
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐭𝐡𝐞̂𝐦 𝐜𝐨𝐝𝐞 𝐧𝐚̀𝐲 𝐯𝐚̀𝐨 "${args[0]}.js" 𝐍𝐞̂́𝐮 𝐱𝐚̉𝐲 𝐫𝐚 𝐥𝐨̂̃𝐢 𝐭𝐡𝐢̀ đ𝐨̂̉𝐢 𝐟𝐢𝐥𝐞 𝐝𝐫𝐢𝐯𝐞 𝐡𝐨𝐚̣̆𝐜 𝐭𝐱𝐭 𝐧𝐡𝐞́!`, threadID, messageID);
      }
      catch(e) {
        return api.sendMessage(`[𝘽𝙊𝙏 𝙍𝙮𝙤🎀] »Đ𝐚̃ 𝐱𝐚̉𝐲 𝐫𝐚 𝐥𝐨̂̃𝐢 𝐤𝐡𝐢 𝐚́𝐩 𝐝𝐮̣𝐧𝐠 𝐜𝐨𝐝𝐞 𝐦𝐨̛́𝐢 𝐜𝐡𝐨"${args[0]}.js".`, threadID, messageID);
      }
    }
          }