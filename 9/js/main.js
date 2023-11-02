import { createPictures } from './data.js';
import { appendThumbnails } from './thumbnail-gallery.js';
import { addThumbnailClickHandler } from './full-size-modal.js';
import { addUploadInputChangeHandler } from './upload-form.js';

const pictures = createPictures();
appendThumbnails(pictures);
addThumbnailClickHandler(pictures);
addUploadInputChangeHandler();
