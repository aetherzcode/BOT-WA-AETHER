const axios = require('axios');
const api = 'https://plte.link/aiwallpapers/api';
const headers = {
  "Content-Type": "application/json",
  "User-Agent": "Postify/1.0.0"
};
const result = wallpaper => ({
  id: wallpaper.id,
  title: wallpaper.title,
  description: wallpaper.description,
  image: wallpaper.image,
  thumbnail: wallpaper.thumbnail,
  colors: wallpaper.colors,
  tags: wallpaper.tags,
  likes: wallpaper.likes,
  views: wallpaper.views,
  downloads: wallpaper.downloads,
  resolution: wallpaper.resolution,
  size: wallpaper.size,
  categoryName: wallpaper.category_name,
  isPremium: wallpaper.isPremium,
  createdAt: wallpaper.created_at
});

const request = async (endpoint, params) => {
  try {
    const { data } = await axios.get(`${api}/${endpoint}`, {
      params,
      headers: headers
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const luminaWp = {
  search: async (userId = '550e8400-e29b-41d4-a716-446655440000', query = 'Abstract') => {
    const data = await request('search', {
      user_id: userId,
      order_by: 'created_at',
      search: query
    });
    return {
      currentPage: data.current_page,
      wallpapers: Array.isArray(data.data) ? data.data.map(result) : []
    };
  },
  
  detail: async (catId = 2, type = 'fluid') => {
    const data = await request('wallpapers', {
      category_id: String(catId),
      order_by: 'created_at',
      type,
      isCollection: '0'
    });
    return Array.isArray(data.data) ? data.data.map(result) : [];
  }
};

const handler = async (m, { text, args, command, conn }) => {
  if (args.length < 1) {
    return m.reply(`Gunakan format yang benar: ${command} <search_query>`);
  }
  const query = args.join(' ');
  try {
    const { wallpapers } = await luminaWp.search('550e8400-e29b-41d4-a716-446655440000', query);
    if (wallpapers.length === 0) {
      return m.reply('❌ Tidak ada wallpaper ditemukan.');
    }
    let resultMessage = wallpapers.map(wallpaper => {
      return `📸 *Title*: ${wallpaper.title}\n🌐 *Resolution*: ${wallpaper.resolution}\n💬 *Description*: ${wallpaper.description}\n🖼️ *Image*: ${wallpaper.image}\n\n`;
    }).join('\n');
    m.reply(resultMessage);
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat mengambil wallpaper.');
  }
};
handler.command = ['wallpapersearch'];
handler.tags = ['internet'];
handler.help = ['wallpapersearch query'];
module.exports = handler;