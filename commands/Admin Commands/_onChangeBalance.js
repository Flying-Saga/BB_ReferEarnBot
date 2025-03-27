/*CMD
  command: /onChangeBalance
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

let userBalance = Libs.ResourcesLib.anotherUserRes("balance", message).value();
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})

// Get admin input for amount to add or cut
Api.sendMessage({
    text: `<b>🔰 How much you want to Add or Cut for user: <a href="tg://user?id=${message}">${message}</>

💰 Current Balance: ${userBalance} ${currency}

➕ For Adding Balance: <code>+1</>
➖ For Cutting Balance: <code>-1</>

To Cancel: /cancel</>`, 
    parse_mode: "HTML"
});
Bot.runCommand("/onChangeBalance2", {user: message});
