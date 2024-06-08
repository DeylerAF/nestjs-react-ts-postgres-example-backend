import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_profile')
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({nullable: true})
  age: string;
}