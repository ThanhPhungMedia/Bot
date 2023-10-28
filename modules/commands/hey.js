let
r = require('axios').get,
api = 'https://nguyenlienmanh.com/v2/simi/';

class Module {
    constructor(a) {
        this.config = a;
    };
    run() {};
    handleEvent(o) {
        let
        msg = o.event.body,
        reply = [
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Em đây\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Đã nghe rõ thưa chủ nhân\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Bắt đầu nhận lệnh từ chủ nhân\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Simi đã nghe rõ\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Mời chủ nhân ra mệnh lệnh\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Bắt đầu nghe thánh chỉ từ ngài\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭'
        ];

        if (!!msg)msg = msg.toLowerCase(); else return;
        if ([
            'hey sim',
            'Hey sim',
            'Sim ơi',
            'sim ơi',
            'Sim',
            'sim',
            'Simi ơi',
            'simi ơi',
            'simi',
            'Simi'
        ].includes(msg)) return o.api.sendMessage(reply[Math.random()*reply.length<<0], o.event.threadID, (err, data)=>(data.name = this.config.name, data.status = true, global.client.handleReply.push(data)), o.event.messageID);
    };
    handleReply = async(o)=> {
        let
        _ = o.handleReply,
        $ = o.api.sendMessage,
        msg = o.event.body,
        i;

        if (!!msg)msg = encodeURI(msg); else return;
        if (_.status)i = (await r(`${api}get?ask=${msg}`)).data; else i = (await r(`${api}add?ask=${_.ask}&answer=${msg}`)).data;

        $(i.msg, o.event.threadID, (err, data)=>(data.name = this.config.name, data.status = i.status, data.ask = msg, global.client.handleReply.push(data)), o.event.messageID);
    };
};

module.exports = new Module({
    name: 'simi',
    version: '1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: '.',
    commandCategory: 'người dùng',
    usages: '[.]',
    cooldowns: 0,
});