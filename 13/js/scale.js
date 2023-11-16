const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const PERCENTAGE_DENOMINATOR = 100;

const mainPreviewNode = document.querySelector('.img-upload__preview > img');
const scaleNode = document.querySelector('.img-upload__scale');
const scaleValueNode = scaleNode.querySelector('.scale__control--value');
const scaleDownNode = scaleNode.querySelector('.scale__control--smaller');
const scaleUpNode = scaleNode.querySelector('.scale__control--bigger');

const setScale = (percentageValue) => {
  if (percentageValue < SCALE_MIN) {
    percentageValue = SCALE_MIN;
  } else if (percentageValue > SCALE_MAX) {
    percentageValue = SCALE_MAX;
  }

  scaleValueNode.value = `${percentageValue}%`;
  mainPreviewNode.style.transform = `scale(${percentageValue / PERCENTAGE_DENOMINATOR})`;
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
