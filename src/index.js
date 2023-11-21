import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {DEFAULT_COUNT} from './constants.js'
import {counter} from './utils.js';

const store = new Store({
  list: [
    {code: counter(), title: 'Название элемента', count: DEFAULT_COUNT},
    {code: counter(), title: 'Некий объект', count: DEFAULT_COUNT},
    {code: counter(), title: 'Заголовок', count: DEFAULT_COUNT},
    {code: counter(), title: 'Очень длинное название элемента из семи слов', count: DEFAULT_COUNT},
    {code: counter(), title: 'Запись', count: DEFAULT_COUNT},
    {code: counter(), title: 'Шестая запись', count: DEFAULT_COUNT},
    {code: counter(), title: 'Седьмая запись', count: DEFAULT_COUNT},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
