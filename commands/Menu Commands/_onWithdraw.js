/*CMD
  command: /onWithdraw
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Check if this command is run by bot
if (!options || !options.isCommand) {
    return;
}

// Cancel Process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Get admin id and private log channel
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
let privateLog = AdminPanel.getFieldValue({
    panel_name: "LogChannelPanel",
    field_name: "PRIVATE_LOG"
})

// Check for private log if not then set private log as admin id
if ( !privateLog ) {
    privateLog = admin
} else if (!privateLog) {
    return Bot.sendMessage("*❌ Sorry, Currently bot does not have any admin to process your request!*");
}

// Validate input: check if message is a positive number (integer or float)
if (!isPositiveNumber(message)) {
    return Bot.sendMessage("*❌ Invalid Withdraw Amount!*");
}

// Check if amount is greater than balance
let balance = Libs.ResourcesLib.userRes("balance").value();
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
if (Number(message) > balance) {
    return Bot.sendMessage(`*❌ Insufficient balance to withdraw!\n\n💰 Available Balance: ${balance} ${currency}*`);
}

// Verify minimum and maximum withdraw
let minWith = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MIN_AMOUNT"
})
let maxWith = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MAX_AMOUNT"
})
if (Number(message) < minWith) {
    return Bot.sendMessage(`*❌ Minimum withdrawal amount: ${minWith} ${currency}*`);
} else if (Number(message) > maxWith) {
    return Bot.sendMessage(`*❌ Maximum withdrawal amount: ${maxWith} ${currency}*`);
}

let wallet = User.getProp("walletAddress")
let txt = `<b>📤 Withdrawal Confirmation:

💰 Withdrawal Amount: ${message} ${currency}

💳 Wallet Address: <code>${wallet}</>
</>`

var withdrawId = Libs.ResourcesLib.anotherChatRes("withdrawId", "global");
withdrawId.add(1);

Bot.setProp({ name: `withdrawInfo-${withdrawId.value()}`, value: {user: user, amount: Number(message), currency: currency, wallet: wallet} })

const button = [
    [{ text: "☑️ Confirm", callback_data: `/confirmWithdraw ${withdrawId.value()}` }, { text: "❌ Cancel", callback_data: `/cancelWithdraw ${withdrawId.value()}` }],
]

Api.sendMessage({
    text: txt,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: button },
});

// Function to check if a value is a positive number (integer or float)
function isPositiveNumber(value) {
    let num = Number(value);
    return !isNaN(num) && num > 0;
}
