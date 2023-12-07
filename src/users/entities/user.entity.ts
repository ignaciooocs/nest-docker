import { Column, DeleteDateColumn, Entity } from "typeorm"

@Entity()
export class User {

  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column()
  name: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ default: 'user' })
  role: string

  @DeleteDateColumn()
  deletedAt: Date
}
