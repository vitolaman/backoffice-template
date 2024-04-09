import { EventCalendarRes } from '../_interfaces/event-calendar.interfaces';

export const dummyEvents: EventCalendarRes = {
  data: [
    {
      id: 'event1',
      title: 'Conference on Artificial Intelligence',
      banner: 'https://picsum.photos/id/238/800/400',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut volutpat nulla. Cras auctor, lacus vitae ullamcorper suscipit, ligula eros laoreet libero, eget lobortis nulla arcu in nunc.',
      date: '2024-04-15',
      location: 'New York City',
      link: 'https://example.com/conference-on-ai',
      created_at: '2024-04-01T09:00:00Z',
    },
    {
      id: 'event2',
      title: 'Web Development Workshop',
      banner: 'https://picsum.photos/id/240/800/400',
      description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus ut nunc at lacus tristique mollis a at sapien. Nam at varius odio, nec efficitur tortor.',
      date: '2024-05-20',
      location: 'San Francisco',
      link: 'https://example.com/web-dev-workshop',
      created_at: '2024-04-05T10:00:00Z',
    },
    {
      id: 'event3',
      title: 'Data Science Symposium',
      banner: 'https://picsum.photos/id/239/800/400',
      description: 'Phasellus auctor id nunc sit amet dictum. Curabitur finibus arcu nulla, nec ullamcorper purus tincidunt vel. Fusce posuere vehicula ex, vitae congue purus rhoncus at.',
      date: '2024-06-30',
      location: 'Chicago',
      link: 'https://example.com/data-science-symposium',
      created_at: '2024-04-10T11:00:00Z',
    },
  ],
  meta: {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
  },
};
