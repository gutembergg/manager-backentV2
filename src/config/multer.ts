import { diskStorage, Options } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import { hash } from 'bcryptjs'

const uploadsPath = resolve(__dirname, '..', '..', 'uploads')

const multerConfig: Options = {
  dest: uploadsPath,
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, uploadsPath)
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename)
        }

        const extension = file.mimetype.replace('image/', '')
        const filename = `${hash.toString('hex')}.${extension}`
        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (request, file, callback) => {
    const formats = ['image/jpeg', 'image/png', 'image/jpg']

    if (formats.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Format not acceped'))
    }
  }
}

export default multerConfig
