
import { CreateVideoInputType, UpdateVideoInputType } from '../../src/videos/input-output-types';
import { createInputValidation, updateInputValidation } from '../../src/validation/input-validation';

describe('createInputValidation', () => {
  it('should pass validation with valid input', () => {
    const video: CreateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      availableResolutions: ['P720']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toHaveLength(0);
  });

  it('should return error for invalid resolutions', () => {
    const video: CreateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      //@ts-ignore
      availableResolutions: ['InvalidResolution']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Please add valid resolution!', field: 'availableResolution'
    });
  });

  it('should return error for missing title', () => {
    const video: CreateVideoInputType = {
      title: '',
      author: 'Valid Author',
      availableResolutions: ['P720']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Title required!', field: 'title'
    });
  });

  it('should return error for missing author', () => {
    const video: CreateVideoInputType = {
      title: 'Valid Title',
      author: '',
      availableResolutions: ['P720']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Author required!', field: 'author'
    });
  });

  it('should return error for title length exceeded', () => {
    const video: CreateVideoInputType = {
      title: 'a'.repeat(41),
      author: 'Valid Author',
      availableResolutions: ['P720']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Title maximum length exceeded!', field: 'title'
    });
  });

  it('should return error for author length exceeded', () => {
    const video: CreateVideoInputType = {
      title: 'Valid Title',
      author: 'a'.repeat(21),
      availableResolutions: ['P720']
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Author maximum length exceeded!', field: 'author!'
    });
  });
});



describe('updateInputValidation', () => {
  it('should pass validation with valid update input', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = updateInputValidation(video);
    expect(result.errorsMessages).toHaveLength(0);
  });

  it('should return error for invalid resolutions', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      //@ts-ignore
      availableResolutions: ['InvalidResolution'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Please add valid resolution!', field: 'availableResolution'
    });
  });

  it('should return error for missing title', () => {
    const video: UpdateVideoInputType = {
      title: '',
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Title required!', field: 'title'
    });
  });

  it('should return error for missing author', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: '',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Author required!', field: 'author'
    });
  });

  it('should return error for title length exceeded', () => {
    const video: UpdateVideoInputType = {
      title: 'a'.repeat(41),
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Title maximum length exceeded!', field: 'title'
    });
  });

  it('should return error for author length exceeded', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'a'.repeat(21),
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = createInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Author maximum length exceeded!', field: 'author!'
    });
  });

  it('should return error for invalid minAgeRestriction values', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 19,
      canBeDownloaded: true,
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = updateInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Invalid age restriction!', field: 'minAgeRestriction'
    });
  });

  it('should return error for invalid canBeDownloaded type', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      //@ts-ignore
      canBeDownloaded: 'true',
      publicationDate: '2023-04-01T12:00:00Z'
    };
    const result = updateInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'CanBeDownloaded option should have boolean value!', field: 'canBeDownloaded'
    });
  });

  it('should return error for invalid publicationDate format', () => {
    const video: UpdateVideoInputType = {
      title: 'Valid Title',
      author: 'Valid Author',
      availableResolutions: ['P720'],
      minAgeRestriction: 16,
      canBeDownloaded: true,
      publicationDate: '01-04-2023'
    };
    const result = updateInputValidation(video);
    expect(result.errorsMessages).toContainEqual({
      message: 'Publication date should be in ISO format!', field: 'publicationDate'
    });
  });
});

