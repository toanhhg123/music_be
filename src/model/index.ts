import { Album } from '~/album/album.model'
import { Comment } from '~/comment/comments.model'
import sequelize from '~/config/db'
import { Favorite } from '~/favorite/favorite.model'
import { History } from '~/history/history.model'
import { Media } from '~/media/media.model'
import { PlayList } from '~/playlist/playlist.model'
import { PlayListAndMusic } from '~/playlistAndMusics/playlistAndMusics.model'
import { ERole, Role } from '~/role/role.model'
import { User } from '~/user/user.model'
import { dataSeeds } from '~/utils/data'

// user and role
User.belongsTo(Role, { foreignKey: 'roleCode', targetKey: 'code', as: 'role' })
Role.hasMany(User, { foreignKey: 'roleCode' })

// user and album
Album.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id', as: 'author' })
User.hasMany(Album, { foreignKey: 'authorId', as: 'album' })

// playlist  and user
PlayList.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' })
User.hasMany(PlayList, { foreignKey: 'authorId' })

//playlist and music
PlayListAndMusic.belongsTo(Media, { foreignKey: 'mediaId' })
PlayListAndMusic.belongsTo(PlayList, { foreignKey: 'playListId' })

// album and music
Media.belongsTo(Album, { foreignKey: 'albumId', targetKey: 'id', as: 'album' })
Album.hasMany(Media, { foreignKey: 'albumId', as: 'medias' })

// favorite and user
Favorite.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
User.hasMany(Favorite, { foreignKey: 'userId' })

//favorite and media
Favorite.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id' })

// History and user
History.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
User.hasMany(History, { foreignKey: 'userId' })

//media and author
Media.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id', as: 'author' })

//History and media
History.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id' })

//comment and user
Comment.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' })

//comment and media
Comment.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id' })
Media.hasMany(Comment, { foreignKey: 'mediaId' })

export const seedModel = async () => {
  await sequelize.sync({ force: true })

  await Promise.all([
    Role.create({ code: ERole.ADMIN }),
    Role.create({ code: ERole.SINGER }),
    Role.create({ code: ERole.USER })
  ])

  await Promise.all(dataSeeds.map((data) => User.create(data)))
}

// seedModel().catch(console.log)

export { Role, User, Album, Media }
