import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { User } from "./User";

@Index("fileinstance_pkey", ["id"], { unique: true })
@Entity("fileinstance", { schema: "public" })
export class Fileinstance {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "filename", length: 20 })
  filename: string;

  @Column("character varying", { name: "extension", length: 5 })
  extension: string;

  @Column("character varying", { name: "path", length: 200 })
  path: string;

  @ManyToMany(() => User, (user) => user.fileinstances)
  @JoinTable({
    name: "userfileinstance",
    joinColumns: [{ name: "fileinstanceid", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "userid", referencedColumnName: "id" }],
    schema: "public",
  })
  users: User[];
}
