/*CMD
  command: /logError
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

// Verify if the user is an admin
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
if ( !admin ) {
    return;
}

Api.sendMessage({
    chat_id: admin,
    text: "<b>⚠️ Error Alert in Bot #error\n\n❗Error: Unable to send log message in channel: </> <code>" + params + "</>",
    parse_mode: "HTML",
});
