import { BaseEntity } from "@mikro-orm/core";
export class CustomBaseEntity extends BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, createdAt: Date, updatedAt: Date) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const schema = new EntitySchema<CustomBaseEntity>({
  name: "CustomBaseEntity",
  abstract: true,
  properties: {
    id: { type: "number", primary: true },
    createdAt: { type: "Date", onCreate: () => new Date(), nullable: true },
    updatedAt: {
      type: "Date",
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
      nullable: true,
    },
  },
});
