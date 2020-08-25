import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("userlog_pkey", ["id"], { unique: true })
@Entity("userlog", { schema: "public" })
export class Userlog {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "behavior", length: 20 })
  behavior: string;

  @Column("timestamp without time zone", { name: "createdat" })
  createdat: Date;

  @ManyToOne(() => User, (user) => user.userlogs)
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: User;
}
