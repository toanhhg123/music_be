import { Album } from '~/album/album.model'
import { Comment } from '~/comment/comments.model'
import { Favorite } from '~/favorite/favorite.model'
import { History } from '~/history/history.model'
import { Media } from '~/media/media.model'
import { MediaType } from '~/mediaType/mediaType.model'
import PlayList from '~/playlist/playlist.model'
import { PlayListAndMusic } from '~/playlistAndMusics/playlistAndMusics.model'
import { Role } from '~/role/role.model'
import { User } from '~/user/user.model'

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
PlayListAndMusic.belongsTo(Media, { foreignKey: 'mediaId', as: 'media' })
PlayListAndMusic.belongsTo(PlayList, { foreignKey: 'playListId' })
PlayList.hasMany(PlayListAndMusic, { foreignKey: 'playListId', as: 'playlistAndMusics' })

// album and music
Media.belongsTo(Album, { foreignKey: 'albumId', targetKey: 'id', as: 'album' })
Album.hasMany(Media, { foreignKey: 'albumId', as: 'medias' })

// favorite and user
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' })
User.hasMany(Favorite, { foreignKey: 'userId' })

//favorite and media
Favorite.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id', as: 'media' })

// History and user
History.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
User.hasMany(History, { foreignKey: 'userId' })

//media and author
Media.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id', as: 'author' })
User.hasMany(Media, { foreignKey: 'authorId', as: 'medias' })

//History and media
History.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id', as: 'media' })

//comment and user
Comment.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id', as: 'author' })

//comment and media
Comment.belongsTo(Media, { foreignKey: 'mediaId', targetKey: 'id' })
Media.hasMany(Comment, { foreignKey: 'mediaId' })

//media type and media
MediaType.hasMany(Media, { foreignKey: 'mediaTypeId', as: 'medias' })
Media.belongsTo(MediaType, { foreignKey: 'mediaTypeId', as: 'mediaType' })

export const seedModel = async () => {
  // await Promise.all([
  //   Role.create({ code: ERole.ADMIN }),
  //   Role.create({ code: ERole.SINGER }),
  //   Role.create({ code: ERole.USER })
  // ])
  // await Promise.all(dataSeeds.map((data) => User.create(data)))
}

seedModel().catch(console.log)

export { Album, Comment, History, Media, MediaType, PlayList, PlayListAndMusic, Role, User }
