import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AdminService } from 'src/common/admin/admin.service';
import { Repository } from 'typeorm';
import { CreateGrantInput } from './dto/create-grant.input';
import { UpdateGrantInput } from './dto/update-grant.input';
import { Grant } from './entities/grant.entity';

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grant) private grantsRepository: Repository<Grant>,
    @InjectRolesBuilder() private readonly rolesBuilder: RolesBuilder, // private readonly adminService: AdminService,
  ) {}
  create(createGrantInput: CreateGrantInput) {
    return 'This action adds a new grant';
  }

  async findAll() {
    const grants = await this.grantsRepository.find();

    return grants;
  }
  async refreshGrants() {
    const grants = await this.findAllForAc();
    console.log(
      '🚀 ~ file: grants.service.ts:27 ~ GrantsService ~ refreshGrants ~ grants',
      grants,
    );
    this.rolesBuilder.setGrants(grants);
  }

  async findAllForAc() {
    const grants = await this.findAll();
    const modifiedGrants = grants.map((grant) => ({
      ...grant,
      role: grant.role.id,
    }));
    return modifiedGrants;
  }

  findOne(id: number) {
    return `This action returns a #${id} grant`;
  }

  update(id: number, updateGrantInput: UpdateGrantInput) {
    return `This action updates a #${id} grant`;
  }

  remove(id: number) {
    return `This action removes a #${id} grant`;
  }
}
