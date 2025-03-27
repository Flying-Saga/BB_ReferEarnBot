/*CMD
  command: /updatePanelError
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Error Handler

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "✅ Panel Data Updated!",
  show_alert: false
})
