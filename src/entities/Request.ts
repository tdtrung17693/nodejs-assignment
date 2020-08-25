import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Historylog } from "./Historylog";
import { User } from "./User";
import { Server } from "./Server";

@Index("request_pkey", ["id"], { unique: true })
@Entity("request", { schema: "public" })
export class Request {
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

  @Column("timestamp without time zone", { name: "deletedat", nullable: true })
  deletedat: Date | null;

  @Column("bit", {
    name: "isdeleted",
    nullable: true,
    default: () => "(0)::bit(1)",
  })
  isdeleted: string | null;

  @Column("character varying", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("character varying", { name: "title", nullable: true, length: 50 })
  title: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column("timestamp without time zone", { name: "startdate" })
  startdate: Date;

  @Column("timestamp without time zone", { name: "enddate" })
  enddate: Date;

  @Column("character varying", {
    name: "response",
    nullable: true,
    length: 200,
  })
  response: string | null;

  @OneToMany(() => Comment, (comment) => comment.request)
  comments: Comment[];

  @OneToMany(() => Historylog, (historylog) => historylog.request)
  historylogs: Historylog[];

  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn([{ name: "createdby", referencedColumnName: "id" }])
  createdby: User;

  @ManyToOne(() => User, (user) => user.requests2)
  @JoinColumn([{ name: "deletedby", referencedColumnName: "id" }])
  deletedby: User;

  @ManyToOne(() => Server, (server) => server.requests)
  @JoinColumn([{ name: "serverid", referencedColumnName: "id" }])
  server: Server;

  @ManyToOne(() => User, (user) => user.requests3)
  @JoinColumn([{ name: "updatedby", referencedColumnName: "id" }])
  updatedby: User;
}
