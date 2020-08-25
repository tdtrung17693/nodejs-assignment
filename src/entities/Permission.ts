import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Index("permission_pkey", ["id"], { unique: true })
@Entity("permission", { schema: "public" })
export class Permission {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "permissionname",
    nullable: true,
    length: 20,
  })
  permissionname: string | null;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: "permissionrole",
    joinColumns: [{ name: "permissionid", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "roleid", referencedColumnName: "id" }],
    schema: "public",
  })
  roles: Role[];
}
