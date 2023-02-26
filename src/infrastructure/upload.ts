import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

import { ImageSizeInMB, Mimetype } from '@/constants'
import { mbToBytes } from '@/utils/math'
import { joinRelativeToMainPath } from '@/utils/paths'

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const mimetypes: string[] = Object.values(Mimetype)

  if (!mimetypes.includes(file.mimetype)) {
    return cb(new Error(`Only ${mimetypes} files are allowed.`))
  }

  cb(null, true)
}

const upload = multer({
  dest: joinRelativeToMainPath(process.env.STORAGE_PATH),
  limits: { fileSize: mbToBytes(ImageSizeInMB.Ten) },
  fileFilter
})

export const uploadSingleImage = upload.single('file')
