const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const mainPreviewNode = document.querySelector('.img-upload__preview > img');
const scaleNode = document.querySelector('.img-upload__scale');
const scaleValueNode = scaleNode.querySelector('.scale__control--value');
const scaleDownNode = scaleNode.querySelector('.scale__control--smaller');
const scaleUpNode = scaleNode.querySelector('.scale__control--bigger');

const setScale = (value) => {
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  } else if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }

  scaleValueNode.value = `${value}%`;
  mainPreviewNode.style.transform = `scale(${value / 100})`;
};

const setScaleHandlers = () => {
  scaleDownNode.addEventListener('click', () => {
    const scaleAfterClick = parseInt(scaleValueNode.value, 10) - SCALE_STEP;

    setScale(scaleAfterClick);
  });

  scaleUpNode.addEventListener('click', () => {
    const scaleAfterClick = parseInt(scaleValueNode.value, 10) + SCALE_STEP;

    setScale(scaleAfterClick);
  });
};

export { setScaleHandlers };
