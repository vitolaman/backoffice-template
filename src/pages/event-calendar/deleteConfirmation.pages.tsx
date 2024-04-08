import React, { useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { useToast } from '../../components/toast/toast';
import { useDeleteEventMutation } from 'services/modules/event-calendar';
import { deleteEvent } from 'services/modules/event-calendar/dummyData';

interface DeleteEventModalProps {
    open: boolean;
    onClose: () => void;
    id: string;
  }

const { success, error } = useToast();

// const [deleteEventServices] = useDeleteEventMutation();

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ open, onClose, id }) => {
  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      success('Event successfully deleted');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal backdrop={true} open={open} className="bg-white flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded">
          <Modal.Header className="flex flex-col items-center">
            <h2>Confirm Delete</h2>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this event?</p>
          </Modal.Body>
          <Modal.Actions className="flex justify-around">
            <Button onClick={onClose} className='rounded-full px-6 py-2'>Cancel</Button>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2">
              Delete
            </Button>
          </Modal.Actions>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEventModal;
