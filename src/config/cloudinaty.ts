import { removeAfterLastDot } from '../utils/index'
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { uniqueId } from 'lodash'
import path from 'path'
import streamifier from 'streamifier'

export const KEY_SLIPT_FILE = '__key__'

cloudinary.config({
  cloud_name: 'de0tzzevl',
  api_key: '228379871814757',
  api_secret: 'iA5HliZH4eJlkxQR9xjoHYBM99c'
})

export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'music-fpt',
        resource_type: 'raw',
        filename_override:
          removeAfterLastDot(file.originalname) + KEY_SLIPT_FILE + uniqueId() + path.extname(file.originalname),
        use_filename: true
      },
      (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

export const deleteImagesUpload = (id: string) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .destroy(`music-fpt/${id}`, {
        resource_type: 'raw',
        type: 'upload'
      })
      .then(resolve)
      .catch(reject)
      .finally(reject)
  })
}

export default cloudinary
