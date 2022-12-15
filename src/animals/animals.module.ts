import { forwardRef, Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';

@Module({
  imports: [],
  providers: [AnimalsResolver, AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule {}
