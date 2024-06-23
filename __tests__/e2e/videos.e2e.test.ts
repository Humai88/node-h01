import {req} from '../test-helpers'
import {SETTINGS} from '../../src/settings'
import { setDB } from '../../src/db/db'
import { dataset1 } from '../datasets'
import { CreateVideoInputType } from '../../src/videos/input-output-types'
 
describe('GET /videos controller tests', () => {
    beforeEach(() => {
        setDB()
    })

    it('should return an empty array when the database is empty', async () => {
        const response = await req.get('/videos')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    it('should return a non-empty array when the database is not empty', async () => {
        setDB(dataset1) 
        const response = await req.get('/videos')
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3)
        expect(response.body[0]).toEqual(dataset1.videos[0])
    })

    it('should return a video by id', async () => {
        setDB(dataset1)
        const response = await req.get('/videos/2')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(dataset1.videos[1])
    })

    it('should return 404 if video not found', async () => {
        setDB(dataset1)
        const response = await req.get('/videos/4')
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
    })

})
