/*CMD
  command: /bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu Commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🎁 bonus
  group: 
CMD*/

function checkBonus(bonusInterval){
  var last_run_at = User.getProperty("last_run_at");
  if(!last_run_at){ return true }

  var minutes = (Date.now() - last_run_at) /1000/60;
  var minutes_in_day = bonusInterval * 60
  var next = minutes_in_day - minutes
  var wait_hours = Math.floor(next / 60)
  next -= wait_hours * 60
  var wait_minutes = Math.floor(next)
  var wait_seconds = Math.floor((next - wait_minutes) * 60)
  
  if (minutes < minutes_in_day) {
    return Bot.sendMessage(`*📛 You Already Recieved Bonus In Last ${bonusInterval} Hours\n\n⏳ Come Back After: ${wait_hours} h ${wait_minutes} m ${wait_seconds} s*` );
  }
 
  return true;
 }

let bonusInterval = AdminPanel.getFieldValue({
    panel_name: "BonusPanel",
    field_name: "TIME_INTERVAL"
})

if(!checkBonus(bonusInterval)){ return }

User.setProperty("last_run_at", Date.now(), "integer");

let currency = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "CURRENCY"
})
let bonus = AdminPanel.getFieldValue({
    panel_name: "BonusPanel",
    field_name: "AMOUNT"
})
let publicLog = AdminPanel.getFieldValue({
    panel_name: "BotPanel",
    field_name: "PUBLIC_LOG"
})
let doLog = AdminPanel.getFieldValue({
    panel_name: "BonusPanel",
    field_name: "DO_LOG"
})
let balance = Libs.ResourcesLib.userRes("balance");

balance.add(Number(bonus)) // Add bonus

// Send message to user and public log channel
Bot.sendMessage(`*🎁 Congrats, You Recieved ${bonus} ${currency}\n\n🔎 Check Back After ${bonusInterval} Hours*`)
if (publicLog && doLog) {
    let fullName = user.first_name;
    if (user.last_name) {
        fullName += " " + user.last_name;
    }
    const button = [
        [{ text: "🤖 Bot", url: `https://t.me/${bot.name}` }],
    ]
    Api.sendMessage({
        chat_id: publicLog,
        text: `<b>🎁 New User Claimed Bonus\n\n👤 User: ${fullName}\n💰 Amount: ${bonus} ${currency}</>`,
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
Bot.run({ command: "/addInHistory", options: { text: "➕ Bonus: <u>" + bonus + " " + currency + "</>" + now } })
