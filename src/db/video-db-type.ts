import { Resolutions, ResolutionString } from "../videos/input-output-types"

export interface VideoDBType {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: ResolutionString[]
}

