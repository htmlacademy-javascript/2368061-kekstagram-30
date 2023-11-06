const SLIDER_INITIAL_MIN = 0;
const SLIDER_INITIAL_MAX = 100;
const SLIDER_INITIAL_STEP = 1;
const FILTER_VALUE_REGEX = /\d+(\.\d+)?/;

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

const cancelEffect = () => {
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

effectSlider.noUiSlider.on('update', () => {
  const effectSliderValue = effectSlider.noUiSlider.get();

  effectValue.value = effectSliderValue;
  previewImage.style.filter = previewImage.style.filter.replace(FILTER_VALUE_REGEX, effectSliderValue);
});

effectList.addEventListener('change', (evt) => {
  const effectInput = evt.target.closest('input.effects__radio:checked');

  if (effectInput) {
    effectLevelContainer.classList.remove('hidden');

    switch (effectInput.value) {
      case 'chrome':
        addEffect(0, 1, 0.1, 'grayscale');
        break;
      case 'sepia':
        addEffect(0, 1, 0.1, 'sepia');
        break;
      case 'marvin':
        addEffect(0, 100, 1, 'invert', '%');
        break;
      case 'phobos':
        addEffect(0, 3, 0.1, 'blur', 'px');
        break;
      case 'heat':
        addEffect(1, 3, 0.1, 'brightness');
        break;
      default:
        cancelEffect();
    }
  }
});

export { cancelEffect };
