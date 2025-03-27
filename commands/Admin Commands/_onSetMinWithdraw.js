/*CMD
  command: /onSetMinWithdraw
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
    return Bot.sendMessage("*❌ Invalid Amount!*");
}

// Check minimum withdraw amount
let maxWith = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MAX_AMOUNT"
})
if (Number(message) > maxWith) {
    return Bot.sendMessage("*❌ Minimum Withdraw Amount Cannot Be Greater Than Maximum Withdraw Amount!*");
}

// Store the min withdraw amount and notify the admin
AdminPanel.setFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "MIN_AMOUNT",
    value: Number(message)
})
Bot.sendMessage(`*✅ The amount has been set as minimum withdraw: ${message}*`)


// Function to check if a value is a positive number (integer or float)
function isPositiveNumber(value) {
    let num = Number(value);
    return !isNaN(num) && num > 0;
}
