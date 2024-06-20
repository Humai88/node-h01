import {Request, Response} from 'express'
import { constants } from 'fs'
import { VideoDBType } from '../db/video-db-type'
 
export type ParamType = {
    id: string
}
 
export type BodyType = {
    id: number
    title: string
    // ...
}
 
export type QueryType = {
    search?: string
}
 
export type OutputErrorsType = any;
export type OutputVideoType = any;
export type InputVideoType = { title: string, author: string,  availableResolutions: Resolutions[] | null}; 
export enum Resolutions {P144, P240, P360, P480, P720, P1080, P1440, P2160 }
export type OutputType = void /*| OutputErrorsType | OutputVideoType*/
 
export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {
 
}