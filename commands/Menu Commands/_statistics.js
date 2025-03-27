/*CMD
  command: /statistics
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📊 statistics
  group: 
CMD*/

let totalUsers = Libs.ResourcesLib.anotherChatRes("totalUsers", "global").value();
let totalWith = Libs.ResourcesLib.anotherChatRes("totalWithdraw", "global").value();
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
 let totalBotReferrals = Libs.ResourcesLib.anotherChatRes("totalBotReferrals", "global").value();

Api.sendMessage({
    text: `<b>📊 Statistics of @${bot.name}\n\n👥 Total Users: ${totalUsers}\n\n📤 Total Withdrawal: ${totalWith} ${currency}\n\n👫 Total Successfull Referrals: ${totalBotReferrals}</>`,
    parse_mode: "HTML",
});
