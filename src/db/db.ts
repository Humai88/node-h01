import { VideoDBType } from "./video-db-type"
 
export type DBType = { 
  videos: VideoDBType[] 

}

export const db: DBType = {
  videos: [],
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { 
      db.videos = []
      return
  }

  db.videos = dataset.videos || db.videos
}