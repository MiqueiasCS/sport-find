import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { IProvidersProps, IEvents } from "../../types/IProviders";
import api from "../../services/api";
import { useAuth } from "../Auth";
import { toast } from "react-toastify";

interface IEventData {
  name: string;
  group_Id: number;
  state: string;
  local: string;
  data: string;
  category: string;
  description: string;
  users: number[];
  creator: number;
}

interface IEditEventData {
  name: string;
  local: string;
  data: string;
  description: string;
}

interface IEventsProviderData {
  allEvents: IEvents[];
  createEvent: (eventData: IEventData) => void;
  cancelEvent: (event: IEvents) => void;
  editEvent: (event: IEvents, data: IEditEventData) => void;
  subscribeEvent: (event: IEvents) => void;
  leaveEvent: (event: IEvents) => void;
  ownedEvents: IEvents[];
  subscribedEvents: IEvents[];
}

const EventsContext = createContext<IEventsProviderData>(
  {} as IEventsProviderData
);

export const EventsProvider = ({ children }: IProvidersProps) => {
  const [allEvents, setAllEvents] = useState<IEvents[]>([]);
  const { token, user } = useAuth();

  const createEvent = (eventData: IEventData) => {
    if (eventData.creator === user.id) {
      api
        .post(
          "/events",
          { ...eventData, users: [eventData.creator] },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setAllEvents([...allEvents, response.data]);
          toast.success("Evento criado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Houve um erro na criação do evento!");
        });
    }
  };

  const cancelEvent = (event: IEvents) => {
    if (event.creator === user.id) {
      const newListEvents = allEvents.filter((item) => item.id !== event.id);

      api
        .delete(`/events/${event.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setAllEvents(newListEvents);
          toast.success("Evento foi cancelado!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Não foi possível cancelar o evento, tente novamente!");
        });
    }
  };

  const editEvent = (event: IEvents, data: IEditEventData) => {
    if (event.creator === user.id) {
      const newListEvents = allEvents.map((item) => {
        if (item.id === event.id) {
          item.name = data.name;
          item.data = data.data;
          item.local = data.local;
          item.description = data.description;
        }
        return item;
      });

      api
        .patch(`/events/${event.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setAllEvents(newListEvents);
          toast.success("Evento atualizado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Não foi possível atualizar o evento, tente novamente!");
        });
    }
  };

  const subscribeEvent = (event: IEvents) => {
    const newListEvents = allEvents.map((item) => {
      if (item.id === event.id) {
        item.users = [...item.users, user.id];
      }
      return item;
    });

    api
      .patch(
        `/events/${event.id}`,
        { users: [...event.users, user.id] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setAllEvents(newListEvents);
        toast.success("Confirmada sua participação!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Não foi possível se inscrever no evento, tente novamente!"
        );
      });
  };

  const leaveEvent = (event: IEvents) => {
    const newListSubscribe = event.users.filter((id) => id !== user.id);

    const newListEvents = allEvents.map((item) => {
      if (item.id === event.id) {
        item.users = newListSubscribe;
      }
      return item;
    });

    api
      .patch(
        `/events/${event.id}`,
        { users: newListSubscribe },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setAllEvents(newListEvents);
        toast.success("Você saiu do evento!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Não foi possível sair do evento, tente novamente!");
      });
  };

  useEffect(() => {
    if (!!token) {
      api
        .get("/events", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAllEvents(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  const ownedEvents = useMemo(() => {
    const result = allEvents.filter((item) => item.creator === user.id);
    return result;
  }, [allEvents, user.id]);

  const subscribedEvents = useMemo(() => {
    const result = allEvents.filter((item) => {
      return item["users"].some((id) => id === user.id);
    });
    return result;
  }, [allEvents, user.id]);

  return (
    <EventsContext.Provider
      value={{
        allEvents,
        createEvent,
        cancelEvent,
        editEvent,
        subscribeEvent,
        leaveEvent,
        ownedEvents,
        subscribedEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
