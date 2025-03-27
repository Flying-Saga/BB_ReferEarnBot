/*CMD
  command: /checkReferralList
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

let referralList = RefLib.getRefList().getUsers();

// Make text to edit
let txt = "";
let len = referralList.length
if (referralList.length > 10) {
    len = 10
}

if (referralList.length < 1) {
    txt = "Referral List is Empty"
} else {
    for (let i = 0; i < len; i++) {
        let usr = generateUserLink(referralList[i])
        txt += `${i + 1}. ${usr}\n\n`;
    }
}

// Edit message to show broadcast status
const button = [
    [{ text: "⬅️ Back", callback_data: "/referral back" }],
]
Api.editMessageText({
    text: `<b>📄 Referral List [Recent 10]:

${txt} 
</>`,
    parse_mode: "HTML",
    message_id: request.message.message_id,
    reply_markup: { inline_keyboard: button },
    disable_web_page_preview: true
})


// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
