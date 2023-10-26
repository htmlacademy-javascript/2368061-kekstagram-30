import { createPictures } from './data.js';
import { addThumbnails } from './thumbnail-gallery.js';
import { addThumbnailClickHandler } from './full-size-modal.js';

const pictures = createPictures();
addThumbnails(pictures);
addThumbnailClickHandler(pictures);
