export default function getAvatarSource(avatar) {
  return avatar
    ? { uri: avatar }
    : require('../../backend/uploads/avatars/default-avatar.png');
}