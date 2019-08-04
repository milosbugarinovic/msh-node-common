import { http } from '../index'

const concurrentDataAccessHelper = {
  errorMessage: Object.freeze({
    concurrentDataAccess: (dbData?: any) => {
      const errMessage: any = {
        status: 412,
        message: {
          msg: 'Scheduler_DB-ERROR_Concurrent-Data-Access',
        },
      }

      if (dbData) {
        errMessage.message.refreshData = dbData
      }

      return errMessage
    },
    notFound: () => {
      return {
        status: 404,
        message: {
          msg: 'Scheduler_DB-ERROR_Not-Found',
        },
      }
    },
  }),
  // FIXME make better method for checking concurrent data access error
  checkForConcurrentDataAccessError: (userData: any, dbData: any): Error => {
    const uId = userData.id
    const dId = dbData.id
    const uUpdatedAt = userData.updatedAt
    const dUpdatedAt = dbData.updatedAt
    return uId && dId && uId === dId && uUpdatedAt && dUpdatedAt && uUpdatedAt !== dUpdatedAt
      ? new http.ClientSideError.PreconditionFailed('Scheduler_DB-ERROR_Concurrent-Data-Access')
      : new http.ClientSideError.NotFound('Scheduler_DB-ERROR_Not-Found')
  },
}
export { concurrentDataAccessHelper }
