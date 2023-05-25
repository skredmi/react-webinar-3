/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function resultPages(activePage, pageCount) {
  let pages = [activePage];
  if (pageCount <= 7) {
    pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  } else {
    const diffBefore = activePage - 1;
    const diffAfter = pageCount - activePage;
    if (diffBefore >= 3) {
      if (Number(activePage) === Number(pageCount)) {
        pages.unshift(1, "...", activePage - 2, activePage - 1);
      } else {
        pages.unshift(1, "...", activePage - 1);
      }
    } else if (diffBefore === 2) {
      pages.unshift(1, pages - 1);
    } else if (diffBefore === 1) {
      pages.unshift(1);
    }

    if (diffAfter >= 3) {
      if (Number(activePage) === Number(1)) {
        pages.push(
          Number(activePage) + Number(1),
          Number(activePage) + Number(2),
          "...",
          pageCount
        );
      } else {
        pages.push(Number(activePage) + Number(1), "...", pageCount);
      }
    } else if (diffAfter === 2) {
      pages.push(Number(activePage) + Number(1), pageCount);
    } else if (diffAfter === 1) {
      pages.push(pageCount);
    }
  }
  return pages;
}
