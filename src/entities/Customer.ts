import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Server } from "./Server";

@Index("customer_pkey", ["id"], { unique: true })
@Entity("customer", { schema: "public" })
export class Customer {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "createdat",
    nullable: true,
    default: () => "timezone('utc', now())",
  })
  createdat: Date | null;

  @Column("timestamp without time zone", { name: "updatedat", nullable: true })
  updatedat: Date | null;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("date", { name: "contractbegindate", nullable: true })
  contractbegindate: string | null;

  @Column("date", { name: "contractenddate", nullable: true })
  contractenddate: string | null;

  @Column("uuid", { name: "contactpoint", nullable: true })
  contactpoint: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 200,
  })
  description: string | null;

  @Column("bit", {
    name: "status",
    nullable: true,
    default: () => "(1)::bit(1)",
  })
  status: string | null;

  @ManyToOne(() => User, (user) => user.customers)
  @JoinColumn([{ name: "createdby", referencedColumnName: "id" }])
  createdby: User;

  @ManyToOne(() => User, (user) => user.customers2)
  @JoinColumn([{ name: "updatedby", referencedColumnName: "id" }])
  updatedby: User;

  @ManyToMany(() => Server, (server) => server.customers)
  @JoinTable({
    name: "customerserver",
    joinColumns: [{ name: "customerid", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "serverid", referencedColumnName: "id" }],
    schema: "public",
  })
  servers: Server[];
}
