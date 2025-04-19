/*CMD
  command: /acceptWithdraw
  help: 
  need_reply: false
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

if (!params) {
    return;
}

// Get withdrawal information
const withInfo = Bot.getProp(`withdrawInfo-${params}`)

// Remove amount from locked balance and add in total withdraw
let lockedBalance = Libs.ResourcesLib.anotherUserRes("lockedBalance", withInfo.user.telegramid);
lockedBalance.remove(withInfo.amount)
let totalWith = Libs.ResourcesLib.anotherChatRes("totalWithdraw", "global");
totalWith.add(withInfo.amount)
Api.sendMessage({
    chat_id: withInfo.user.telegramid,
    text: `<b>☑️ Your Withdrawal Request Accepted!\n\n💰 Amount: ${withInfo.amount} ${withInfo.currency}\n\n➡️ Amount added in your wallet.</>`,
    parse_mode: "HTML",
})

// Send approval request to private log or admin
let  txt = `<b>
☑️ User's Withdrawal Request Confirmed! #withdraw

👤 User: ${generateUserLink(withInfo.user)}
`
if (withInfo.user.username) { txt += `📛 Username: @${withInfo.user.username}` }
txt += `
🆔 User's ID: <code>${withInfo.user.telegramid}</>

💰 Withdrawal Amount: ${withInfo.amount} ${withInfo.currency}
💳 Wallet Address: <code>${withInfo.wallet}</>
</>`

Api.editMessageText({
    text: txt,
    parse_mode: "HTML",
    message_id: request.message.message_id,
    disable_web_page_preview: true
})

let publicLog = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "PUBLIC_LOG"
})
if (publicLog) {
    let fullName = withInfo.user.first_name;
    if (withInfo.user.last_name) {
        fullName += " " + withInfo.user.last_name;
    }
    const button = [
        [{ text: "🤖 Bot", url: `https://t.me/${bot.name}` }],
    ]
    Api.sendMessage({
        chat_id: publicLog,
        text: `<b>📤 New Withdrawal Sent\n\n👤 User: ${fullName}\n💰 Amount: ${withInfo.amount} ${withInfo.currency}\n\n💳 Wallet Address: <u>Hidden</></>`,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button },
        on_error: "/logError " + publicLog
     })
}

// Add in history
let now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata"
});
now = Libs.DateTimeFormat.format(now, " [d mmm, yyyy	HH:MM]");
Bot.run({ user_telegramid: withInfo.user.telegramid, command: "/addInHistory", options: { text: `➖ Withdraw: <u>${withInfo.amount} ${withInfo.currency}</> ${now}` } })
Bot.deleteProp(`withdrawInfo-${params}`)

// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
