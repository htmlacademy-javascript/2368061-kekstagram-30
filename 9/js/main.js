import { createPictures } from './data.js';
import { renderThumbnails } from './thumbnail-gallery.js';
import { addFullSizeModalHandlers } from './full-size-modal.js';
import { addImageUploadHandler } from './upload-form.js';

const pictures = createPictures();

renderThumbnails(pictures);
addFullSizeModalHandlers(pictures);
addImageUploadHandler();
