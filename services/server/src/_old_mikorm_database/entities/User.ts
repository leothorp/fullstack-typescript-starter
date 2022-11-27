import { Entity, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
@Entity()
export class User extends CustomBaseEntity {
  @Property()
  title!: string;

  @ManyToOne()
  author!: Author;

  @ManyToOne()
  publisher?: Ref<Publisher>;

  @ManyToMany({ fixedOrder: true })
  tags = new Collection<BookTag>(this);
}
