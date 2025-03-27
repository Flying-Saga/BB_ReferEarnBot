/*CMD
  command: /onSetWallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: User Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Cancel process on /cancel
if (message === "/cancel") {
    return Bot.sendMessage("*❌ Process Has Been Cancelled!*")
}

// Save the wallet address and notify the user
User.setProperty("walletAddress", message, "string");
Bot.sendMessage("*✅ Your wallet address has been set to:* `" + message + "`")
