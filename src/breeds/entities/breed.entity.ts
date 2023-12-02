import { Cat } from "src/cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column({ unique: true, length: 30, })
  name: string

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[]
}
