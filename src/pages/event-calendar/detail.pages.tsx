import { Event } from '_interfaces/event-calendar.interfaces';
import React, { useState } from 'react';
import { Button, Modal } from 'react-daisyui';

interface DetailEventModalProps {
    open: boolean;
    onClose: () => void;
    eventData: Event;
  }

const DetailEventModal: React.FC<DetailEventModalProps> = ({ open, onClose, eventData }) => {
  return (
    <>
      <Modal backdrop={true} open={open} className="bg-white">
        <Modal.Header>
            <h3 className="text-2xl text-[#262626] font-bold">Edit Event</h3>
        </Modal.Header>
        <Modal.Body>
            <div className="mt-6">
                <img
                  className="flex mx-auto object-fill mb-6 w-full"
                  src={eventData.banner}
                  alt=""
                />
              </div>
            <div className="mb-6">
                <label htmlFor="title" className="block font-semibold mb-4">
                Title
                </label>
                <p>{eventData.title}</p>
            </div>
          
            <div className="flex flex-col gap-2 mb-6">
                <div data-color-mode="light" className="flex flex-col gap-2">
                    <label className="block font-semibold mb-4">Description</label>
                    <p>{eventData.description}</p>
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="date" className="block font-semibold mb-4">
                Date
                </label>
                <p>{eventData.date}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="location" className="block font-semibold mb-4">
                Location
                </label>
                <p>{eventData.location}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="link" className="block font-semibold mb-4">
                Link
                </label>
                <p>{eventData.link}</p>
            </div>
          </Modal.Body>
          <Modal.Actions className='flex justify-center'>
            <Button onClick={onClose} className='rounded-full px-6 py-2'>Close</Button>
          </Modal.Actions>
      </Modal>
    </>
  );
};

export default DetailEventModal;
