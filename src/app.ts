import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings'
import { videosRouter } from './videos'
import { testRouter } from './testing'
 
export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
 
app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TEST, testRouter)