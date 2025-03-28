/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Verify if the user is an admin or set the first user as an admin
let admin = AdminPanel.getFieldValue({
    panel_name: "AdminPanel",
    field_name: "ADMIN_ID"
})
if ( !admin ) {
    Bot.run({ command: "/config", options: {isCommand: true, admin: user.telegramid}, background: false })
}

// Referral Track
let trackOptions = {
  onTouchOwnLink: doTouchOwnLink,
  onAttracted: doAttracted,
  onAlreadyAttracted: doAlreadyAttracted,
}
RefLib.track(trackOptions);

// Count users
if (!User.getProperty("userDone")) {
  User.setProperty("userDone", true, "boolean");
  var totalUsers = Libs.ResourcesLib.anotherChatRes("totalUsers", "global");
  totalUsers.add(1);
}

// Check membership and respond
Bot.run({ command: "/checkMembership", background: false});

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

// Open keyboard menu after joining all channels
Bot.runCommand("/homeMenu")

// Add referral amount if user already joined all channels
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


// Function to create inline buttons from channel array
function createInlineButtons(channels) {
    let buttons = [];
    let row = [];
    channels.forEach((channel, index) => {
        row.push({ text: channel, url: `https://t.me/${channel.replace("@", "")}` });
        // Group in two or add the last remaining one
        if (row.length === 2 || index === channels.length - 1) {
            buttons.push(row);
            row = [];
        }
    });
    buttons.push([{ text: "✅ Joined", callback_data: "/joined" }])
    return buttons;
}

// On clicking own refer link
function doTouchOwnLink(){
    Bot.sendMessage("*❌ You just clicked on your own refer link!*");
}

// On successful referral save data to add balance after joining all channels
function doAttracted(refUser){
    Api.sendMessage({
        chat_id: refUser.telegramid,
        text: `<b>🆕 New user on your referral link: ${generateUserLink(user)}\n\n🎉 You'll receive a reward when the user joins all channels!</>`,
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
}

// On already referred
function doAlreadyAttracted(){
    Bot.sendMessage("*❌ You’ve already been referred!*");
}

// Function to generate user's link
function generateUserLink(user) {
    let url = user.username 
        ? `https://t.me/${user.username}` 
        : `tg://user?id=${user.telegramid}`;

    let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    
    return `<a href="${url}">${fullName}</a>`;
}
