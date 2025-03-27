/*CMD
  command: /FAQs
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

const faqs = [
  {
    "question": "<b>How does the referral program work?</b>",
    "answer": "You get a unique referral link from the bot. Share this link with your friends. When they join and complete the required tasks, you earn rewards."
  },
  {
    "question": "<b>Where can I find my referral link?</b>",
    "answer": "You can get your referral link by clicking the <b>'👫 Referral'</b> button in the bot or by clicking <b>/referral</b>"
  },
  {
    "question": "<b>How many people can I refer?</b>",
    "answer": "There is <b>no limit!</b> The more people you refer, the more rewards you earn."
  },
  {
    "question": "<b>How can I get free bonus?</b>",
    "answer": "Click the <b>'🎁 Bonus'</b> button in the bot to claim your free bonus. You can collect a bonus every specific time interval. Keep checking back to claim more!"
  },
  {
    "question": "<b>How can I see my referrals?</b>",
    "answer": "Go to the <b>'👫 Referral'</b> section in the bot to see the recent 10 list of how many people have joined using your link."
  },
  {
    "question": "<b>When will I receive my referral rewards?</b>",
    "answer": "Referral rewards are credited once your referrals meet the required conditions."
  },
  {
    "question": "<b>Can I refer myself?</b>",
    "answer": "<b>No</b>, self-referrals are not allowed. Any attempt to cheat the system will result in a ban."
  },
  {
    "question": "<b>Why didn’t I receive my referral reward?</b>",
    "answer": "Possible reasons:\n✅ Your referral <b>didn’t complete the required steps.</b>\n✅ Your referral is already <b>referred by someone else.</b>\n✅ Your referral is already <b>user of this bot.</b>\n\nIf you think this is a mistake, contact /support."
  },
  {
    "question": "<b>Can I withdraw my earnings?</b>",
    "answer": "Yes! You can withdraw your earnings once you reach the <b>minimum payout limit.</b> Check the bot for withdrawal options."
  },
  {
    "question": "<b>How do I contact support?</b>",
    "answer": "You can contact support by clicking <b>'📞 Support'</b> button in the bot or by clicking <b>/support</b>"
  }
]

const button = faqs.map((faq, index) => [
  { text: `${index + 1}. ${faq.question.replace(/<\/?b>/g, "")}`, callback_data: `/FAQs ${index}` }
]);
button.push([{ text: "⬅️ Back", callback_data: "/support edit" }]);
const txt = "<b>Frequently Asked Questions (FAQs)</b>"


if (!params) {
    Api.sendMessage({
        text: txt,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: button }
    });
} else if (params === "edit"){
    Api.editMessageText({
        text: txt,
        parse_mode: "HTML",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: button },
    })
} else {
    Api.editMessageText({
        text: txt + "\n\n➡️ " + faqs[Number(params)]["question"] + "\n\n<b>Answer:</b> " + faqs[Number(params)]["answer"],
        parse_mode: "HTML",
        message_id: request.message.message_id,
        reply_markup: { inline_keyboard: [[{ text: "⬅️ Back", callback_data: "/FAQs edit" }]] },
    })
}
