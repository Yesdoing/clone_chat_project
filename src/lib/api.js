import moment from "moment";
import {
  chatList,
  chatDetail,
  addMessage,
  updateMessageAllRead
} from "lib/db";

export const richWebApi = {
  chatList: () => {
    const lists = chatList();
    const response = lists.map(item => ({
      id: item.id,
      username: item.from_user.username,
      user_profile_image: item.from_user.user_profile_image,
      recent_message: item.messages[item.messages.length - 1],
      unread_number:  item.messages.reduce((acc, cur) => {
        if(cur.is_read === "false") return acc + 1;
        return acc;
      }, 0) 
    }));
    response.sort((a, b) =>
      moment
        .utc(b.recent_message.date, "YYYY MMM DD,ddd,hh:mm:ss")
        .diff(moment.utc(a.recent_message.date, "YYYY MMM DD,ddd,hh:mm:ss"))
    );
    console.log(response);
    return response;
  },
  chatDetail: index => chatDetail(index),
  addMessage: (index, message) => addMessage(index, message),
  updateMessageAllRead: (index)=> updateMessageAllRead(index)
};
