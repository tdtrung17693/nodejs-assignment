import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";

@Entity("User", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string | null;

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

  @OneToOne(() => User)
  @JoinColumn([{ name: "createdby", referencedColumnName: "id" }])
  createdby: User;

  @OneToOne(() => User)
  @JoinColumn([{ name: "deletedby", referencedColumnName: "id" }])
  deletedby: User;

  @OneToOne(() => User)
  @JoinColumn([{ name: "updatedby", referencedColumnName: "id" }])
  updatedby: User;
}
