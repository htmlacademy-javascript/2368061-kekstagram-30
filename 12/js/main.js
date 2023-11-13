import { getData } from './api.js';
import { renderThumbnails, setThumbnailFilters } from './thumbnail-gallery.js';
import { showDownloadError } from './util.js';
import { setFullSizeModalHandlers } from './full-size-modal.js';
import { setFileFieldChange } from './upload-form.js';

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
