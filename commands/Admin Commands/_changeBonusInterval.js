/*CMD
  command: /changeBonusInterval
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin Commands
  answer: 
  keyboard: 
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

// Get admin input for bonus time interval
Bot.sendMessage(`*⏰ Enter Bonus Time Interval in Hours\n\nTo Cancel: /cancel*`)
Bot.runCommand("/onChangeBonusInterval")
