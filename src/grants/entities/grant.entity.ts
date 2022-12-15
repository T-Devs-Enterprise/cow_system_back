import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

export enum Resource {
  ANIMALS = 'animals',
  USERS = 'users',
}

export enum Operation {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Possession {
  ANY = 'any',
  OWN = 'own',
}

@ObjectType()
@Entity()
export class Grant extends BaseEntity {
  @Field({ description: 'Id field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.grants, { eager: true })
  @JoinColumn({
    name: 'roleId',
  })
  public role: Role;

  @Field()
  @Column({
    type: 'enum',
    enum: Resource,
    default: Resource.ANIMALS,
    nullable: false,
  })
  resource: Resource;

  @Field()
  @Column({
    type: 'enum',
    enum: Operation,
    default: Operation.READ,
    nullable: false,
  })
  operation: Operation;

  @Field()
  @Column({
    type: 'enum',
    enum: Possession,
    default: Possession.ANY,
    nullable: false,
  })
  possession: Possession;

  // @Field()
  // @Column({
  //   generatedType: 'STORED',
  //   asExpression: `operation || ':' || 'possession'`,
  // })
  // action: string;
  // @Expose()
  // public get action() {
  //   return `${this.operation}:${this.possession}`;
  // }
  @IsOptional()
  public action: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  generateAction(): void {
    this.action = `${this.operation}:${this.possession}`;
  }

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  attributes: string;
}
