import { ResourceWithOptions } from 'adminjs';
import { User } from 'src/users/entities/user.entity';
import {
  after,
  injectManyToManySupport,
  manyToManyComponent,
} from '../hooks/many-to-many.hook';
import * as bcrypt from 'bcrypt';

const hash = (password: string) => {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
};

export const userResource: ResourceWithOptions = {
  resource: User,

  // features: [
  //   passwordsFeature({
  //     properties: { encryptedPassword: 'password' },
  //     hash: hash,
  //   }),
  // ],
  options: injectManyToManySupport(
    {
      actions: {
        new: {
          before: async (request) => {
            if (request.payload?.password) {
              const saltOrRounds = 10;
              request.payload.password = await bcrypt.hash(
                request.payload.password,
                saltOrRounds,
              );
            }
            return request;
          },
        },
        edit: {
          before: async (request, resource) => {
            if (request.method === 'post') {
              if (request.payload?.password) {
                if (
                  resource.record.params.password != request.payload.password
                ) {
                  const saltOrRounds = 10;
                  request.payload.password = await bcrypt.hash(
                    request.payload.password,
                    saltOrRounds,
                  );
                }
              } else {
                delete request.payload?.password;
              }
            }
            return request;
          },
        },
      },

      properties: {
        password: {
          isVisible: {
            list: false,
            show: true,
            filter: false,
            edit: true,
          },
        },
      },

      // sort: { sortBy: 'id', direction: 'asc' },
    },
    [{ propertyName: 'roles', modelClassName: 'Role' }],
  ),
};
