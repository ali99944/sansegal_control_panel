export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  STAFF: 'staff',
};

export const PERMISSIONS = {
  GENRE: {
    CREATE: 'genre_create',
    READ: 'genre_read',
    UPDATE: 'genre_update',
    DELETE: 'genre_delete',
  },
  ARTIST: {
    CREATE: 'artist_create',
    READ: 'artist_read',
    UPDATE: 'artist_update',
    DELETE: 'artist_delete',
  },
  SONG: {
    CREATE: 'song_create',
    READ: 'song_read',
    UPDATE: 'song_update',
    DELETE: 'song_delete',
  },
  PLAYLIST: {
    CREATE: 'playlist_create',
    READ: 'playlist_read',
    UPDATE: 'playlist_update',
    DELETE: 'playlist_delete',
  },
  ALBUM: {
    CREATE: 'album_create',
    READ: 'album_read',
    UPDATE: 'album_update',
    DELETE: 'album_delete',
  },
  MANAGER: {
    CREATE: 'manager_create',
    READ: 'manager_read',
    UPDATE: 'manager_update',
    DELETE: 'manager_delete',
  },
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    ...Object.values(PERMISSIONS.GENRE),
    ...Object.values(PERMISSIONS.ARTIST),
    ...Object.values(PERMISSIONS.SONG),
    ...Object.values(PERMISSIONS.PLAYLIST),
    ...Object.values(PERMISSIONS.ALBUM),
    ...Object.values(PERMISSIONS.MANAGER),
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.GENRE.CREATE,
    PERMISSIONS.GENRE.READ,
    PERMISSIONS.GENRE.UPDATE,
    PERMISSIONS.GENRE.DELETE,
    PERMISSIONS.ARTIST.CREATE,
    PERMISSIONS.ARTIST.READ,
    PERMISSIONS.ARTIST.UPDATE,
    PERMISSIONS.ARTIST.DELETE,
    PERMISSIONS.SONG.CREATE,
    PERMISSIONS.SONG.READ,
    PERMISSIONS.SONG.UPDATE,
    PERMISSIONS.SONG.DELETE,
    PERMISSIONS.PLAYLIST.CREATE,
    PERMISSIONS.PLAYLIST.READ,
    PERMISSIONS.PLAYLIST.UPDATE,
    PERMISSIONS.PLAYLIST.DELETE,
    PERMISSIONS.ALBUM.CREATE,
    PERMISSIONS.ALBUM.READ,
    PERMISSIONS.ALBUM.UPDATE,
    PERMISSIONS.ALBUM.DELETE,
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.GENRE.READ,
    PERMISSIONS.ARTIST.READ,
    PERMISSIONS.SONG.READ,
    PERMISSIONS.PLAYLIST.READ,
    PERMISSIONS.ALBUM.READ,
  ],
};

// Permission labels for display
export const PERMISSION_LABELS = {
  [PERMISSIONS.GENRE.CREATE]: 'إنشاء الأنواع',
  [PERMISSIONS.GENRE.READ]: 'عرض الأنواع',
  [PERMISSIONS.GENRE.UPDATE]: 'تعديل الأنواع',
  [PERMISSIONS.GENRE.DELETE]: 'حذف الأنواع',
  [PERMISSIONS.ARTIST.CREATE]: 'إنشاء الفنانين',
  [PERMISSIONS.ARTIST.READ]: 'عرض الفنانين',
  [PERMISSIONS.ARTIST.UPDATE]: 'تعديل الفنانين',
  [PERMISSIONS.ARTIST.DELETE]: 'حذف الفنانين',
  [PERMISSIONS.SONG.CREATE]: 'إنشاء الأغاني',
  [PERMISSIONS.SONG.READ]: 'عرض الأغاني',
  [PERMISSIONS.SONG.UPDATE]: 'تعديل الأغاني',
  [PERMISSIONS.SONG.DELETE]: 'حذف الأغاني',
  [PERMISSIONS.PLAYLIST.CREATE]: 'إنشاء قوائم التشغيل',
  [PERMISSIONS.PLAYLIST.READ]: 'عرض قوائم التشغيل',
  [PERMISSIONS.PLAYLIST.UPDATE]: 'تعديل قوائم التشغيل',
  [PERMISSIONS.PLAYLIST.DELETE]: 'حذف قوائم التشغيل',
  [PERMISSIONS.ALBUM.CREATE]: 'إنشاء الألبومات',
  [PERMISSIONS.ALBUM.READ]: 'عرض الألبومات',
  [PERMISSIONS.ALBUM.UPDATE]: 'تعديل الألبومات',
  [PERMISSIONS.ALBUM.DELETE]: 'حذف الألبومات',
  [PERMISSIONS.MANAGER.CREATE]: 'إنشاء المديرين',
  [PERMISSIONS.MANAGER.READ]: 'عرض المديرين',
  [PERMISSIONS.MANAGER.UPDATE]: 'تعديل المديرين',
  [PERMISSIONS.MANAGER.DELETE]: 'حذف المديرين',
};

// Role labels for display
export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'مدير عام',
  [ROLES.ADMIN]: 'مدير',
  [ROLES.STAFF]: 'موظف',
};

// Permission categories
export const PERMISSION_CATEGORIES = {
  GENRE: 'إدارة الأنواع',
  ARTIST: 'إدارة الفنانين',
  SONG: 'إدارة الأغاني',
  PLAYLIST: 'إدارة قوائم التشغيل',
  ALBUM: 'إدارة الألبومات',
  MANAGER: 'إدارة المديرين',
};
