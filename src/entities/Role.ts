import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Index("role_pkey", ["id"], { unique: true })
@Entity("role", { schema: "public" })
export class Role {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 20 })
  name: string | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
