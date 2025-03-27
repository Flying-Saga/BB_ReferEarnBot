/*CMD
  command: /onCheckMembership
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

if (!options.ok) {
    let error = User.getProp("membershipAdminError", "");
    error += "\n• " + options.bb_options.channel;
    User.setProp({ name: "membershipAdminError", value: error });
    return;
}

if (["left", "kicked"].includes(options.result.status)) {
    let error = User.getProp("membershipJoinError", "");
    error += "\n• " + options.bb_options.channel;
    User.setProp({ name: "membershipJoinError", value: error });
    return;
}
