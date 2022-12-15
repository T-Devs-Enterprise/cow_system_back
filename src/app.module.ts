import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { roles } from './app.roles';
import { RolesService } from './roles/roles.service';
import { GrantsModule } from './grants/grants.module';
import { GrantsService } from './grants/grants.service';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    CommonModule,
    GrantsModule,
    // AccessControlModule.forRootAsync({
    //   imports: [GrantsModule],
    //   useFactory: async (grantsService: GrantsService) =>
    //     new RolesBuilder(await grantsService.findAllForAc()),
    //   inject: [GrantsService],
    // }),
    AccessControlModule.forRoles(new RolesBuilder()),
    RolesModule,
    UsersModule,
    AnimalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements OnModuleInit {
  constructor(private grantsService: GrantsService) {}
  onModuleInit() {
    this.grantsService.refreshGrants();
  }
}
