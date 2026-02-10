export default function getAvatarSource(avatar) {
  if (!avatar) {
    // fallback local packagé
    return require('../../backend/uploads/avatars/facteur.jpg');
  }

  // URL complète (Cloudinary ou autre)
  if (avatar.startsWith('http')) {
    return { uri: avatar };
  }

  // Sinon chemin relatif backend (cas rare si stockage local)
  return { uri: `https://one1sur10.onrender.com${avatar}` };
}