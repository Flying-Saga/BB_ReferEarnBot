/*CMD
  command: /profile
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👤 profile
  group: 
CMD*/

let fullName = user.first_name;
if (user.last_name) {
    fullName += " " + user.last_name;
}

let balance = Libs.ResourcesLib.userRes("balance").value();
let lockedBalance = Libs.ResourcesLib.userRes("lockedBalance").value();
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})

// Get wallet address
let wallet = User.getProp("walletAddress")
let walletTxt = `💳 Wallet Address: <code>${wallet}</>`
let walletBtnTxt = "Change"
if (!wallet) {
    walletTxt = ""
    walletBtnTxt = "Set"
}

let lockedBalanceTxt = "";
if (lockedBalance > 0) {
    lockedBalanceTxt = `🔐 Locked Balance: ${lockedBalance} ${currency}\n`
}

var txt = `<b>
👤 User: <a href="tg://user?id=${user.telegramid}">${fullName}</a>
🆔 ID: <code>${user.telegramid}</code>

💰 Balance: ${balance} ${currency}
${lockedBalanceTxt}
${walletTxt}</>`


const button = [
    [{ text: `🏦 ${walletBtnTxt} Wallet`, callback_data: "/setWallet" }, { text: "📃 History", callback_data: "/checkHistory" }],
]
if (params === "back") {
    Api.editMessageText({
        text: txt,
        parse_mode: "HTML",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: button },
    })
} else {
    Api.sendMessage({
        text: txt,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button }
    });
}
