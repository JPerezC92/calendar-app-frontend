import { Entity, UniqueEntityID } from 'src/modules/shared/Domain';

interface CalendarEventProps {
  readonly notes: string;
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly userId?: string;
}

export type CalendarEventDTO = {
  id?: string;
  title: string;
  notes: string;
  start: string;
  end: string;
  userId?: string;
};
export interface ReactBigCalendarEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  userId?: string;
}

export class CalendarEvent extends Entity {
  get id(): UniqueEntityID {
    return this._id;
  }
  public readonly props: CalendarEventProps;

  private constructor(
    props: Required<CalendarEventProps>,
    id?: UniqueEntityID
  ) {
    super(id);
    this.props = props;
  }

  public static create(
    props: CalendarEventProps,
    id?: UniqueEntityID
  ): CalendarEvent {
    return new CalendarEvent({ ...props, userId: props.userId ?? '' }, id);
  }
}
