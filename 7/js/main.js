import { createPictures } from './data.js';
import { appendThumbnails } from './thumbnail-gallery.js';
import { addThumbnailClickHandler } from './full-size-modal.js';

const pictures = createPictures();
appendThumbnails(pictures);
addThumbnailClickHandler(pictures);
