import { IMessage } from 'common/interfaces';

export const messageUtil = {
  SUCCESS: {
    DELETED: (resource: string): IMessage => ({
      message: `${resource} has been successfully deleted`,
    }),
  },
  EXCEPTION: {
    NOT_FOUND: (resource: string): string => `${resource} was not found`,
    EXPIRED: (url: string): string => `Short "${url}" expired`,
  },
};
