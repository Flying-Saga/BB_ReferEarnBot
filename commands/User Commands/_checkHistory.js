/*CMD
  command: /checkHistory
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

let historyList = User.getProp("historyList", []);
let txt = "";

if (historyList.length < 1) {
    txt = "History is Empty"
} else {
    for (let i = 0; i < historyList.length; i++) {
        txt += `${i + 1}. ${historyList[i]}\n\n`;
    }
}

// Edit message to show broadcast status
const button = [
    [{ text: "⬅️ Back", callback_data: "/profile back" }],
]
Api.editMessageText({
    text: `<b>📃 Transaction History [Recent 10]:

${txt} 
</>`,
    parse_mode: "HTML",
    message_id: request.message.message_id,
    reply_markup: { inline_keyboard: button },
    disable_web_page_preview: true
})
