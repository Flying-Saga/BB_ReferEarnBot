/*CMD
  command: /withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📤 withdraw
  group: 
CMD*/

// Check membership before withdraw and respond
Bot.run({ command: "/checkMembership"});

let membershipAdminError = User.getProp("membershipAdminError");
let membershipJoinError = User.getProp("membershipJoinError");

if (membershipAdminError) {
    return Bot.sendMessage("*⚠️ Bot is not admin in these channels:\n" + membershipAdminError + "\n\n⏳ Please wait while this issue is being fixed by admin!*");
} else if (membershipJoinError) {
    let channelList = Bot.getProp("membershipChannels", []);
    let button = createInlineButtons(channelList);
    return Api.sendMessage({
                   text: `*🎉 Hey ${user.first_name}, Welcome to our Refer & Earn Bot!\n\n⚠️ To get started, join the channels below using the buttons.\n\nOnce you've joined them all, tap "✅ Joined" to continue! 🚀*`,
                   parse_mode: "markdown",
                   reply_markup: { inline_keyboard: button }
               });
}

// Check user balance
let balance = Libs.ResourcesLib.userRes("balance").value();
if (balance <= 0) {
    return Bot.sendMessage(`*❌ Insufficient balance to withdraw!*`);
}

//Check user's wallet
let wallet = User.getProp("walletAddress")
if (!wallet) {
    const button = [
        [{ text: "💳 Set Wallet Address", callback_data: "/setWallet" }],
    ]
    Api.sendMessage({
        text: "<b>❌ Wallet address not set!\n\n➡️ Please add your wallet address to request a withdrawal.</>",
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button }
    });
    return;
}

// Get user input for withdraw amount
Bot.sendMessage(`*📤 Enter Amount To Withdraw\n\nTo Cancel: /cancel*`)
Bot.runCommand("/onWithdraw", {isCommand: true})
