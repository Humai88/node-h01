import { req } from '../test-helpers'
import { setDB } from '../../src/db/db'
import { dataset1 } from '../datasets'

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

})

describe('GET /videos/:id controller tests', () => {
    beforeEach(() => {
        setDB(dataset1)
    })

    it('should return a video by id', async () => {
        const response = await req.get('/videos/2')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(dataset1.videos[1])
    })

    it('should return 404 if video not found', async () => {
        const response = await req.get('/videos/4')
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
    })

})


describe('POST /videos createVideoController tests', () => {
    beforeEach(() => {
        setDB()
    })

    it('should successfully create a video with valid input', async () => {
        const videoData = {
            title: 'Test Video',
            author: 'Test Author',
            availableResolutions: ['P720'],
        }
        const response = await req.post('/videos').send(videoData)
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.title).toBe(videoData.title)

        const getResponse = await req.get('/videos')
        expect(getResponse.status).toBe(200)
        expect(getResponse.body.length).toBe(1)
        expect(getResponse.body[0].author).toBe(videoData.author)
    })

    it('should return 400 with error messages for missed title', async () => {
        const invalidVideoData = {
            title: '',
            author: 'Test Author',
            availableResolutions: ['P720'],
        }
        const response = await req.post('/videos').send(invalidVideoData)
        expect(response.status).toBe(400)
        expect(response.body.errorsMessages[0].field).toBe('title')
        expect(response.body.errorsMessages[0].message).toBe('Title required!')
    })

    it('should return 400 with error messages for missed author', async () => {
        const invalidVideoData = {
            title: 'Test Title',
            author: '',
            availableResolutions: ['P720'],
        }
        const response = await req.post('/videos').send(invalidVideoData)
        expect(response.status).toBe(400)
        expect(response.body.errorsMessages[0].field).toBe('author')
        expect(response.body.errorsMessages[0].message).toBe('Author required!')
    })

    it('should return 400 with error messages for invalid resolution', async () => {
        const invalidVideoData = {
            title: 'Test Title',
            author: 'Test Author',
            availableResolutions: ['P830'],
        }
        const response = await req.post('/videos').send(invalidVideoData)
        expect(response.status).toBe(400)
        expect(response.body.errorsMessages[0].field).toBe('availableResolutions')
        expect(response.body.errorsMessages[0].message).toBe('Please add valid resolution!')
    })

})


describe('PUT /videos/:id controller tests', () => {
    beforeEach(() => {
        setDB(dataset1)
    })

    it('should return 404 if video not found', async () => {
        const response = await req.put('/videos/999').send({ title: 'Updated Title' })
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
    })

    it('should return 400 with error messages for invalid title', async () => {
        const invalidInput = {
            title: 3,
            author: 'Test Author 3',
            canBeDownloaded: true,
            minAgeRestriction: 15,
            publicationDate: "2024-06-24T09:58:41.772Z",
            availableResolutions: ['P480'],
        }
        const response = await req.put('/videos/1').send(invalidInput)
        expect(response.status).toBe(400)
        expect(response.body.errorsMessages[0].field).toBe('title')
        expect(response.body.errorsMessages[0].message).toBe('Title required!')
    })

    it('should return 400 with error messages for invalid author', async () => {
        const invalidInput = {
            title: "Test title",
            author: "Very very very very looooooong name",
            canBeDownloaded: true,
            minAgeRestriction: 15,
            publicationDate: "2024-06-24T09:58:41.772Z",
            availableResolutions: ['P480'],
        }
        const response = await req.put('/videos/1').send(invalidInput)
        expect(response.status).toBe(400)
        expect(response.body.errorsMessages[0].field).toBe('author')
        expect(response.body.errorsMessages[0].message).toBe('Author maximum length exceeded!')
    })

    it('should successfully update a video with valid input', async () => {
        const validInput = {
            title: "New title",
            author: "New name",
            canBeDownloaded: true,
            minAgeRestriction: 15,
            publicationDate: "2024-06-24T09:58:41.772Z",
            availableResolutions: ['P480'],
        }
        const updateResponse = await req.put('/videos/2').send(validInput)
        expect(updateResponse.status).toBe(204)

        const getResponse = await req.get('/videos')
        expect(getResponse.body[1].title).toBe(validInput.title)
        expect(getResponse.body[1].author).toBe(validInput.author)
        expect(getResponse.body[1].minAgeRestriction).toBe(15)
    })

})



describe('DELETE /videos/:id controller tests', () => {
    beforeEach(() => {
        setDB(dataset1)
    })

    it('should successfully delete an existing video', async () => {
        const videoIdToDelete = dataset1.videos[0].id
        const deleteResponse = await req.delete(`/videos/${videoIdToDelete}`)
        expect(deleteResponse.status).toBe(204)

        const getResponse = await req.get(`/videos/${videoIdToDelete}`)
        expect(getResponse.status).toBe(404)
    })

    it('should return 404 if video not found', async () => {
        const nonExistingVideoId = 9999
        const response = await req.delete(`/videos/${nonExistingVideoId}`)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ errorsMessages: [{ message: 'Video not found', field: 'id' }] })
    })

    it('should ensure the video is deleted from the database', async () => {
        const videoIdToDelete = dataset1.videos[0].id
        await req.delete(`/videos/${videoIdToDelete}`)
        
        const getResponse = await req.get('/videos')
        expect(getResponse.body).not.toContainEqual(expect.objectContaining({ id: videoIdToDelete }))
    })
})