export interface Event {
    id: string;
    title: string;
    banner: string;
    description: string;
    date: string;
    location: string;
    link: string;
    created_at: string;
}

export type EventList = Event[];


export interface Metadata {
    currentPage: number;
    limit: number;
    totalPage: number;
    totalRow: number;
}

export interface EventCalendarRes {
    data: EventList;
    metadata: Metadata;
}

export interface EventListReq {
    search: string;
    limit: number;
    page: number;
}

export interface CreateEventForm {
    title: string;
    banner: string;
    date: string | File;
    description: string;
    location: string;
    link: string;
    created_at: string;
}
  
export interface UpdateEventForm {
    id: string;
    title: string;
    banner: string | File;
    date: string;
    description: string;
    location: string;
    link: string;
    created_at: string;
}
  
