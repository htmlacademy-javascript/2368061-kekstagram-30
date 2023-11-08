const SLIDER_INITIAL_MIN = 0;
const SLIDER_INITIAL_MAX = 100;
const SLIDER_INITIAL_STEP = 1;
const FILTER_VALUE_REGEX = /\d+(\.\d+)?/;
const EFFECT_PROPERTIES = {
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness' }
};

const previewImage = document.querySelector('.img-upload__preview > img');
const effectList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevel = effectLevelContainer.querySelector('.effect-level__value');

const setEffect = ({ min, max, step, filter, unit = '' }) => {
  effectLevelContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step
  });
  previewImage.style.filter = `${filter}(${max}${unit})`;
};

const resetEffect = () => {
  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = '';
  effectLevel.value = SLIDER_INITIAL_MAX;
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

  effectLevel.value = effectSliderValue;
  previewImage.style.filter = previewImage.style.filter.replace(FILTER_VALUE_REGEX, effectSliderValue);
});

effectList.addEventListener('change', (evt) => {
  const effectInput = evt.target.closest('input.effects__radio');

  if (effectInput) {
    for (const effect in EFFECT_PROPERTIES) {
      if (effect === effectInput.value) {
        setEffect(EFFECT_PROPERTIES[effect]);

        return;
      }
    }

    resetEffect();
  }
});

export { resetEffect };
