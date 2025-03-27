/*CMD
  command: /cancelWithdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: User Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!params) {
    return;
}

const withInfo = Bot.getProp(`withdrawInfo-${params}`)
if (withInfo.user.telegramid !== user.telegramid) {
    return;
}

Api.editMessageText({
    text: "<b>❌ Withdrawal Request Cancelled!</>",
    parse_mode: "HTML",
    message_id: request.message.message_id,
})
Bot.deleteProp(`withdrawInfo-${params}`)
