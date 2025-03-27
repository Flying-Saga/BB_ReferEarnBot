/*CMD
  command: /onEditInlineError
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
  text: "❌ Message is not modified to edit!",
  show_alert: false
})
