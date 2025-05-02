class CardValidator {
  static validate(data) {
    const { title, description, price, url, authorId } = data;

    // Валидация title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return {
        isValid: false,
        error: 'Title is required and must be a non-empty string.',
      };
    }

    // Валидация description
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return {
        isValid: false,
        error: 'Description is required and must be a non-empty string.',
      };
    }

    // Валидация price
    if (price === undefined || price === null || typeof price !== 'number' || price <= 0) {
      return {
        isValid: false,
        error: 'Price is required and must be a positive number.',
      };
    }

    // Валидация url
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return {
        isValid: false,
        error: 'URL is required and must be a non-empty string.',
      };
    }

   

    // Валидация authorId
    if (!authorId || typeof authorId !== 'number' || authorId <= 0) {
      return {
        isValid: false,
        error: 'Author ID is required and must be a positive number.',
      };
    }

    // Если все проверки пройдены
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = CardValidator;