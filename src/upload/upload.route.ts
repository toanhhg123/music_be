import { Router } from 'express'
import { deleteImagesUpload, uploadToCloudinary } from '~/config/cloudinaty'
import upload from '~/config/multer'
import { authorize } from '~/middlewares/auth.middleware'

const router = Router()

router.post('/', authorize([]), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('no file upload')
    }

    const result = await uploadToCloudinary(req.file)

    return res.status(201).json({
      message: 'success',
      data: result,
      status: 'success'
    })
  } catch (err: any) {
    return res.status(400).json({ error: err.message || err })
  }
})

router.post('/files', authorize(), upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files?.length) {
      throw new Error('no file upload')
    }

    const files = req.files as Express.Multer.File[]

    // const b64 = Buffer.from(req.file.buffer).toString('base64')
    // const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    const result = await Promise.all(files.map((file) => uploadToCloudinary(file)))

    return res.status(201).json({
      message: 'success',
      data: result,
      status: 'success'
    })
  } catch (err: any) {
    return res.status(400).json({ error: err.message || err })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const result = await deleteImagesUpload(req.body.image)

    return res.status(201).json({
      message: 'success',
      data: result,
      status: 'success'
    })
  } catch (err: any) {
    return res.status(400).json({ error: err.message || err })
  }
})

export default router
