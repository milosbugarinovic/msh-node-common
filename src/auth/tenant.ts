const tenant = {
  getTenantId: (req: any): any => {
    if (req && 'personalTenantId' in req && req.personalTenantId) return req.personalTenantId
    return null
  },
}

export { tenant }
