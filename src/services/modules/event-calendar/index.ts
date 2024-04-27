import {
  EventListReq,
  EventCalendarRes,
  CreateEventForm,
  UpdateEventForm,
  EventDetailRes,
} from "_interfaces/event-calendar.interfaces";
import { Api } from "services/api";

export const eventCalendarApi = Api.injectEndpoints({
  endpoints: (build) => ({
    EventList: build.query<EventCalendarRes, EventListReq>({
      query: (params) => {
        return {
          url: `event/`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    EventDetail: build.query<EventDetailRes, { id: string }>({
      query: (param) => `event/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    CreateEvent: build.mutation<string, CreateEventForm>({
      query(body) {
        return {
          url: `event/`,
          method: "POST",
          body,
        };
      },
    }),
    UpdateEvent: build.mutation<string, UpdateEventForm>({
      query(body) {
        const { id, ...formData } = body;
        return {
          url: `event/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),

    DeleteEvent: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `event/${body.id}`,
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
