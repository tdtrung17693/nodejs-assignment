import { Column, Entity, Index } from "typeorm";

@Index("emaillog_pkey", ["id"], { unique: true })
@Entity("emaillog", { schema: "public" })
export class Emaillog {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "receiver",
    nullable: true,
    length: 256,
  })
  receiver: string | null;

  @Column("character varying", { name: "subject", nullable: true, length: 300 })
  subject: string | null;

  @Column("character varying", { name: "content", nullable: true, length: 300 })
  content: string | null;

  @Column("timestamp without time zone", {
    name: "createdat",
    nullable: true,
    default: () => "timezone('utc', now())",
  })
  createdat: Date | null;

  @Column("character varying", { name: "status", nullable: true, length: 50 })
  status: string | null;
}
