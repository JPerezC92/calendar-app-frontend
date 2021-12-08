import { UniqueEntityID } from 'src/modules/shared/Domain';
import { CalendarEventFormValues } from '../../types';
import { CalendarEvent, CalendarEventDTO } from '../Domain';

export class CalendarEventMap {
  public static fromEntityToDTO(
    calendarEvent: CalendarEvent
  ): CalendarEventDTO {
    return {
      id: calendarEvent.id.toString(),
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
        userId: calendarEventDTO.userId ?? '',
      },
      new UniqueEntityID(calendarEventDTO.id)
    );
  }

  public static fromDTOToEntity(
    calendarEventDTO: CalendarEventDTO
  ): CalendarEvent {
    return this.transformDtoToEntity(calendarEventDTO);
  }

  public static toEntityCollection(
    calendarEventDTOCollection: CalendarEventDTO[]
  ): CalendarEvent[] {
    return calendarEventDTOCollection.map((calendarEventDTO) =>
      this.transformDtoToEntity(calendarEventDTO)
    );
  }

  public static fromFormValuesToEntity(
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

  public static fromEntityToFormValues(
    calendarEvent: CalendarEvent
  ): Omit<CalendarEventDTO, 'id' | 'userId'> {
    return {
      title: calendarEvent.props.title,
      notes: calendarEvent.props.notes,
      start: new Date(calendarEvent.props.start).getTime().toString(),
      end: new Date(calendarEvent.props.end).getTime().toString(),
    };
  }

  public static entityToRequest(calendarEvent: CalendarEvent) {
    return JSON.stringify(this.fromEntityToDTO(calendarEvent));
  }
}
