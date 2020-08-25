import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Request } from "./Request";

@Index("historylog_pkey", ["id"], { unique: true })
@Entity("historylog", { schema: "public" })
export class Historylog {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "createdat",
    nullable: true,
    default: () => "timezone('utc', now())",
  })
  createdat: Date | null;

  @Column("character varying", { name: "message", length: 100 })
  message: string;

  @ManyToOne(() => Request, (request) => request.historylogs)
  @JoinColumn([{ name: "requestid", referencedColumnName: "id" }])
  request: Request;
}
