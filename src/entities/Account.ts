import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("account_pkey", ["id"], { unique: true })
@Index("account_username_key", ["username"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "username",
    nullable: true,
    unique: true,
    length: 20,
  })
  username: string | null;

  @Column("bytea", { name: "hashedpassword" })
  hashedpassword: Buffer;

  @Column("character varying", { name: "salt", length: 20 })
  salt: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: User;
}
