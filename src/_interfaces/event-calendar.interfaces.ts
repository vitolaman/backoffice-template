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

export interface EventForm {
    id: string;
    title: string;
    banner: ImageUpload;
    date: string;
    description: string;
    location: string;
    link: string;
    created_at: string;
}
  
export interface EventFormReq {
    id: string;
    title: string;
    banner: string;
    date: string;
    description: string;
    location: string;
    link: string;
    created_at: string;
}
  
interface ImageUpload {
    image_url: string;
    image_link: string | File;
}
  
