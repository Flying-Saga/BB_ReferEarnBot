/*CMD
  command: /onBanUser
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

// Validate input: check if message is a positive number
if (!isPositiveNumber(message)) {
    return Bot.sendMessage("*❌ Invalid User Telegram ID!*");
}

if (Bot.getProp(`${message}-status`)) {
    return Bot.sendMessage("*❌ This User is Already BAnned in This Bot!*");
}

// Store the user status as banned user and notify the admin
Bot.setProp({ name: `${message}-status`, value: true });
Bot.sendMessage("*⛔ User (*`" + message + "`*) has been banned from using this bot!*")


// Function to check if a value is a positive number
function isPositiveNumber(value) {
    let num = Number(value);
    return !isNaN(num) && num > 0;
}
