/*CMD
  command: /onMsgUser2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Verify if the user is an admin
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
if ( !admin || admin !== user.telegramid ) {
    return;
}

// Cancel process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Handle user message and notify admin
if (options) {
    var user_id = options.user_id
} else {
    return;
}
onMessageReceived(request, user_id);
Bot.sendMessage("*✅ Message Has Been Sent To User!*")

// Function to send message to user
function onMessageReceived(msg, user_id) {    
    
    // Default caption format
    let caption = msg.caption ? msg.caption : "";
    let header = `<b>☎️ Response received from admin:\n\n💬 Message:</> `;
    let editedCaption = cleanMessage(header + (caption || "No caption provided."));

    if (msg.text) {
        let formattedText = cleanMessage(msg.text)
      
        // Handle text messages
        Api.sendMessage({
            chat_id: user_id,
            text: header + formattedText,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.photo.length > 0) {
        // Handle photos
        let photo = msg.photo[msg.photo.length - 1].file_id;
        Api.sendPhoto({
            chat_id: user_id,
            photo: photo,
            caption: editedCaption,
            parse_mode: "HTML"
        })
    } else if (msg.video) {
        // Handle videos
        Api.sendVideo({
            chat_id: user_id,
            video: msg.video.file_id,
            caption: editedCaption,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    } else if (msg.voice) {
        // Handle voice messages
        Api.sendVoice({
            chat_id: user_id,
            voice: msg.voice.file_id,
            caption: editedCaption,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.audio) {
        // Handle audio file
        Api.sendAudio({
            chat_id: user_id,
            audio: msg.audio.file_id,
            caption: editedCaption,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.document) {
        // Handle documents
        Api.sendDocument({
            chat_id: user_id,
            document: msg.document.file_id,
            caption: editedCaption,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.sticker) {
        // Handle stickers
        Api.sendSticker({
            chat_id: user_id,
            sticker: msg.sticker.file_id
        })
    } else if (msg.animation) {
        // Handle gif
        Api.sendAnimation({
            chat_id: user_id,
            animation: msg.animation.file_id,
            caption: editedCaption,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.contact) {
        // Handle contacts
        let contact = msg.contact
        let contactName = contact.first_name;
        if (contact.last_name) {
            contactName += " " + contact.last_name;
        }
        let contactInfo = `<b>☎️ Contact received from admin:\n\n👤 Name: ${contactName}\n🆔 ID: <code>${contact.user_id}</>\n\n📱 Phone: ${contact.phone_number}</>`
        Api.sendMessage({
            chat_id: user_id,
            text: contactInfo,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.location) {
        // Handle locations
        Api.sendLocation({
            chat_id: user_id,
            latitude: msg.location.latitude,
            longitude: msg.location.longitude
        });
        Api.sendMessage({
            chat_id: user_id,
            text: `<b>📍 Location received from admin.</>`,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    } else if (msg.video_note) {
        // Handle video notes
        Api.sendVideoNote({
            chat_id: user_id,
            video_note: msg.video_note.file_id
        });
        Api.sendMessage({
            chat_id: user_id,
            text: `<b>📸 Video note received from admin.</>`,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    }
}

// Function to remove *, _, ~, and `
function cleanMessage(text) {
    return text.replace(/[*_~`]/g, "");
}
