/*CMD
  command: /onChangeBonus
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
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Validate input: check if message is a positive number (integer or float)
if (!isPositiveNumber(message)) {
    return Bot.sendMessage("*❌ Invalid Bonus Amount!*");
}

// Store the bonus amount and notify the admin
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
AdminPanel.setFieldValue({
    panel_name: "BonusPanel",
    field_name: "AMOUNT",
    value: Number(message)
})
Bot.sendMessage(`*✅ The bonus amount has been set to: ${message} ${currency}*`)


// Function to check if a value is a positive number (integer or float)
function isPositiveNumber(value) {
    let num = Number(value);
    return !isNaN(num) && num > 0;
}
