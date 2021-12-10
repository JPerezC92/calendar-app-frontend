import { UniqueEntityID } from 'src/modules/shared/Domain';
import { CalendarEventDto } from '../../DTO';
import { CalendarEventFormValues } from '../../types';
import { CalendarEvent, ReactBigCalendarEvent } from '../Domain';

export class CalendarEventMap {
  public static toDTO(calendarEvent: CalendarEvent): CalendarEventDto {
    return {
      id: calendarEvent.id.toValue(),
      notes: calendarEvent.props.notes,
      title: calendarEvent.props.title,
      start: calendarEvent.props.start.toISOString(),
      end: calendarEvent.props.end.toISOString(),
      user: calendarEvent.props.user,
    };
  }

  private static transformDtoToEntity({
    id,
    ...props
  }: CalendarEventDto): CalendarEvent {
    return CalendarEvent.create(
      {
        ...props,
        start: new Date(props.start),
        end: new Date(props.end),
      },
      new UniqueEntityID(id)
    );
  }

  public static fromDTO(calendarEventDTO: CalendarEventDto): CalendarEvent {
    return this.transformDtoToEntity(calendarEventDTO);
  }

  public static toEntityCollection(
    calendarEventDTOCollection: CalendarEventDto[]
  ): CalendarEvent[] {
    return calendarEventDTOCollection.map((calendarEventDTO) =>
      this.transformDtoToEntity(calendarEventDTO)
    );
  }

  public static toFormValues(
    calendarEvent: CalendarEvent
  ): CalendarEventFormValues {
    return {
      title: calendarEvent.props.title,
      notes: calendarEvent.props.notes,
      start: new Date(calendarEvent.props.start).toISOString(),
      end: new Date(calendarEvent.props.end).toISOString(),
    };
  }

  public static toReactBigCalendarEvent(
    calendarEvent: CalendarEvent
  ): ReactBigCalendarEvent {
    const { title, notes, start, end, user } = calendarEvent.props;
    return {
      id: calendarEvent.id.toValue(),
      title,
      notes,
      start,
      end,
      user,
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
        user: calendarEvent.user,
      },
      new UniqueEntityID(calendarEvent.id)
    );
  }
}
