/*CMD
  command: /onBroadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast Commands

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

Bot.runAll( {
    command: "/broadcastMsg",
    for_chats: "private-chats",
    on_create: "/onBroadcastTask",
    options: { fromChatId: user.telegramid, messageId: request.message_id }
} )
