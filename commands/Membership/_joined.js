/*CMD
  command: /joined
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Membership

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.run({ command: "/checkMembership", background: false})

let membershipAdminError = User.getProp("membershipAdminError");
let membershipJoinError = User.getProp("membershipJoinError");

if (membershipAdminError) {
    return Api.answerCallbackQuery({
                   callback_query_id: request.id,
                   text: "⚠️ Bot is not admin in these channels:\n" + membershipAdminError + "\n\n⏳ Please wait while this issue is being fixed!",
                   show_alert: true
               });
    
    Bot.sendMessage();
} else if (membershipJoinError) {
     return Api.answerCallbackQuery({
                   callback_query_id: request.id,
                   text: "⚠️ Must join these channels and try again:\n" + membershipJoinError,
                   show_alert: true
               });
}

//open keyboard menu after joining all channels
Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message.message_id });
Bot.runCommand("/homeMenu")

// Add referral amount when user joined all channels
var isReferred = User.getProp("isReferred")
if (!isReferred) {
  
    if (RefLib.getAttractedBy()) {
        let refUser = RefLib.getAttractedBy()
        let currency = AdminPanel.getFieldValue({
            panel_name: "BotPanel",
            field_name: "CURRENCY"
        })
        let perRefer = AdminPanel.getFieldValue({
            panel_name: "ReferralPanel",
            field_name: "AMOUNT"
        })
        // Values adds
        let userBalance = Libs.ResourcesLib.anotherUserRes("balance", refUser.telegramid);
        let referralEarned = Libs.ResourcesLib.anotherUserRes("referralEarned", refUser.telegramid);
        let totalBotReferrals = Libs.ResourcesLib.anotherChatRes("totalBotReferrals", "global");
        totalBotReferrals.add(1);
        userBalance.add(perRefer)
        referralEarned.add(perRefer)
        Api.sendMessage({
            chat_id: refUser.telegramid,
            text: `<b>✅ You Earned: ${perRefer} ${currency}\n\n<i>Successfull Referral</>: ${generateUserLink(user)}</>`,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });
        // Add in other user's history
        let now = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata"
        });
        now = Libs.DateTimeFormat.format(now, " [d mmm, yyyy	HH:MM]");
        Bot.run({ command: "/addInHistory", options: { text: "➕ Referral (" + generateUserLink(user) + "): <u>" + perRefer + " " + currency + "</>" + now }, user_telegramid: refUser.telegramid })
    }
    
    User.setProperty("isReferred", true, "boolean")
}

// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
