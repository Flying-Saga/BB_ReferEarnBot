/*CMD
  command: /broadcastMsg
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Broadcast Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (options) {
    Api.copyMessage({ chat_id: user.telegramid, from_chat_id: options.fromChatId, message_id: options.messageId })
}
