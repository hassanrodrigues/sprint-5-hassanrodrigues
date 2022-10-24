import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Adress } from "./adresses.entity";
import { Category } from "./category.entity";
import { Schedules_user_propertie } from "./schedules_user_properties.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Adress, { eager: true })
  @JoinColumn()
  address: Adress;

  @OneToMany(
    () => Schedules_user_propertie,
    (schedules_user_properties) => schedules_user_properties.properties,
    {
      eager: true,
    }
  )
  @JoinColumn()
  schedules: Schedules_user_propertie[];

  @ManyToOne(() => Category, (categories) => categories.properties, {
    eager: true,
  })
  @JoinColumn()
  category: Category;
}
