/*CMD
  command: /onSetCurrency
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

// Store the currency and notify the admin
AdminPanel.setFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY",
    value: message
})
Bot.sendMessage(`*✅ The bot currency has been set to: ${message}*`);
