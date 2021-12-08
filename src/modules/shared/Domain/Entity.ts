import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number | undefined> {
  constructor(id?: string | number) {
    super(id);
  }
}

const isEntity = (object: unknown): object is Entity => {
  return object instanceof Entity;
};

export abstract class Entity {
  protected readonly _id: UniqueEntityID;

  constructor(id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
  }

  public equals(object?: Entity): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
