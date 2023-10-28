module.exports.config = {
    "name": "setting",
    "version": "1.0.0",
    "hasPermssion": 3,
    "credits": "Trịnh Quốc Đại",
    "description": "config bot!",
    "commandCategory": "ADMIN",
    "cooldowns": 5
};

module.exports.languages = {
  "vi": {},
  "en": {}
};

const appState = require("../../appstate.json");
const cookie = appState.map(item => item = item.key + "=" + item.value).join(";");
const headers = {
  "Host": "mbasic.facebook.com",
  "user-agent": "Mozilla/5.0 (Linux; Android 11; M2101K7BG Build/RP1A.200720.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "same-origin","sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "referer": "https://mbasic.facebook.com/?refsrc=deprecated&_rdr",
  "accept-encoding": "gzip, deflate",
  "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": cookie
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const botID = api.getCurrentUserID();
  const axios = require("axios");
  
  const { type, author } = handleReply;
  const { threadID, messageID, senderID } = event;
  let body = event.body || "";
  if (author != senderID) return;
  
  const args = body.split(" ");
  
  const reply = function(msg, callback) {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };
  
  if (type == 'menu') {
    if (["01", "1", "02", "2"].includes(args[0])) {
      reply(`Hãy phản hồi tin nhắn này với ${["01", "1"].includes(args[0]) ? "bio" : "biệt danh"} bạn muốn đổi cho bot hoặc 'delete' nếu muốn xóa ${["01", "1"].includes(args[0]) ? "bio" : "biệt danh"} hiện tại`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: ["01", "1"].includes(args[0]) ?  "changeBio" : "changeNickname"
        });
      });
    }
    else if (["03", "3"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["PENDING"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Tin nhắn: ${b.snippet}\n`, "");
      return reply(`Danh sách tin nhắn chờ của bot:\n\n${msg}`);
    }
    else if (["04", "4"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["unread"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Tin nhắn: ${b.snippet}\n`, "") || "Không có tin nhắn nào";
      return reply(`Danh sách tin nhắn chưa đọc của bot:\n\n${msg}`);
    }
    else if (["05", "5"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["OTHER"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Tin nhắn: ${b.snippet}\n`, "") || "Không có tin nhắn nào";
      return reply(`Danh sách tin nhắn spam của bot:\n\n${msg}`);
    }
    else if (["06", "6"].includes(args[0])) {
      reply(`Phản hồi tin nhắn này kèm ảnh hoặc link ảnh muốn đổi thành avatar bot`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "changeAvatar"
        });
      });
    }
    else if (["07", "7"].includes(args[0])) {
      if (!args[1] || !["on", "off"].includes(args[1])) return reply('Vui lòng chọn on hoặc off');
      const form = {
        av: botID,
    		variables: JSON.stringify({
          "0": {
            is_shielded: args[1] == 'on' ? true : false,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          }
    		}),
    		doc_id: "1477043292367183"
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (err, data) => {
        if (err || JSON.parse(data).errors) reply("Đã xảy ra lỗi, vui lòng thử lại sau");
        else reply(`» Đã ${args[1] == 'on' ? 'bật' : 'tắt'} khiên avatar của bot thành công`);
      });
    }
    else if (["08", "8"].includes(args[0])) {
      return reply(`Phản hồi tin nhắn này với id của người bạn muốn chặn, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "blockUser"
        });
      });
    }
    else if (["09", "9"].includes(args[0])) {
      return reply(`Phản hồi tin nhắn này với id của người bạn muốn bỏ chặn, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "unBlockUser"
        });
      });
    }
    else if (["10"].includes(args[0])) {
      return reply(`Phản hồi tin nhắn này với nội dung muốn tạo bài viết`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "createPost"
        });
      });
    }
    else if (["11"].includes(args[0])) {
      return reply(`Phản hồi tin nhắn này với id bài viết bạn muốn xóa, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "deletePost"
        });
      });
    }
    else if (["12", "13"].includes(args[0])) {
      return reply(`Phản hồi tin nhắn này với postID muốn comment (bài viết ${args[0] == "12" ? "của user" : "trên group"}), có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "choiceIdCommentPost",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["14", "15", "16", "17", "18", "19"].includes(args[0])) {
      reply(`Phản hồi tin nhắn này kèm id bài viết muốn ${args[0]  == "13" ? "thả cảm xúc" : args[0] == "14" ? "gửi lời mời kết bạn" : args[0] == "15" ? "chấp nhận lời mời kết bạn" : args[0] == "16" ? "từ chối lời mời kết bạn" : args[0] == "17" ? "xóa bạn bè" : "gửi tin nhắn"}, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: args[0] == "14" ? "choiceIdReactionPost" : args[0] == "15" ? "addFiends" : args[0] == "16" ? "acceptFriendRequest" : args[0] == "17" ? "deleteFriendRequest" : args[0] == "18" ? "unFriends" : "choiceIdSendMessage"
        });
      });
    }
    else if (["20"].includes(args[0])) {
      reply('Phản hồi tin nhắn này kèm đoạn code bạn muốn tạo ghi chú', (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "noteCode",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["21"].includes(args[0])) {
      api.logout((e) => {
        if (e) return reply('Đã xảy ra lỗi, vui lòng thử lại sau');
        else console.log('»» LOGOUT SUCCESS ««');
      });
    }
  }
  
  
  else if (type == 'changeBio') {
    const bio = body.toLowerCase() == 'delete' ? '' : body;
    api.changeBio(bio, false, (err) => {
      if (err) return reply("Đã xảy ra lỗi, vui lòng thử lại sau");
      else return reply(`Đã ${!bio ? "xóa tiểu sử của bot thành công" : `thay đổi tiểu sử bot thành: ${bio}`}`);
    });
  }
  
  
  else if (type == 'changeNickname') {
    const nickname = body.toLowerCase() == 'delete' ? '' : body;
    let res = (await axios.get('https://mbasic.facebook.com/' + botID + '/about', {
      headers,      
			params: {
        nocollections: "1",
        lst: `${botID}:${botID}:${Date.now().toString().slice(0, 10)}`,
        refid: "17"
      }
    })).data;
		require('fs-extra').writeFileSync(__dirname+"/cache/resNickname.html", res);
    
    let form;
    if (nickname) {
      const name_id = res.includes('href="/profile/edit/info/nicknames/?entid=') ? res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0] : null;
      
      const variables = {
        collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          name_text: nickname,
          name_type: "NICKNAME",
          show_as_display_name: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random()*19).toString()
        },
        scale: 3,
        sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64')
      };
      
      if (name_id) variables.input.name_id = name_id;
      
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometNicknameSaveMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4126222767480326",
      	variables: JSON.stringify(variables)
      };
    }
    else {
      if (!res.includes('href="/profile/edit/info/nicknames/?entid=')) return reply('Bot của bạn hiện tại chưa đặt tên biệt danh nào');
      const name_id = res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0];
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometAboutFieldItemDeleteMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4596682787108894",
      	variables: JSON.stringify({
      	  collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
      	  input: {
      	    entid: name_id,
      	    field_type: "nicknames",
      	    actor_id: botID,
      	    client_mutation_id: Math.round(Math.random()*19).toString()
      	  },
      	  scale: 3,
      	  sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64'),
      	  isNicknameField: true,
      	  useDefaultActor: false
      	})
      };
    }
    
    api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
      if (e) return reply(`Đã xảy ra lỗi, vui lòng thử lại sau`);
      else if (JSON.parse(i).errors) reply(`Đã xảy ra lỗi: ${JSON.parse(i).errors[0].summary}, ${JSON.parse(i).errors[0].description}`);
      else reply(`Đã ${!nickname ? "xoá tên biệt danh của bot thành công" : `đổi tên biệt danh của bot thành: ${nickname}`}`);
    });
  }
  
  
  else if (type == 'changeAvatar') {
    let imgUrl;
    if (body && body.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g))imgUrl = body;
    else if (event.attachments[0] && event.attachments[0].type == "photo") imgUrl = event.attachments[0].url;
    else return reply(`Vui lòng nhập link hình ảnh hợp lệ hoặc phản hồi tin nhắn kèm một ảnh muốn đặt làm avatar cho bot`, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "changeAvatar"
      });
    });
    try {
      const imgBuffer = (await axios.get(imgUrl, {
        responseType: "stream"
      })).data;
      const form0 = {
        file: imgBuffer
      };
      let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form0);
      uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
      if (uploadImageToFb.error) return reply("Đã xảy ra lỗi: " + uploadImageToFb.error.errorDescription);
      const idPhoto = uploadImageToFb.payload.fbid;
      const form = {
        av: botID,
  			fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: "5066134240065849",
  			variables: JSON.stringify({
          input: {
            caption: "",
            existing_photo_id: idPhoto,
            expiration_time: null,
            profile_id: botID,
            profile_pic_method: "EXISTING",
            profile_pic_source: "TIMELINE",
            scaled_crop_rect: {
              height: 1,
              width: 1,
              x: 0,
              y: 0
            },
            skip_cropping: true,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          isPage: false,
          isProfile: true,
          scale: 3
        })
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
        if (e) reply(`Đã xảy ra lỗi, vui lòng thử lại sau`);
        else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) reply(`Đã xảy ra lỗi: ${JSON.parse(i).errors[0].description}`);
        else reply(`Đã thay đổi avatar cho bot thành công`);
      });
    }
    catch(err) {
      reply(`Đã xảy ra lỗi, vui lòng thử lại sau`);
    }
  }
  
  
  else if (type == 'blockUser') {
    if (!body) return reply("Vui lòng nhập uid của những người bạn muốn chặn trên messenger, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'blockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, true);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`» Đã chặn thành công ${success.length} người dùng trên messenger${failed.length > 0 ? `\n» Chặn thất bại ${failed.length} người dùng, id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'unBlockUser') {
    if (!body) return reply("Vui lòng nhập uid của những người bạn muốn bỏ chặn trên messenger, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'unBlockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, false);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`» Đã bỏ chặn thành công ${success.length} người dùng trên messenger${failed.length > 0 ? `\n» Bỏ chặn thất bại ${failed.length} người dùng, id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'createPost') {
    if (!body) return reply("Vui lòng nhập nội dung muốn tạo bài viết", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'createPost'
      });
    });
	
    const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4612917415497545",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": body
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": null,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": null,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 0,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": false,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) return reply(`Tạo bài viết thất bại, vui lòng thử lại sau`);
      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      return reply(`» Đã tạo bài viết thành công\n» postID: ${postID}\n» urlPost: ${urlPost}`);
    });
  }
  
  
  else if (type == 'choiceIdCommentPost') {
    if (!body) return reply('Vui lòng nhập id của post bạn muốn comment', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdCommentPost",
        isGroup: handleReply.isGroup
      });
    })
    reply("Phản hồi tin nhắn này kèm nội dung bạn muốn comment cho bài viết", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        postIDs: body.replace(/\s+/g, " ").split(" "),
        type: "commentPost",
        isGroup: handleReply.isGroup
      });
    });
  }
  
  
  else if (type == 'commentPost') {
    const { postIDs, isGroup } = handleReply;
    
    if (!body) return reply('Vui lòng nhập nội dung bạn muốn comment cho bài viết', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "commentPost",
        postIDs: handleReply.postIDs,
        isGroup: handleReply.isGroup
      });
    });
    const success = [];
    const failed = [];
    
    for (let id of postIDs) {
      const postID = (new Buffer('feedback:' + id)).toString('base64');
      const { isGroup } = handleReply;
      const ss1 = getGUID();
      const ss2 = getGUID();
      
      const form = {
        av: botID,
        fb_api_req_friendly_name: "CometUFICreateCommentMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4744517358977326",
        variables: JSON.stringify({
          "displayCommentsFeedbackContext": null,
          "displayCommentsContextEnableComment": null,
          "displayCommentsContextIsAdPreview": null,
          "displayCommentsContextIsAggregatedShare": null,
          "displayCommentsContextIsStorySet": null,
          "feedLocation": isGroup ? "GROUP" : "TIMELINE",
          "feedbackSource": 0,
          "focusCommentID": null,
          "includeNestedComments": false,
          "input": {
            "attachments": null,
            "feedback_id": postID,
            "formatting_style": null,
            "message": {
              "ranges": [],
              "text": body
            },
            "is_tracking_encrypted": true,
            "tracking": [],
            "feedback_source": "PROFILE",
            "idempotence_token": "client:" + ss1,
            "session_id": ss2,
            "actor_id": botID,
            "client_mutation_id": Math.round(Math.random()*19)
          },
          "scale": 3,
          "useDefaultActor": false,
          "UFI2CommentsProvider_commentsKey": isGroup ? "CometGroupDiscussionRootSuccessQuery" : "ProfileCometTimelineRoute"
        })
      };
      
      try {
        const res = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(res).errors) failed.push(id);
        else success.push(id);
      }
      catch(err) {
        failed.push(id);
      }
    }
    reply(`» Đã comment thành công ${success.length} bài viết${failed.length > 0 ? `\n» Comment thất bại ${failed.length} bài viết, postID: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'deletePost') {
    const postIDs = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const postID of postIDs) {
  		let res;
  		try {
  		  res = (await axios.get('https://mbasic.facebook.com/story.php?story_fbid='+postID+'&id='+botID, {
           headers
        })).data;
  		}
  		catch (err) {
  		  reply("Đã xảy ra lỗi, id bài viết không tồn tại hoặc bạn không phải chủ của bài viết này");
  		}
      
      const session_ID = decodeURIComponent(res.split('session_id%22%3A%22')[1].split('%22%2C%22')[0]);
      const story_permalink_token = decodeURIComponent(res.split('story_permalink_token=')[1].split('&amp;')[0]);
			console.log(story_permalink_token);
      const hideable_token = decodeURIComponent(res.split('%22%2C%22hideable_token%22%3A%')[1].split('%22%2C%22')[0]);
      
      let URl = 'https://mbasic.facebook.com/nfx/basic/direct_actions/?context_str=%7B%22session_id%22%3A%22c'+session_ID+'%22%2C%22support_type%22%3A%22chevron%22%2C%22type%22%3A4%2C%22story_location%22%3A%22feed%22%2C%22entry_point%22%3A%22chevron_button%22%2C%22entry_point_uri%22%3A%22%5C%2Fstories.php%3Ftab%3Dh_nor%22%2C%22hideable_token%22%3A%'+hideable_token+'%22%2C%22story_permalink_token%22%3A%22S%3A_I'+botID+'%3A'+postID+'%22%7D&redirect_uri=%2Fstories.php%3Ftab%3Dh_nor&refid=8&__tn__=%2AW-R';
  		
      res = (await axios.get(URl, {
        headers
      })).data;
      
      URl = res.split('method="post" action="/nfx/basic/handle_action/?')[1].split('"')[0];
      URl = "https://mbasic.facebook.com/nfx/basic/handle_action/?" + URl
        .replace(/&amp;/g, '&')
        .replace("%5C%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed')
        .replace("%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed');
  		fb_dtsg = res.split('type="hidden" name="fb_dtsg" value="')[1].split('" autocomplete="off" /><input')[0];
      jazoest = res.split('type="hidden" name="jazoest" value="')[1].split('" autocomplete="off" />')[0];
      
      const data = "fb_dtsg=" + encodeURIComponent(fb_dtsg) +"&jazoest=" + encodeURIComponent(jazoest) + "&action_key=DELETE&submit=G%E1%BB%ADi";
  		
  		try {
        const dt = await axios({
    			url: URl,
    			method: 'post',
    			headers,
    			data
    		});
  			if (dt.data.includes("Rất tiếc, đã xảy ra lỗi")) throw new Error();
  			success.push(postID);
  		}
  		catch(err) {
  			failed.push(postID);
  		};
    }
    reply(`» Đã xóa thành công ${success.length} bài viết${failed.length > 0 ? `\n»Xóa thất bại ${failed.length} bài viết, postID: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdReactionPost') {
    if (!body) return reply(`Vui lòng nhập id bài viết bạn muốn reaction`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdReactionPost"
      });
    });
    
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    reply(`Nhập cảm xúc bạn muốn reaction cho ${listID.length} bài viết (unlike/like/love/heart/haha/wow/sad/angry)`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      });
    })
  }
  
  
  else if (type == 'reactionPost') {
    const success = [];
    const failed = [];
    const postIDs = handleReply.listID;
    const feeling = body.toLowerCase();
    if (!'unlike/like/love/heart/haha/wow/sad/angry'.split('/').includes(feeling)) return reply('Vui lòng chọn một trong những cảm xúc sau unlike/like/love/heart/haha/wow/sad/angry', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      })
    });
    for (const postID of postIDs) {
      try {
        await api.setPostReaction(Number(postID), feeling);
        success.push(postID);
      }
      catch(err) {
        failed.push(postID);
      }
    }
    reply(`» Đã thả cảm xúc ${feeling} cho ${success.length} bài viết thành công${failed.length > 0 ? `» Reaction thất bại ${failed.length} bài viết, postID: ${failed.join(" ")}` : ''}`);
  }
  
  
  else if (type == 'addFiends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
  			av: botID,
  			fb_api_caller_class: "RelayModern",
  			fb_api_req_friendly_name: "FriendingCometFriendRequestSendMutation",
  			doc_id: "5090693304332268",
        variables: JSON.stringify({
  				input: {
            friend_requestee_ids: [uid],
            refs: [null],
            source: "profile_button",
            warn_ack_for_ids: [],
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3
  			})
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(uid);
        else success.push(uid)
      }
      catch(e) {
        failed.push(uid);
      };
    }
    reply(`» Đã gửi lời mời kết bạn thành công cho ${success.length} id${failed.length > 0 ? `\n» Gửi lời mời kết bạn đến ${failed.length} id thất bại: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdSendMessage') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    reply(`Nhập nội dung tin nhắn bạn muốn gửi cho ${listID.length} user`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "sendMessage"
      });
    })
  }
  
  
  else if (type == 'unFriends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const idUnfriend of listID) {
      const form = {
        av: botID,
        fb_api_req_friendly_name: "FriendingCometUnfriendMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4281078165250156",
        variables: JSON.stringify({
          input: {
            source: "bd_profile_button",
            unfriended_user_id: idUnfriend,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          },
          scale:3
        })
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(`${idUnfriend}: ${JSON.parse(sendAdd).errors[0].summary}`);
        else success.push(idUnfriend)
      }
      catch(e) {
        failed.push(idUnfriend);
      };
    }
    reply(`» Đã xóa thành công ${success.length} bạn bè${failed.length > 0 ? `\n» Xóa thất bại ${failed.length} bạn bè:\n${failed.join("\n")}` : ""}`);
  }
  
  
  else if (type == 'sendMessage') {
    const listID = handleReply.listID;
    const success = [];
    const failed = [];
    for (const uid of listID) {
      try {
        const sendMsg = await api.sendMessage(body, uid);
        if (!sendMsg.messageID) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`» Đã gửi tin nhắn thành công cho ${success.length} user${failed.length > 0 ? `\n» Gửi tin nhắn đến ${failed.length} user thất bại: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'acceptFriendRequest' || type == 'deleteFriendRequest') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
        av: botID,
  			fb_api_req_friendly_name: type == 'acceptFriendRequest' ? "FriendingCometFriendRequestConfirmMutation" : "FriendingCometFriendRequestDeleteMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: type == 'acceptFriendRequest' ? "3147613905362928" : "4108254489275063",
  			variables: JSON.stringify({
          input: {
            friend_requester_id: uid,
            source: "friends_tab",
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3,
          refresh_num: 0
  			})
      };
      try {
        const friendRequest = await api.httpPost("https://www.facebook.com/api/graphql/", form);
        if (JSON.parse(friendRequest).errors) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`» Đã ${type == 'acceptFriendRequest' ? 'chấp nhận' : 'xóa'} lời mời kết bạn thành công của ${success.length} id${failed.length > 0 ? `\n» Thất bại với ${failed.length} id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'noteCode') {
    axios({
      url: 'https://buildtool.dev/verification',
      method: 'post',
      data: `content=${encodeURIComponent(body)}&code_class=language${encodeURIComponent('-')}javascript`
    })
    .then(response => {
      const href = response.data.split('<a href="code-viewer.php?')[1].split('">Permanent link</a>')[0];
      reply(`Tạo ghi chú thành công, link: ${'https://buildtool.dev/code-viewer.php?' + href}`)
    })
    .catch(err => {
      reply('Đã xảy ra lỗi, vui lòng thử lại sau');
    })
  }
};


module.exports.run = async ({ event, api }) => {
  const { threadID, messageID, senderID } = event;
  
  api.sendMessage("⚙️===[ 𝐂𝐎𝐍𝐅𝐈𝐆 𝐁𝐎𝐓 ]===⚙️"
     + "\n\n[𝟬𝟭] 𝗖𝗵𝗶̉𝗻𝗵 𝘀𝘂̛̉𝗮 𝘁𝗶𝗲̂̉𝘂 𝘀𝘂̛̉ 𝗯𝗼𝘁"
     + "\n[𝟬𝟮] 𝗖𝗵𝗶̉𝗻𝗵 𝘀𝘂̛̉𝗮 𝘁𝗲̂𝗻 𝗯𝗶𝗲̣̂𝘁 𝗱𝗮𝗻𝗵 𝗰𝘂̉𝗮 𝗯𝗼𝘁"
     + "\n[𝟬𝟯] 𝗫𝗲𝗺 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝗵𝗼̛̀"
     + "\n[𝟬𝟰] 𝗫𝗲𝗺 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝗵𝘂̛𝗮 𝘀𝗲𝗲𝗻"
     + "\n[𝟬𝟱] 𝗫𝗲𝗺 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘀𝗽𝗮𝗺"
     + "\n[𝟬𝟲] 𝗧𝗵𝗮𝘆 𝗮𝘃𝗮𝘁𝗮𝗿 𝗯𝗼𝘁"
     + "\n[𝟬𝟳] 𝗕𝗮̣̂𝘁 𝗸𝗵𝗶𝗲̂𝗻 𝗮𝘃𝗮𝘁𝗮𝗿 𝗯𝗼𝘁 [𝗼𝗻/𝗼𝗳𝗳]"
     + "\n[𝟬𝟴] 𝗖𝗵𝗮̣̆𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 (𝗺𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿)"
     + "\n[𝟬𝟵] 𝗕𝗼̉ 𝗰𝗵𝗮̣̆𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 (𝗺𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿)"
     + "\n[𝟭𝟬] 𝗧𝗮̣𝗼 𝗯𝗮̀𝗶 𝘃𝗶𝗲̂́𝘁"
     + "\n[𝟭𝟭] 𝗫𝗼́𝗮 𝗯𝗮̀𝗶 𝘃𝗶𝗲̂́𝘁"
     + "\n[𝟭𝟮] 𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗯𝗮̀𝗶 𝘃𝗶𝗲̂́𝘁 (𝘂𝘀𝗲𝗿)"
     + "\n[𝟭𝟯] 𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗯𝗮̀𝗶 𝘃𝗶𝗲̂́𝘁 (𝗴𝗿𝗼𝘂𝗽)"
     + "\n[𝟭𝟰] 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 𝗯𝗮̀𝗶 𝘃𝗶𝗲̂́𝘁"
     + "\n[𝟭𝟱] 𝗞𝗲̂́𝘁 𝗯𝗮̣𝗻 𝗯𝗮̆̀𝗻𝗴 𝗜𝗗"
     + "\n[𝟭𝟲] 𝗖𝗵𝗮̂́𝗽 𝗻𝗵𝗮̣̂𝗻 𝗹𝗼̛̀𝗶 𝗺𝗼̛̀𝗶 𝗸𝗲̂́𝘁 𝗯𝗮̣𝗻 𝗯𝗮̆̀𝗻𝗴 𝗜𝗗"
     + "\n[𝟭𝟳] 𝗧𝘂̛̀ 𝗰𝗵𝗼̂́𝗶 𝗹𝗼̛̀𝗶 𝗺𝗼̛̀𝗶 𝗸𝗲̂́𝘁 𝗯𝗮̣𝗻 𝗯𝗮̆̀𝗻𝗴 𝗜𝗗"
     + "\n[𝟭𝟴] 𝗫𝗼́𝗮 𝗯𝗮̣𝗻 𝗯𝗲̀ 𝗯𝗮̆̀𝗻𝗴 𝗜𝗗"
     + "\n[𝟭𝟵] 𝗚𝘂̛̉𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗯𝗮̆̀𝗻𝗴 𝗜𝗗"
     + "\n[𝟮𝟬] 𝗧𝗮̣𝗼 𝗴𝗵𝗶 𝗰𝗵𝘂́ 𝘁𝗿𝗲̂𝗻 𝗯𝘂𝗶𝗹𝗱𝘁𝗼𝗼𝗹.𝗱𝗲𝘃"
     + "\n[𝟮𝟭] 𝗟𝗼𝗴𝗼𝘂𝘁 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗯𝗼𝘁"
    + "\n──────────────"
    + `\n» 𝐀𝐝𝐦𝐢𝐧 𝐈𝐃:\n${global.config.ADMINBOT.join("\n")}`
    + `\n» 𝐁𝐨𝐭 𝐈𝐃: ${api.getCurrentUserID()}`
    + `\n» 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐤𝐞̀𝐦 𝐒𝐓𝐓 𝐜𝐮̉𝐚 𝐥𝐞̣̂𝐧𝐡 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐭𝐡𝐮̛̣𝐜 𝐡𝐢𝐞̣̂𝐧 💙`
    + "\n──────────────", threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: senderID,
      type: "menu"
    });
  }, messageID);
};


function getGUID() {
    const key = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
    let timeNow = Date.now(),
        r = key.replace(/[xy]/g, function (info) {
            let a = Math.floor((timeNow + Math.random() * 16) % 16);
            timeNow = Math.floor(timeNow / 16);
            let b = (info == 'x' ? a : a & 7 | 8).toString(16);
            return b;
        });
  console.log(r)
    return r;
}
getGUID()
////muhahhahahaha encode cái dmm