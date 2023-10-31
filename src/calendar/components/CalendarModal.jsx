import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useUiStore } from '../../hooks';




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {
  
  const { isDateModalOpen, closeDateModal  } = useUiStore();

  
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValue] = useState({
    title: '', 
    notes: '',
    start: new Date(),
    end: addHours(new Date() , 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return '';
    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid';
  }, [formValues.title,formSubmited])

  const OnCloseModal = () => {
    console.log('cerrando OnCloseModal');
    closeDateModal();
  }

  const onInputChange = ({target}) => {
    setFormValue({
      ...formValues,
      [target.name] : target.value,
   })
      
  }

  const onDateChange = (event, changing) => {
    setFormValue({
      ...formValues,
      [changing]:event,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start)
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Review the dates','','error')
      return;
    }
    if (formValues.title.length <= 0) return;
    
  }


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={ OnCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> New event </h1>
      <hr />
      <form className="container"
      onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Start date and time &nbsp;</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event)=> onDateChange(event,'start')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>End date and time &nbsp;</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChange(event, 'end')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titles and notes</label>
          <input
            type="text"
            className={`form-control ${titleClass}` }
            placeholder="Títle of the event"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Small description</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
         &nbsp; <span>Save</span>
        </button>

      </form>
    </Modal>
  )
}
