const ormHelper = {
  unixNow: 'CAST((EXTRACT(EPOCH FROM NOW()) * 1000) AS BIGINT)',

  jsonGetter: (self, propertyName): any => {
    try {
      if (typeof self.getDataValue(propertyName) === 'string') {
        return JSON.parse(self.getDataValue(propertyName))
      }
      return self.getDataValue(propertyName)
    } catch (err) {
      return {}
    }
  },

  // FIXME return object instead of any
  baseModelOptions: (dbSchema: string): any => {
    return {
      schema: dbSchema,
      timestamps: true,
      updatedAt: 'updatedAt',
      createdAt: 'createdAt',
      underscoredAll: true,
      underscored: true,
      freezeTableName: true,
    }
  },
}

export { ormHelper }
