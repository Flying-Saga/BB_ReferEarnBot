/*CMD
  command: /referral
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👫 referral
  group: 
CMD*/

let totalReferrals = RefLib.getRefCount()
let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
let perRefer = AdminPanel.getFieldValue({
    panel_name: "ReferralPanel",
    field_name: "AMOUNT"
})
let referLink = RefLib.getLink();
let referralEarned = Libs.ResourcesLib.userRes("referralEarned").value();

var txt = `<b>
👥 Total Referrals: ${totalReferrals}

🎁 Per Referral: ${perRefer} ${currency}

💰 Total Earned: ${referralEarned} ${currency}

🚀 Your Referral Link: <code>${referLink}</>
</>`


const button = [
    [{ text: "Copy Link", copy_text: {text: referLink } }, { text: "📄 Referral List", callback_data: "/checkReferralList" }],
]
if (params === "back") {
    Api.editMessageText({
        text: txt,
        parse_mode: "HTML",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: button },
    })
} else {
    Api.sendMessage({
        text: txt,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button }
    });
}
