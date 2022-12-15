import { ResourceWithOptions } from 'adminjs';
import { Grant } from 'src/grants/entities/grant.entity';
import { GrantsService } from 'src/grants/grants.service';

export const grantResource = (
  grantsService: GrantsService,
): ResourceWithOptions => ({
  resource: Grant,
  options: {
    actions: {
      new: {
        after: async (response, request, context) => {
          const { record, _admin } = context;
          if (request.method === 'post' && record.isValid()) {
            grantsService.refreshGrants();
          }
          return response;
        },
      },
      edit: {
        after: async (response, request, context) => {
          const { record, _admin } = context;
          if (request.method === 'post' && record.isValid()) {
            grantsService.refreshGrants();
          }
          return response;
        },
      },
    },
  },
});
