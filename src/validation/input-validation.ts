import { OutputErrorsType, Resolutions } from "../videos/input-output-types"
import { UpdateVideoInputType, CreateVideoInputType } from './../videos/input-output-types';

export const createInputValidation = (video: CreateVideoInputType): OutputErrorsType => {
  const errors: OutputErrorsType = {
      errorsMessages: []
  }
  if (!Array.isArray(video.availableResolutions)
      || video.availableResolutions.find(p => !Resolutions[p]) || video.availableResolutions.length < 1
  ) {
      errors.errorsMessages.push({
          message: 'Please add valid resolution!', field: 'availableResolution'
      })
  }
  if (!video.title || typeof video.title !== 'string' || !video.title.trim()) {
      errors.errorsMessages.push({
          message: 'Title required!', field: 'title'
      })
  }
  if (!video.author || typeof video.author !== 'string' || !video.author.trim()) {
      errors.errorsMessages.push({
          message: 'Author required!', field: 'author'
      })
  }
  if (video.title.trim().length > 40) {
      errors.errorsMessages.push({
          message: 'Title maximum length exceeded!', field: 'title'
      })
  }
  if (video.author.trim().length > 20) {
      errors.errorsMessages.push({
          message: 'Author maximum length exceeded!', field: 'author!'
      })
  }
  return errors
}

export const updateInputValidation = (video: UpdateVideoInputType): OutputErrorsType => {
  const errors: OutputErrorsType = {
      errorsMessages: []
  }
  const additionalErrors = createInputValidation(video);
  errors.errorsMessages.push(...additionalErrors.errorsMessages)
  if (video.minAgeRestriction && video.minAgeRestriction < 1 || video.minAgeRestriction && video.minAgeRestriction > 18) {
    errors.errorsMessages.push({
        message: 'Invalid age restriction!', field: 'minAgeRestriction'
    })
}
if (typeof video.canBeDownloaded  !== 'boolean' ) {
    errors.errorsMessages.push({
        message: 'CanBeDownloaded option should have boolean value!', field: 'canBeDownloaded'
    })
}
if (typeof video.minAgeRestriction  !== 'number' ) {
    errors.errorsMessages.push({
        message: 'Age restriction should be a number!', field: 'minAgeRestriction'
    })
}
const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/;
if (!isoDateTimeRegex.test(video.publicationDate) || typeof video.publicationDate !== 'string') {
    errors.errorsMessages.push({
        message: 'Publication date should be in ISO format!', field: 'publicationDate'
    })
}
  return errors
}