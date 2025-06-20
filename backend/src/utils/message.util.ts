import { IMessage } from 'src/common/interfaces';

export const messageUtil = {
  SUCCESS: {
    DELETED: (resource: string): IMessage => ({
      message: `${resource} has been successfully deleted`,
    }),
  },
  EXCEPTION: {
    NOT_FOUND: (resource: string): string => `${resource} was not found`,
    EXPIRED: (url: string): string => `URL:"${url}" is expired`,
  },
};
