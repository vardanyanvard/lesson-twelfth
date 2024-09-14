import { useContext } from "react";
import { ActionTypes, IEvent } from "../lib/Types";
import { Context } from "../lib/Context";
import { deleteEvents } from "../lib/Api";

interface IProps {
  event: IEvent;
}
export const Event: React.FC<IProps> = ({ event }) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("error");
  }

  const { dispatch } = context;

  const deleteEventById = (id: number | string) => {
    deleteEvents(id).then((deletedItem) => {
      dispatch({ type: ActionTypes.RemoveEvent, payload: deletedItem.id });
    });
  };

  return (
    <div>
      <img src={event.cover} />
      <p>{event.title}</p>
      <p>
        {event.date} at {event.time}
      </p>
      <strong>{event.type}</strong>
      <p>By {event.composer}</p>
      <button onClick={() => deleteEventById(event.id)}>delete</button>
    </div>
  );
};
