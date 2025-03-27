/*CMD
  command: /support
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📞 support
  group: 
CMD*/

const button = [
    [{ text: "⁉️ FAQs", callback_data: "/FAQs edit" }],
]

const txt = `<b>📞 Enter Your Support Message For Admin

➡️ Any Type Message is Accepted

To Cancel: /cancel</>`

if (params === "edit") {
    return Api.editMessageText({
        text: txt,
        parse_mode: "HTML",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: button },
    });
}

Api.sendMessage({
    text: txt,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: button }
});
Bot.runCommand("/onSupport")
