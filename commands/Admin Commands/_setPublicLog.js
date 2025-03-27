/*CMD
  command: /setPublicLog
  help: 
  need_reply: false
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

// Get admin input for channel username
Bot.sendMessage(`*🎁 Enter Public Log Channel Username or ID\n\ne.g. @demo_channel, -1234567890, etc...\n\nTo Cancel: /cancel*`)
Bot.runCommand("/onSetPublicLog")
