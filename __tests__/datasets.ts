import { DBType } from '../src/db/db'
import { VideoDBType } from '../src/db/video-db-type'
import { Resolutions } from '../src/videos/input-output-types'

export const video1: VideoDBType = {
    id: 1, 
    title: 'Video 1', 
    author: 'Test Author 1',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-06-23T09:58:41.772Z",
    publicationDate:  "2024-06-24T09:58:41.772Z",
    availableResolutions: [Resolutions.P240],
}

export const video2: VideoDBType = {
    id: 2, 
    title: "Video 2", 
    author: "Test Author 2",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-06-23T09:58:41.772Z",
    publicationDate:  "2024-06-24T09:58:41.772Z",
    availableResolutions: [Resolutions.P240, Resolutions.P360],
}

export const video3: VideoDBType = {
    id: 3,   
    title: 'Video 3', 
    author: 'Test Author 3',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-06-23T09:58:41.772Z",
    publicationDate:  "2024-06-24T09:58:41.772Z",
    availableResolutions: [Resolutions.P240, Resolutions.P360, Resolutions.P480],
}


export const dataset1: DBType = {
    videos: [video1, video2, video3],
}
