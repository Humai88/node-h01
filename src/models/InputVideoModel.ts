import { ResolutionString } from "../db/video-db-type"

export type ParamType = {
  id: string
}

export interface CreateVideoInputType {
  title: string
  author: string
  availableResolutions: ResolutionString[] 
}
export interface UpdateVideoInputType extends CreateVideoInputType {
  canBeDownloaded: boolean
  minAgeRestriction: number | null,
  publicationDate: string
}

export type QueryType = {
  search?: string
}
