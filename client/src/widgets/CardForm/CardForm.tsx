import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CardApi } from '../../entities/card/api/CardApi';
import { CardType } from '../../entities/card/model';
import './CardForm.css';

const INITIAL_INPUTS_DATA = {
  title: '',
  description: '',
  price: 0,
  url: '',
};

type Props = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  user: { id: number } | null;
};

export default function CardForm({ setCards, user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { cardId } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Загрузка данных карточки для редактирования
  useEffect(() => {
    if (cardId) {
      const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await CardApi.getById(Number(cardId));
          if (response.statusCode === 200 && response.data) {
            setInputs(response.data);
            if (response.data.url) {
              setPreview(response.data.url);
            }
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Произошла неизвестная ошибка');
          }
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    } else {
      setInputs(INITIAL_INPUTS_DATA);
      setPreview(null);
      setFile(null);
    }
  }, [cardId]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length) {
      handleFile(files[0]);
    }
  };

  // Обработчик выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      handleFile(files[0]);
    }
  };

  // Валидация и установка файла
  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой (максимум 5MB)');
      return;
    }

    setFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Обработчик изменения полей формы
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  // Отправка формы
  const onSubmitHandler = async (e: React.FormEvent) => {
    if (user && user.id !== 1) {
      setError('Только администратор может создавать/изменять карточки');
      setIsLoading(false);
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError('Требуется авторизация');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);
      formData.append('price', inputs.price.toString());
      formData.append('authorId', user.id.toString());

      if (file) {
        formData.append('image', file);
      } else if (inputs.url) {
        formData.append('url', inputs.url);
      }

      let result;
      if (cardId) {
        result = await CardApi.update(Number(cardId), formData);
      } else {
        result = await CardApi.create(formData);
      }

      if ([200, 201].includes(result.statusCode) && result.data) {
        setCards((prev) => {
          if (!result.data) return prev;
          return cardId
            ? prev.map((el) => (el.id === cardId ? result.data! : el))
            : [...prev, result.data!];
        });
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(
          error.message.includes('403')
            ? 'Недостаточно прав для выполнения операции'
            : error.message,
        );
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const { title, description, price } = inputs;

  return (
    <form onSubmit={onSubmitHandler} className="card-form">
      <h2>{cardId ? 'Редактирование карточки' : 'Создание новой карточки'}</h2>

      <div className="form-group">
        <label>Название:</label>
        <input type="text" name="title" value={title} onChange={onChangeHandler} required />
      </div>

      <div className="form-group">
        <label>Описание:</label>
        <input name="description" value={description} onChange={onChangeHandler} required />
      </div>

      <div className="form-group">
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={onChangeHandler}
          required
          min="0"
        />
      </div>

      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Превью" className="preview-image" />
            <button
              type="button"
              className="change-image-btn"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}>
              Изменить изображение
            </button>
          </div>
        ) : (
          <>
            <p>Перетащите изображение сюда или</p>
            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} />
            <label htmlFor="file-upload" className="file-upload-label">
              Выберите файл
            </label>
          </>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : cardId ? 'Обновить' : 'Создать'}
      </button>
    </form>
  );
}
