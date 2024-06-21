import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputVideoType } from './input-output-types'

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    const videos = db.videos
    res
        .status(200)
        .json(videos)
}

