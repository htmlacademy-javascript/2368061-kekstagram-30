import { setFileFieldChange } from './upload-form.js';
import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-gallery.js';
import { setThumbnailFilters } from './filter.js';
import { setFullSizeModalHandlers } from './full-size-modal.js';
import { showDownloadError } from './message.js';

const initPictureGallery = async () => {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
    setThumbnailFilters(pictures);
    setFullSizeModalHandlers(pictures);
  } catch {
    showDownloadError();
  }
};

setFileFieldChange();
initPictureGallery();
