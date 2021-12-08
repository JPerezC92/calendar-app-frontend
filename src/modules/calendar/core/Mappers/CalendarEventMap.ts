import { UniqueEntityID } from 'src/modules/shared/Domain';
import { CalendarEventFormValues } from '../../types';
import {
  CalendarEvent,
  CalendarEventDTO,
  ReactBigCalendarEvent,
} from '../Domain';

const sanitize = (object: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => typeof value !== 'undefined' && value !== null
    )
  );
};

export class CalendarEventMap {
  public static toDTO(calendarEvent: CalendarEvent): CalendarEventDTO {
    return {
      id: calendarEvent.id.toValue(),
      notes: calendarEvent.props.notes,
      title: calendarEvent.props.title,
      start: calendarEvent.props.start.toISOString(),
      end: calendarEvent.props.end.toISOString(),
      userId: calendarEvent.props.userId,
    };
  }

  private static transformDtoToEntity(
    calendarEventDTO: CalendarEventDTO
  ): CalendarEvent {
    return CalendarEvent.create(
      {
        ...calendarEventDTO,
        start: new Date(calendarEventDTO.start),
        end: new Date(calendarEventDTO.end),
        userId: calendarEventDTO.userId,
      },
      new UniqueEntityID(calendarEventDTO.id)
    );
  }

  public static fromDTO(calendarEventDTO: CalendarEventDTO): CalendarEvent {
    return this.transformDtoToEntity(calendarEventDTO);
  }

  public static toEntityCollection(
    calendarEventDTOCollection: CalendarEventDTO[]
  ): CalendarEvent[] {
    return calendarEventDTOCollection.map((calendarEventDTO) =>
      this.transformDtoToEntity(calendarEventDTO)
    );
  }

  public static fromFormValues(
    calendarEventFormValues: CalendarEventFormValues,
    id?: string
  ): CalendarEvent {
    return this.transformDtoToEntity({
      ...calendarEventFormValues,
      end: new Date(parseInt(calendarEventFormValues.end, 10)).toISOString(),
      start: new Date(
        parseInt(calendarEventFormValues.start, 10)
      ).toISOString(),
      id,
    });
  }

  public static toFormValues(
    calendarEvent: CalendarEvent
  ): Omit<CalendarEventDTO, 'id' | 'userId'> {
    return {
      title: calendarEvent.props.title,
      notes: calendarEvent.props.notes,
      start: new Date(calendarEvent.props.start).getTime().toString(),
      end: new Date(calendarEvent.props.end).getTime().toString(),
    };
  }

  public static toReactBigCalendarEvent(
    calendarEvent: CalendarEvent
  ): ReactBigCalendarEvent {
    const { title, notes, start, end, userId } = calendarEvent.props;
    return {
      id: calendarEvent.id.toValue(),
      title,
      notes,
      start,
      end,
      userId,
    };
  }

  public static toReactBigCalendarEventCollection(
    calendarEventCollection: CalendarEvent[]
  ): ReactBigCalendarEvent[] {
    return calendarEventCollection.map((calendarEvent) =>
      this.toReactBigCalendarEvent(calendarEvent)
    );
  }

  public static fromReactBigCalendarEvent(
    calendarEvent: ReactBigCalendarEvent
  ): CalendarEvent {
    return CalendarEvent.create(
      {
        title: calendarEvent.title,
        notes: calendarEvent.notes,
        start: calendarEvent.start,
        end: calendarEvent.end,
        userId: calendarEvent.userId,
      },
      new UniqueEntityID(calendarEvent.id)
    );
  }

  public static entityToRequest(calendarEvent: CalendarEvent) {
    return JSON.stringify(sanitize(this.toDTO(calendarEvent)));
  }
}
