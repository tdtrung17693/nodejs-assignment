import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Account } from "./Account";
import { Comment } from "./Comment";
import { Customer } from "./Customer";
import { Request } from "./Request";
import { Fileinstance } from "./Fileinstance";
import { Userlog } from "./Userlog";

@Index("User_email_key", ["email"], { unique: true })
@Index("User_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("timestamp without time zone", {
    name: "createdat",
    default: () => "timezone('utc', now())",
  })
  createdat: Date;

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

  @Column("character varying", {
    name: "firstname",
    nullable: true,
    length: 50,
  })
  firstname: string | null;

  @Column("character varying", { name: "lastname", nullable: true, length: 50 })
  lastname: string | null;

  @Column("character varying", {
    name: "email",
    nullable: true,
    unique: true,
    length: 256,
  })
  email: string | null;

  @ManyToOne(() => User, (user) => user.users)
  @JoinColumn([{ name: "createdby", referencedColumnName: "id" }])
  createdby: User;

  @OneToMany(() => User, (user) => user.createdby)
  users: User[];

  @ManyToOne(() => User, (user) => user.users2)
  @JoinColumn([{ name: "deletedby", referencedColumnName: "id" }])
  deletedby: User;

  @OneToMany(() => User, (user) => user.deletedby)
  users2: User[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Role;

  @ManyToOne(() => User, (user) => user.users3)
  @JoinColumn([{ name: "updatedby", referencedColumnName: "id" }])
  updatedby: User;

  @OneToMany(() => User, (user) => user.updatedby)
  users3: User[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Comment, (comment) => comment.createdby)
  comments: Comment[];

  @OneToMany(() => Comment, (comment) => comment.deletedby)
  comments2: Comment[];

  @OneToMany(() => Comment, (comment) => comment.updatedby)
  comments3: Comment[];

  @OneToMany(() => Customer, (customer) => customer.createdby)
  customers: Customer[];

  @OneToMany(() => Customer, (customer) => customer.updatedby)
  customers2: Customer[];

  @OneToMany(() => Request, (request) => request.createdby)
  requests: Request[];

  @OneToMany(() => Request, (request) => request.deletedby)
  requests2: Request[];

  @OneToMany(() => Request, (request) => request.updatedby)
  requests3: Request[];

  @ManyToMany(() => Fileinstance, (fileinstance) => fileinstance.users)
  fileinstances: Fileinstance[];

  @OneToMany(() => Userlog, (userlog) => userlog.user)
  userlogs: Userlog[];
}
