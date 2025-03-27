/*CMD
  command: /setWallet
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

let walletType = AdminPanel.getFieldValue({
    panel_name: "WithdrawPanel",
    field_name: "WALLET_TYPE"
})

// Get user input for wallet address
Bot.sendMessage(`*💳 Enter Your Wallet Address (${walletType})\n\nTo Cancel: /cancel*`)
Bot.runCommand("/onSetWallet")
