const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const Route = {
  [Method.GET]: '/data',
  [Method.POST]: '/',
};
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Ошибка загрузки файла'
};

const load = async (method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${Route[method]}`, { method, body });

  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getData = async () => load();

const sendData = async (body) => load(Method.POST, body);

export { getData, sendData };
