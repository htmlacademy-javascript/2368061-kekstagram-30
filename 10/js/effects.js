const SLIDER_INITIAL_MIN = 0;
const SLIDER_INITIAL_MAX = 100;
const SLIDER_INITIAL_STEP = 1;

const previewImage = document.querySelector('.img-upload__preview > img');
const effectList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectValue = effectLevelContainer.querySelector('.effect-level__value');

const addEffect = (min, max, step, filter, unit = '') => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    start: max,
    step
  });
  previewImage.style.filter = `${filter}(${max}${unit})`;
};

const cancelEffects = () => {
  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = '';
  effectValue.value = '';
};

noUiSlider.create(effectSlider, {
  range: {
    min: SLIDER_INITIAL_MIN,
    max: SLIDER_INITIAL_MAX,
  },
  start: SLIDER_INITIAL_MAX,
  step: SLIDER_INITIAL_STEP,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  },
});

const addChromeEffect = () => addEffect(0, 1, 0.1, 'grayscale');
const addSepiaEffect = () => addEffect(0, 1, 0.1, 'sepia');
const addMarvinEffect = () => addEffect(0, 100, 1, 'invert', '%');
const addPhobosEffect = () => addEffect(0, 3, 0.1, 'blur', 'px');
const addHeatEffect = () => addEffect(1, 3, 0.1, 'brightness');

effectSlider.noUiSlider.on('update', () => {
  const effectSliderValue = effectSlider.noUiSlider.get();

  effectValue.value = effectSliderValue;
  previewImage.style.filter = previewImage.style.filter.replace(/\d+(\.\d+)?/, effectSliderValue);
});

effectList.addEventListener('change', (evt) => {
  const effectInput = evt.target.closest('input.effects__radio:checked');

  if (effectInput) {
    effectLevelContainer.classList.remove('hidden');

    switch (effectInput.value) {
      case 'chrome':
        addChromeEffect();
        break;
      case 'sepia':
        addSepiaEffect();
        break;
      case 'marvin':
        addMarvinEffect();
        break;
      case 'phobos':
        addPhobosEffect();
        break;
      case 'heat':
        addHeatEffect();
        break;
      default:
        cancelEffects();
    }
  }
});

export { cancelEffects };
