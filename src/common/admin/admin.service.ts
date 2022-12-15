import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { GrantsService } from 'src/grants/grants.service';
@Injectable()
export class AdminService {
  constructor(
    @Inject(forwardRef(() => GrantsService))
    private grantsService: GrantsService,
  ) {}

  async refreshGrantsOnAdmin() {
    return this.grantsService.refreshGrants();
  }
}
