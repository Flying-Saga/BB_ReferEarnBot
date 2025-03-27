/*CMD
  command: /rejectWithdraw
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

// Add locked balance again in  user balance and notify user
let balance = Libs.ResourcesLib.anotherUserRes("balance", withInfo.user.telegramid);
balance.add(withInfo.amount)
let lockedBalance = Libs.ResourcesLib.anotherUserRes("lockedBalance", withInfo.user.telegramid);
lockedBalance.remove(withInfo.amount)
Api.sendMessage({
    chat_id: withInfo.user.telegramid,
    text: `<b>❌ Your Withdrawal Request Rejected!\n\n💰 Amount: ${withInfo.amount} ${withInfo.currency}\n\n➡️ Amount again added in your balance.</>`,
    parse_mode: "HTML",
})

// Send approval request to private log or admin
let  txt = `<b>
❌ User's Withdrawal Request Rejected! #withdraw

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
Bot.deleteProp(`withdrawInfo-${params}`)


// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
