const previewImage = document.querySelector('.img-upload__preview > img');
const effectList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectValue = effectLevelContainer.querySelector('.effect-level__value');

const cancelEffects = () => {
  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = '';
};

const addEffect = (min, max, step, filter, unit = '') => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });
  previewImage.style.filter = `${filter}(${effectSlider.noUiSlider.get()}${unit})`;
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
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
