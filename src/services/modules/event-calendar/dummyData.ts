import { EventForm, EventFormReq } from "_interfaces/event-calendar.interfaces";
import { Event, EventList, EventListReq } from "../../../_interfaces/event-calendar.interfaces";
import { dummyEvents } from "../../../data/event-calendar";


export const searchEvents = async (searchParams: EventListReq): Promise<EventList> => {
    const filteredEvents = dummyEvents.data.filter(event => {
      const { search } = searchParams;
      const isSearchMatch = event.title.toLowerCase().includes(search.toLowerCase());
      return isSearchMatch;
    });
  
    const { limit, page } = searchParams;
    const startIndex = (page - 1) * limit;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);
  
    return paginatedEvents;
  };

const fetchAllEvents = async (): Promise<EventList> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyEvents.data);
      }, 1000);
    });
  };
  
const fetchEventById = async (id: string): Promise<Event | undefined> => {
    return dummyEvents.data.find(event => event.id === id);
};
  
const createEvent = async (event: EventFormReq): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dummyEvents.data.push(event);
        resolve();
      }, 500);
    });
};
  
const updateEvent = async (event: Event): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = dummyEvents.data.findIndex((e) => e.id === event.id);
        console.log(index);
        if (index !== -1) {
          dummyEvents.data[index] = event;
        }
        resolve();
      }, 500);
    });
};
  
  
const deleteEvent = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = dummyEvents.data.findIndex(event => event.id === id);
        if (index !== -1) {
          dummyEvents.data.splice(index, 1);
        }
        resolve();
      }, 500);
    });
};

export { fetchAllEvents, fetchEventById, createEvent, updateEvent, deleteEvent };
