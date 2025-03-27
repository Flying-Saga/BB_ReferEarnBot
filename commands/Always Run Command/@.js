/*CMD
  command: @
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Always Run Command

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Verify if the user is an admin
let adminID = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})

if (adminID !== user.telegramid) {
    if (Bot.getProp(`${user.telegramid}-status`)) {
        return Api.sendMessage({
            text: "*🚫 You have been banned from using this bot!*",
            parse_mode: "markdown",
            reply_markup: { hide_keyboard: true }
        });
    }
}
