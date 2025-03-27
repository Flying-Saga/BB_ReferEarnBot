/*CMD
  command: /onAddChannel
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

// Cancel Process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Validate input username
if (!isValidTelegramUsername(message)) {
    return Bot.sendMessage("*❌ Invalid Username!*");
}

// Add channel in list with validation
let channelList = Bot.getProp("membershipChannels", [])
if (channelList.includes(message)) {
    return Bot.sendMessage("*❌ Username already exist!*");
}
channelList.push(message)

// Save the channels list and notify the admin
Bot.setProperty("membershipChannels", channelList, "json");
Bot.sendMessage(`*✅ New channel has been added: ${message}*`)


// Function for telegram username validation
function isValidTelegramUsername(username) {
    // Check if username starts with @ and has at least 5 and max 32 characters
    if (!/^@[a-zA-Z0-9_]{4,31}$/.test(username)) {
        return false;
    }
    return true;
}
