/*CMD
  command: /confirmWithdraw
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

if (!params) {
    return;
}

// Get withdraw information
const withInfo = Bot.getProp(`withdrawInfo-${params}`)
if (withInfo.user.telegramid !== user.telegramid) {
    return;
}

// Get admin id and private log channel
let admin = AdminPanel.getFieldValue({
  panel_name: "AdminPanel",
  field_name: "ADMIN_ID"
})
let privateLog = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "PRIVATE_LOG"
})

// Check for private log if not then set private log as admin id
if ( !privateLog ) {
    privateLog = admin
} else if (!privateLog) {
    Api.editMessageText({
        text: "<b>❌ Sorry, Currently bot does not have any admin to process your request!</>",
        parse_mode: "HTML",
        message_id: request.message.message_id,
    })
    return;
}

// Cut user balance and notify user
let balance = Libs.ResourcesLib.userRes("balance");
balance.remove(withInfo.amount)
let lockedBalance = Libs.ResourcesLib.userRes("lockedBalance");
lockedBalance.add(withInfo.amount)
Api.editMessageText({
    text: `<b>☑️ Withdrawal Request Sent To Admin!\n\n🔐 Added in Locked Balance: ${withInfo.amount} ${withInfo.currency}\n\n➡️ Wait For Admin Approval.</>`,
    parse_mode: "HTML",
    message_id: request.message.message_id,
})

// Send approval request to private log or admin
let  txt = `<b>
📤 New Withdrawal Request Received #withdraw

👤 User: ${generateUserLink(withInfo.user)}
`
if (withInfo.user.username) { txt += `📛 Username: @${withInfo.user.username}` }
txt += `
🆔 User's ID: <code>${withInfo.user.telegramid}</>

💰 Withdrawal Amount: ${withInfo.amount} ${withInfo.currency}
💳 Wallet Address: <code>${withInfo.wallet}</>
</>`

const button = [
    [{ text: "☑️ Accept", callback_data: `/acceptWithdraw ${params}` }, { text: "❌ Reject", callback_data: `/rejectWithdraw ${params}` }],
]

Api.sendMessage({
    chat_id: privateLog,
    text: txt,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: button },
    disable_web_page_preview: true
});


// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
