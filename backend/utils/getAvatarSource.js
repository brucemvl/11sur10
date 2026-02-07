export default function getAvatarSource(avatar) {
  return avatar && avatar.startsWith('http')
    ? { uri: avatar }
    : require('../../backend/uploads/avatars/default-avatar.png');
}