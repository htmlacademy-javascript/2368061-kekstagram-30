import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-gallery.js';
import { showDownloadError } from './util.js';
import { addFullSizeModalHandlers } from './full-size-modal.js';
import { addImageUploadHandler } from './upload-form.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
    addFullSizeModalHandlers(pictures);
  } catch {
    showDownloadError();
  }
};

addImageUploadHandler();
bootstrap();
