export const tagQuery = (commpkgNo: string, facility: string) => `
SELECT tag.tagNo,min(c.tagStatus) as worstStatus
FROM Completion.CompletionTag_v3 as tag
JOIN (
  SELECT
    sourceIdentity,
    tagId,
    CASE
      WHEN status='OS' THEN 0
      WHEN status='PA' THEN 1
      WHEN status='PB' THEN 2
      ELSE 3
    END as tagStatus
  FROM Completion.CompletionChecklist_v2
) as c ON c.tagId = tag.sourceIdentity
WHERE tag.commIssioningPackageNo = '${commpkgNo}' and tag.facility = '${facility}'
GROUP BY tag.tagNo
`

export const commpkgQuery = (facility: string) => `SELECT * FROM Completion.CommissioningPackage_v3 where facility = '${facility}'`;

