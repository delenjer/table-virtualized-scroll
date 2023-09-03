import {FC, memo} from 'react';

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {getPersonInfo} from '@/app/api/api';
import {useQuery} from '@tanstack/react-query';
import {Person} from '@/models/persons/persons-model';
import {Spinner} from '@/app/components/Spinner/Spinner';

type ModalComponentProps = {
  open: boolean,
  setOpen: (arg0: boolean) => void,
  personId: string,
}

export const ModalComponent:FC<ModalComponentProps> = memo((
{
  open,
  setOpen,
  personId
}) => {
  const { data, isLoading } = useQuery<Person>(['todos', personId], () => getPersonInfo(personId));
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-box">
        {
          isLoading ? (
            <Spinner />
          ) : (
            <>
              <button
                type="button"
                className="close"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>

              <h3 className="modal-title">Person info</h3>

              <ul className="person-list">
                <li className="person-list__item">
                  <span className="person-list__item--title">Name:</span>

                  { data?.firstName }
                </li>

                <li className="person-list__item">
                  <span className="person-list__item--title">Last Name:</span>

                  { data?.lastName }
                </li>

                <li className="person-list__item">
                  <span className="person-list__item--title">Age:</span>

                  { data?.age }
                </li>

                <li className="person-list__item">
                  <span className="person-list__item--title">Progress:</span>

                  { data?.progress }
                </li>

                <li className="person-list__item">
                  <span className="person-list__item--title">Visits:</span>

                  { data?.visits }
                </li>
              </ul>
            </>
          )
        }
      </div>
    </Modal>
  )
});

ModalComponent.displayName = 'ModalComponent';
