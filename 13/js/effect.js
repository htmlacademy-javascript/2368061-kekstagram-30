const SLIDER_INITIAL_MIN = 0;
const SLIDER_INITIAL_MAX = 100;
const SLIDER_INITIAL_STEP = 1;
const EFFECT_VALUE_REGEX = /\d+(\.\d+)?/;

const effectProperties = {
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness' }
};

const mainPreviewNode = document.querySelector('.img-upload__preview > img');
const effectListNode = document.querySelector('.effects__list');
const effectLevelNode = document.querySelector('.img-upload__effect-level');
const effectSliderNode = effectLevelNode.querySelector('.effect-level__slider');
const effectValueNode = effectLevelNode.querySelector('.effect-level__value');

const setEffect = ({ min, max, step, filter, unit = '' }) => {
  effectLevelNode.classList.remove('hidden');
  effectSliderNode.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step
  });
  mainPreviewNode.style.filter = `${filter}(${max}${unit})`;
};

const resetEffect = () => {
  effectLevelNode.classList.add('hidden');
  mainPreviewNode.style.filter = '';
  effectValueNode.value = SLIDER_INITIAL_MAX;
};

noUiSlider.create(effectSliderNode, {
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

effectSliderNode.noUiSlider.on('update', () => {
  const effectSliderValue = effectSliderNode.noUiSlider.get();

  effectValueNode.value = effectSliderValue;
  mainPreviewNode.style.filter = mainPreviewNode.style.filter.replace(EFFECT_VALUE_REGEX, effectSliderValue);
});

effectListNode.addEventListener('change', (evt) => {
  const effectRadioNode = evt.target.closest('input.effects__radio');

  if (effectRadioNode) {
    for (const effect in effectProperties) {
      if (effect === effectRadioNode.value) {
        setEffect(effectProperties[effect]);

        return;
      }
    }

    resetEffect();
  }
});

export { resetEffect };
