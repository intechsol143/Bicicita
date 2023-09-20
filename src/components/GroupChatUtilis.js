import database from '@react-native-firebase/database';
export const senderMsg = async (
  msgValue,
  voice,
  image,
  currentUserId,
  groupId,
  date,
  senderName,
  profile_image,
) => {
  try {
    return await database()
      .ref('groups/' + groupId + '/messages')
      .push({
        message: {
          text: msgValue,
          sendBy: currentUserId,
          senderName,
          profile_image,
          voice,
          image,
          date,
        },
      });
  } catch (error) {
    return error;
  }
};
