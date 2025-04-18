/*CMD
  command: /onSupport
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Cancel process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Get admin id
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
if ( !admin ) {
    return Bot.sendMessage("*❌ Sorry, Currently bot does not have any admin!*");
}

// Handle message and notify user
onMessageReceived(request);
Bot.sendMessage("*✅ Message Has Been Sent To Admin!*")

// Function to send message to admin
function onMessageReceived(msg) {
    let userId = user.telegramid;
    let userLink = generateUserLink(user);
    
    // Default caption format
    let caption = msg.caption ? msg.caption : "";
    let header = `<b>📞 New support message received from ${userLink} (<code>${userId}</>):\n\n💬 Message:</> `;
    let editedCaption = cleanMessage(header + (caption || "No caption provided."));

    // Inline keyboard button for replying
    let replyButton = {
        inline_keyboard: [[{ text: "Reply User", callback_data: `/replyUser ${userId}` }]]
    };

    if (msg.text) {
        let formattedText = cleanMessage(msg.text)
      
        // Handle text messages
        Api.sendMessage({
            chat_id: admin,
            text: header + formattedText,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.photo.length > 0) {
        // Handle photos
        let photo = msg.photo[msg.photo.length - 1].file_id;
        Api.sendPhoto({
            chat_id: admin,
            photo: photo,
            caption: editedCaption,
            reply_markup: replyButton,
            parse_mode: "HTML"
        })
    } else if (msg.video) {
        // Handle videos
        Api.sendVideo({
            chat_id: admin,
            video: msg.video.file_id,
            caption: editedCaption,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    } else if (msg.voice) {
        // Handle voice messages
        Api.sendVoice({
            chat_id: admin,
            voice: msg.voice.file_id,
            caption: editedCaption,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.audio) {
        // Handle audio file
        Api.sendAudio({
            chat_id: admin,
            audio: msg.audio.file_id,
            caption: editedCaption,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.document) {
        // Handle documents
        Api.sendDocument({
            chat_id: admin,
            document: msg.document.file_id,
            caption: editedCaption,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.sticker) {
        // Handle stickers
        Api.sendSticker({
            chat_id: admin,
            sticker: msg.sticker.file_id
        })
    } else if (msg.animation) {
        // Handle gif
        Api.sendAnimation({
            chat_id: admin,
            animation: msg.animation.file_id,
            caption: editedCaption,
            reply_markup: replyButton,
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
        let contactInfo = `<b>☎️ Contact from ${userLink} (<code>${userId}</>):\n\n👤 Name: ${contactName}\n🆔 ID: <code>${contact.user_id}</>\n\n📱 Phone: ${contact.phone_number}</>`
        Api.sendMessage({
            chat_id: admin,
            text: contactInfo,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    } else if (msg.location) {
        // Handle locations
        Api.sendLocation({
            chat_id: admin,
            latitude: msg.location.latitude,
            longitude: msg.location.longitude
        });
        Api.sendMessage({
            chat_id: admin,
            text: `<b>📍 Location from ${userLink} (<code>${userId}</>):</>`,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    } else if (msg.video_note) {
        // Handle video notes
        Api.sendVideoNote({
            chat_id: admin,
            video_note: msg.video_note.file_id
        });
        Api.sendMessage({
            chat_id: admin,
            text: `<b>📸 Video note from ${userLink} (<code>${userId}</>):</>`,
            reply_markup: replyButton,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
    }
}

// Function to remove *, _, ~, and `
function cleanMessage(text) {
    return text.replace(/[*_~`]/g, "");
}

// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
