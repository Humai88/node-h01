import { Request, Response } from 'express'
import { constants } from 'fs'
import { VideoDBType } from '../db/video-db-type'

export type ParamType = {
    id: string
}

export interface CreateVideoInputType  {
    title: string
    author: string
    availableResolutions: Resolutions[] | null
}
export interface UpdateVideoInputType extends CreateVideoInputType {
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null,
    publicationDate?: string
}

export type QueryType = {
    search?: string
}

export type OutputErrorsType = { errorsMessages: { message: string, field: string }[] };
export type OutputVideoType = VideoDBType;
export enum Resolutions { P144, P240, P360, P480, P720, P1080, P1440, P2160 }
export type OutputType = OutputErrorsType | OutputVideoType

// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }