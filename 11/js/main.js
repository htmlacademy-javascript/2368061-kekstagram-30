import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-gallery.js';
import { showDownloadError } from './util.js';
import { setFullSizeModalHandlers } from './full-size-modal.js';
import { setPictureInputChange } from './upload-form.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
    setFullSizeModalHandlers(pictures);
  } catch {
    showDownloadError();
  }
};

setPictureInputChange();
bootstrap();
