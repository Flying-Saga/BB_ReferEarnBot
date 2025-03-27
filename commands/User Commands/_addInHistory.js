/*CMD
  command: /addInHistory
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

if (options) {
    let historyList = User.getProp("historyList", [])
    historyList.unshift(options.text)

    // Rremove last item if greater then 10 to store only 10
    if (historyList.length > 10) {
        historyList.pop()
    }

    // Save the history text in history list
    User.setProperty("historyList", historyList, "json");
}
