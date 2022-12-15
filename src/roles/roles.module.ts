import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { AnimalsModule } from 'src/animals/animals.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Role])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
