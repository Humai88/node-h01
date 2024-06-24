import {Router} from 'express'
import { deleteAllDataController } from './deleteAllDataController'

export const testRouter = Router()
 
testRouter.delete('/', deleteAllDataController)