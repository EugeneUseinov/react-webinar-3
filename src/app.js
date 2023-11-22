import React from 'react';
import {pluralization} from './utils';
import './styles.css';

//Счётчик выделений
const renderTitle = (item) => {
  if (item.count) {
    return `${item.title} | Выделяли ${item.count} ${pluralization(item.count, ['раз', 'раза', 'раз'])}`
  }
  return item.title;
}

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{renderTitle(item)}</div>
                <div className='Item-actions'>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    store.deleteItem(item.code)
                  }}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
