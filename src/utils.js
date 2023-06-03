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

export function buildTree(categories, parent = null, visited = new Set()) {
  let node = {};
  categories
    .filter(category => category.parent?._id === parent?._id)
    .forEach(category => {
      if (!visited.has(category._id)) {
        visited.add(category._id);
        node[category.title] = {
          id: category._id,
          ...buildTree(categories, category, visited)
        };
      }
    });
  return node;
}

export function isValidToken(token) {
  if (typeof token !== "string") { // проверяем, что token является строкой
      return false;
  }
  if (token.length !== 64) { // проверяем длину token
      return false;
  }
  const regex = /^[0-9a-fA-F]+$/; // регулярное выражение для проверки наличия только шестнадцатеричных символов
  if (!regex.test(token)) { // проверяем соответствие token регулярному выражению
      return false;
  }
  return true; // если все проверки пройдены, возвращаем true
}