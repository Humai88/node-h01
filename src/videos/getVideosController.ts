import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputVideoType } from '../models/OutputVideoModel'

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    const videos = db.videos
    res
        .status(200)
        .json(videos)
}

