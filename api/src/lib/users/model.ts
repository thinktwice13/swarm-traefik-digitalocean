import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  passphrase: string
}
