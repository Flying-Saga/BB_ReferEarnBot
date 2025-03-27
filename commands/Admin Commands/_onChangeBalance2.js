/*CMD
  command: /onChangeBalance2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Commands

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
if ( !admin || admin !== user.telegramid ) {
    return;
}

// Cancel Process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*");
}

// Validate input: check if message is a positive number (integer or float)
if (!isNonZeroNumber(message)) {
    return Bot.sendMessage("*❌ Invalid Amount!*");
}

let userBalance = Libs.ResourcesLib.anotherUserRes("balance", options.user);
userBalance.add(Number(message))

// Add in history and, notify admin and user
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
let now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata"
});
now = Libs.DateTimeFormat.format(now, " [d mmm, yyyy	HH:MM]");
var amount = convertString(message)
if (Number(message) < 0) {
    Bot.sendMessage(`*✅  Balance Successfully Deducted\n\n💵 Amount: ${amount} ${currency}\n💰 Updated Balance: ${userBalance.value()} ${currency}*`)
    Api.sendMessage({ chat_id: options.user, text: `*➖  Admin Has Decreased Your Balance\n\n💵 Amount: ${amount} ${currency}\n💰 Updated Balance: ${userBalance.value()} ${currency}*`, parse_mode: "markdown" })
    Bot.run({ command: "/addInHistory", options: { text: "➖ Decreased by Admin: <u>" + amount + " " + currency + "</>" + now } })
} else {
    Bot.sendMessage(`*✅  Balance Successfully Added\n\n💵 Amount: ${amount} ${currency}\n💰 Updated Balance: ${userBalance.value()} ${currency}*`)
    Api.sendMessage({ chat_id: options.user, text: `*➕  Admin Has Increased Your Balance\n\n💵 Amount: ${amount} ${currency}\n💰 Updated Balance: ${userBalance.value()} ${currency}*`, parse_mode: "markdown" })
    Bot.run({ command: "/addInHistory", options: { text: "➕ Increased by Admin: <u>" + amount + " " + currency + "</>" + now } })
}

// Function to check if a value is a number (positive or negative, but not zero)
function isNonZeroNumber(value) {
    let num = Number(value);
    return !isNaN(num) && num !== 0;
}

function convertString(str) {
    return Math.abs(parseFloat(str)).toString();
}
