import type { JoinFieldServerComponent } from 'payload'

import './index.scss'

const TYPE_LABELS: Record<string, string> = {
  'limited-by-shares': 'Limited by Shares',
  'non-residents': 'Non-Residents',
  'limited-liability-partnership': 'Limited Liability Partnership',
  'limited-by-guarantee': 'Limited by Guarantee',
  other: 'Other',
}

const baseClass = 'used-in-packages'

// Read-only replacement for the join field's default table (drops its "Columns"
// control). Queries the packages linked to this product; the list-view cell stays native.
export const UsedInPackagesField: JoinFieldServerComponent = async ({ id, payload, req, field }) => {
  const label = typeof field?.label === 'string' && field.label ? field.label : 'Used in packages'
  const description =
    typeof field?.admin?.description === 'string' ? field.admin.description : undefined

  const packages =
    id == null
      ? []
      : (
          await payload.find({
            collection: 'packages',
            depth: 0,
            limit: 200,
            sort: 'order',
            where: { 'products.product': { equals: id } },
            select: { name: true, packageType: true },
            req,
          })
        ).docs

  return (
    <div className={`field-type ${baseClass}`}>
      <div className="field-label">{label}</div>
      {packages.length === 0 ? (
        <p className={`${baseClass}__empty`}>
          {id == null
            ? 'Save this product to see which packages use it.'
            : 'Not used in any package yet.'}
        </p>
      ) : (
        <table className={`${baseClass}__table`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company Type</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td>
                  <a href={`/admin/collections/packages/${pkg.id}`}>{pkg.name}</a>
                </td>
                <td>{TYPE_LABELS[pkg.packageType] ?? pkg.packageType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {description ? <div className="field-description">{description}</div> : null}
    </div>
  )
}

export default UsedInPackagesField
