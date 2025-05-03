import { FormEvent, useState } from "react";
import './Modal.css'
type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {phone:string; name: string}) => void;
}



export default function Modal({isOpen, onClose, onSubmit}: Props) {
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
    })
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]:value}))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    }

    if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        
        <h3>Укажите ваш номер, мы перезвоним вам в ближайшее время</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Ваш телефон *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ваше имя"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}