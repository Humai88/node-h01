import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputType, ParamType } from './input-output-types'

export const findVideoController = (req: Request<ParamType, OutputType>, res: Response<OutputType>) => {
    const video = db.videos.find(video => video.id === +req.params.id)
    if (!video) {
        res.status(404).json({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
        return
    }
    res.status(200).json(video)

}
