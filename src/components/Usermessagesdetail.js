import database from '@react-native-firebase/database';
export const senderMsg = async (
  msgValue,
  voice,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image: image,
          voice: voice,
          date,
        },
      });
  } catch (error) {
    return error;
  }
};
export const recieverMsg = async (
  msgValue,
  voice,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  try {
    return await database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image: image,
          voice: voice,
          date,
        },
      });
  } catch (error) {
    return error;
  }
};
