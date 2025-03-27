/*CMD
  command: /setMaxWithdraw
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

// Get admin input for max withdraw
Bot.sendMessage(`*🔺 Enter New Amount To Set as Maximum Withdrawal\n\nTo Cancel: /cancel*`)
Bot.runCommand("/onSetMaxWithdraw")
