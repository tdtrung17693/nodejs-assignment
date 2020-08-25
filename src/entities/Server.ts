import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { Customer } from "./Customer";
import { Request } from "./Request";

@Index("server_pkey", ["id"], { unique: true })
@Entity("server", { schema: "public" })
export class Server {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "createdby", nullable: true })
  createdby: string | null;

  @Column("timestamp without time zone", {
    name: "createdat",
    nullable: true,
    default: () => "timezone('utc', now())",
  })
  createdat: Date | null;

  @Column("uuid", { name: "updatedby", nullable: true })
  updatedby: string | null;

  @Column("timestamp without time zone", { name: "updatedat", nullable: true })
  updatedat: Date | null;

  @Column("uuid", { name: "deletedby", nullable: true })
  deletedby: string | null;

  @Column("timestamp without time zone", { name: "deletedat", nullable: true })
  deletedat: Date | null;

  @Column("bit", {
    name: "isdeleted",
    nullable: true,
    default: () => "(0)::bit(1)",
  })
  isdeleted: string | null;

  @Column("character varying", { name: "name", length: 150 })
  name: string;

  @Column("character varying", { name: "ipaddress", length: 15 })
  ipaddress: string;

  @Column("date", { name: "startdate" })
  startdate: string;

  @Column("date", { name: "enddate" })
  enddate: string;

  @ManyToMany(() => Customer, (customer) => customer.servers)
  customers: Customer[];

  @OneToMany(() => Request, (request) => request.server)
  requests: Request[];
}
