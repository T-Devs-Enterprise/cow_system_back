import { forwardRef, Module } from '@nestjs/common';
import AdminJS, { RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { Database } from '@adminjs/typeorm';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Grant } from 'src/grants/entities/grant.entity';
import { componentLoader, Components } from './components';
import { CustomResource } from './admin.resource';
import { after, manyToManyComponent } from './hooks/many-to-many.hook';
import { userResource } from './custom-resources/user.resource';
import { GrantsModule } from 'src/grants/grants.module';
import { GrantsService } from 'src/grants/grants.service';
import { grantResource } from './custom-resources/grant.resource';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AdminService } from './admin.service';
import { RolesModule } from 'src/roles/roles.module';
import { AnimalsModule } from 'src/animals/animals.module';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from 'src/app.module';

AdminJS.registerAdapter({ Database, Resource: CustomResource });

//ResourceWithOptions

@Module({
  imports: [
    // forwardRef(() => GrantsModule),
    // ConfigModule,
    NestAdminModule.createAdminAsync({
      imports: [GrantsModule],
      useFactory: (grantsService: GrantsService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [userResource, Role, grantResource(grantsService)],
          branding: {},
          componentLoader: componentLoader,
        },
      }),
      inject: [GrantsService],
    }),
  ],
  // providers: [AdminService],
  // exports: [AdminService],
})
export class AdminModule {}
