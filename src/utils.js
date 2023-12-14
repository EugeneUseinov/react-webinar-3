/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function createCategoryList (items) {
  return createCategoryArray(createDataTree(items))
}
//Формируем дерево родители => потомки
function createDataTree(items) {
  const categoryTree = [];
  const treeTable = Object.create(null);
  items.forEach(
    (category) => (treeTable[category._id] = { ...category, child: [] })
  );
  items.forEach((category) => {
    if (category.parent?._id)
      treeTable[category.parent._id].child.push(treeTable[category._id]);
    else categoryTree.push(treeTable[category._id]);
  });
  return categoryTree;
}
//Формируем массив категорий с учётом вложенности
function createCategoryArray(item, parentId, id = 0) {
  return item.reduce((acc, el) => {
    const dash = "- ";
    const title = `${
      !parentId
        ? el.title
        : dash.repeat(id) + el.title
    }`;
    const value = el._id;
    acc.push({ value, title });
    if(el.child.length) {
      acc = [...acc, ...createCategoryArray(el.child, title, id + 1)];
    }
    return acc;
  }, []);
}
