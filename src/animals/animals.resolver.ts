import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  createAnimal(@Args('createAnimalInput') createAnimalInput: CreateAnimalInput) {
    return this.animalsService.create(createAnimalInput);
  }

  @Query(() => [Animal], { name: 'animals' })
  findAll() {
    return this.animalsService.findAll();
  }

  @Query(() => Animal, { name: 'animal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.animalsService.findOne(id);
  }

  @Mutation(() => Animal)
  updateAnimal(@Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput) {
    return this.animalsService.update(updateAnimalInput.id, updateAnimalInput);
  }

  @Mutation(() => Animal)
  removeAnimal(@Args('id', { type: () => Int }) id: number) {
    return this.animalsService.remove(id);
  }
}
