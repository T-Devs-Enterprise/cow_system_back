import { forwardRef, Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { AnimalsModule } from 'src/animals/animals.module';
import { AnimalsService } from 'src/animals/animals.service';
import { Grant } from 'src/grants/entities/grant.entity';
import { GrantsModule } from 'src/grants/grants.module';
import { GrantsService } from 'src/grants/grants.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
  ],
  exports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
  ],
})
export class CommonModule {}
