function filter_automated_OOO_replies() {
  // Broad search to get close matches
  var threads = GmailApp.search('subject:"Re Invitation" is:unread');

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    var lastMessage = messages[messages.length - 1];
    var subject = lastMessage.getSubject();

    // Find the exact position of "Re: Invitation:"
    var position = subject.indexOf("Re: Invitation:");

    // If it exists AND there is text before it, the position will be greater
    // than 0
    if (position > 0) {
      // 1. Get your custom label
      var label = GmailApp.getUserLabelByName("Automated OOO Reply");

      // test debugs to make sure you're catching the right emails
      //console.log(subject);
      //console.log(lastMessage.getDate());

      // 2. Apply the custom label
      threads[i].addLabel(label);

      // 3. Move it out of the Inbox (Archive it)
      threads[i].moveToArchive();
    }
  }
}

function main() {
  filter_automated_OOO_replies();
}

/* the if (position > 0) thing is because if someone replies to an invite you
 * send out, those replies start with "Re: Invitation:" and the whole thread
 * wil be filtered. But all of the OOO messages have whatever custom message
 * the person put in right at the beginning, so as long as you make sure
 * there's any text before "Re: Invitation:" it will filter the right ones.
 */
