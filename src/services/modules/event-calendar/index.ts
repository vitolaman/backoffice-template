import {
  EventList,
  EventListReq,
  EventCalendarRes,
  CreateEventForm,
  UpdateEventForm,
} from "_interfaces/event-calendar.interfaces";
import { Api } from "services/api";

export const eventCalendarApi = Api.injectEndpoints({
  endpoints: (build) => ({
    EventList: build.query<EventCalendarRes, EventListReq>({
      query: (param) =>
        `admin-portal/v1/event-calendar?search=${param.search}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    EventDetail: build.query<EventList, { id: string }>({
      query: (param) => `admin-portal/v1/event-calendar/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    CreateEvent: build.mutation<string, CreateEventForm>({
      query(body) {
        return {
          url: `/admin-portal/v1/event-calendar/create`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    UpdateEvent: build.mutation<string, UpdateEventForm>({
      query(body) {
        return {
          url: `admin-portal/v1/event-calendar/${body.id}`,
          method: "PUT",
          body: {
            ...body,
          },
        };
      },
    }),
    DeleteEvent: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `admin-portal/v1/event-calendar/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useEventDetailQuery,
  useEventListQuery,
} = eventCalendarApi;
