import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Request } from "./Request";

@Index("comment_pkey", ["id"], { unique: true })
@Entity("comment", { schema: "public" })
export class Comment {
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

  @Column("character varying", { name: "content", length: 300 })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: "createdby", referencedColumnName: "id" }])
  createdby: User;

  @ManyToOne(() => User, (user) => user.comments2)
  @JoinColumn([{ name: "deletedby", referencedColumnName: "id" }])
  deletedby: User;

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: "parentid", referencedColumnName: "id" }])
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  comments: Comment[];

  @ManyToOne(() => Request, (request) => request.comments)
  @JoinColumn([{ name: "requestid", referencedColumnName: "id" }])
  request: Request;

  @ManyToOne(() => User, (user) => user.comments3)
  @JoinColumn([{ name: "updatedby", referencedColumnName: "id" }])
  updatedby: User;
}
