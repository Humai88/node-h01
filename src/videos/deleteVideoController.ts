import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputErrorsType, ParamType } from './input-output-types'

export const deleteVideoController = (req: Request<ParamType>, res: Response<null | OutputErrorsType>) => {
    const videoId = req.params.id
    const video = db.videos.find(p => p.id === +req.params.id)
    if (!video) {
            res.status(404).json({errorsMessages: [{message: 'Video not found', field: 'id'}]})
        return
    }
    db.videos = db.videos.filter(p => p.id !== +videoId)
    res
        .status(204)
}
