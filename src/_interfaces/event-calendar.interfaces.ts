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
    totalPages: number;
    hasNextPage: boolean;
}

export interface EventCalendarRes {
    data: EventList;
    meta: Metadata;
}

export interface EventListReq {
    search: string;
    limit: number;
    page: number;
}

export interface CreateEventReq {
    title: string;
    banner: string;
    date: string;
    description: string;
    location: string;
    link: string;
}

export interface CreateEventForm {
    title: string;
    banner: string | FileList;
    date: string;
    description: string;
    location: string;
    link: string;
}
  
export interface UpdateEventReq {
    id: string;
    title: string;
    banner: string;
    date: string;
    description: string;
    location: string;
    link: string;
}
 
export interface UpdateEventForm {
    id: string;
    title: string;
    banner: string | FileList;
    date: string;
    description: string;
    location: string;
    link: string;
}

export interface EventDetailRes {
    data: Event;
    meta: Metadata;
}