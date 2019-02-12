import {list as richWebList, chat as richWebChat, talk as richWebTalk} from 'lib/db';

export const richWebApi = {
    list: () => richWebList(),
    chat: (index) => richWebChat(index),
    talk: (index, message) => richWebTalk(index, message)
};