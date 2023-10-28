module.exports.config = {
    name: "avt",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jukie",
    description: "",
    commandCategory: "Tiện Ích",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs": ""
    }
    
};

module.exports.run = async({api,event,args,Users}) => {
  var token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
     if (args.length == 0) return api.sendMessage(`𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠:\n\n${prefix}${this.config.name} 𝐔𝐬𝐞𝐫 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐚𝐯𝐭 𝐜𝐮̉𝐚 𝐜𝐡𝐢́𝐧𝐡 𝐛𝐚̣𝐧.\n\n${prefix}${this.config.name} 𝐔𝐬𝐞𝐫  @[𝐭𝐚𝐠] => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐚𝐯𝐭 𝐜𝐮̉𝐚 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐚̣𝐧 𝐭𝐚𝐠.\n\n${prefix}${this.config.name} 𝐁𝐨𝐱 => 𝐧𝐨́ 𝐬𝐞̃ 𝐥𝐚̂́𝐲 𝐚𝐯𝐭 𝐛𝐨𝐱 𝐜𝐮̉𝐚  𝐛𝐚̣𝐧 \n\n${prefix}${this.config.name} 𝐔𝐬𝐞𝐫 𝐛𝐨𝐱 𝐭𝐢𝐝 𝐧𝐨́ 𝐬𝐞̃  𝐥𝐚̂́𝐲 𝐚𝐯𝐭 𝐜𝐮̉𝐚 𝐭𝐢𝐝`, event.threadID, event.messageID);
    if (args[0] == "box") {
           if(args[1]){ let threadInfo = await api.getThreadInfo(args[1]);
           let imgg = threadInfo.imageSrc;
       if(!imgg) api.sendMessage(`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 𝐛𝐨𝐱  ${threadInfo.threadName} Đ𝐚̂𝐲`,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:`𝐀𝐯𝐚𝐭𝐚𝐫 𝐛𝐨𝐱  ${threadInfo.threadName} Đ𝐚̂𝐲`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      
      }
          
            let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
          if(!img) api.sendMessage(`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 𝐛𝐨𝐱  ${threadInfo.threadName} Đ𝐚̂𝐲`,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage({body:`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 𝐛𝐨𝐱  ${threadInfo.threadName} Đ𝐚̂𝐲`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };

if (args[0] == "user") { 
    if(!args[1]){
    if(event.type == "message_reply") id = event.messageReply.senderID
    else id = event.senderID;
    var name = (await Users.getData(id)).name
    var callback = () => api.sendMessage({body:`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 Đ𝐚̂𝐲`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=750&width=750&access_token=`+token)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    var name = (await Users.getData(mentions)).name
    var callback = () => api.sendMessage({body:`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 ${name} Đ𝐚̂𝐲`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=750&width=750&access_token=`+token)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
    else {
    var name = (await Users.getData(args[1])).name
    var callback = () => api.sendMessage({body:`𝐀𝐯𝐚𝐭𝐚𝐫 𝐜𝐮̉𝐚 ${name} Đ𝐚̂𝐲`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=750&width=750&access_token=`+token)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
     }
     }
          }
