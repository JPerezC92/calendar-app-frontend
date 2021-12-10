import { User } from 'src/modules/auth/types';
import { Entity, UniqueEntityID } from 'src/modules/shared/Domain';

interface CalendarEventProps {
  readonly notes: string;
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly user: User;
}

export interface ReactBigCalendarEvent {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: User;
}

export class CalendarEvent extends Entity {
  get id(): UniqueEntityID {
    return this._id;
  }
  public readonly props: CalendarEventProps;

  private constructor(props: CalendarEventProps, id: UniqueEntityID) {
    super(id);
    this.props = props;
  }

  public static create(
    props: CalendarEventProps,
    id: UniqueEntityID
  ): CalendarEvent {
    return new CalendarEvent({ ...props }, id);
  }
}
