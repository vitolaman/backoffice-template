import { Event } from '_interfaces/event-calendar.interfaces';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-daisyui';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventDetailQuery } from 'services/modules/event-calendar';

interface DetailEventModalProps {
    open: boolean;
    onClose: () => void;
    id: string;
  }

const DetailEventModal: React.FC<DetailEventModalProps> = ({ open, onClose, id }) => { 
  console.log(id); 
  const { data } = useEventDetailQuery({id});

  return (
    <>
      <Modal backdrop={true} open={open} className="bg-white">
        <Modal.Header>
            <h3 className="text-2xl text-[#262626] font-bold">Detail Event</h3>
        </Modal.Header>
        <Modal.Body>
            <div className="mt-6">
                <img
                  className="flex mx-auto mb-6 w-full h-48 object-cover"
                  src={data?.data.banner}
                  alt=""
                />
              </div>
            <div className="mb-6">
                <label htmlFor="title" className="block font-semibold mb-4">
                Title
                </label>
                <p>{data?.data.title}</p>
            </div>
          
            <div className="flex flex-col gap-2 mb-6">
                <div data-color-mode="light" className="flex flex-col gap-2">
                    <label className="block font-semibold mb-4">Description</label>
                    <p>{data?.data.description}</p>
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="date" className="block font-semibold mb-4">
                Date
                </label>
                <p>{data?.data.date}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="location" className="block font-semibold mb-4">
                Location
                </label>
                <p>{data?.data.location}</p>
            </div>
            <div className="mb-6">
                <label htmlFor="link" className="block font-semibold mb-4">
                Link
                </label>
                <p><a href={data?.data.link}>{data?.data.link}</a></p>
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
