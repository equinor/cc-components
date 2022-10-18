/**
 * This functions enforces parallel next to sign rules for current ranking.
 * There can be situations where same ranking has multiple next to Sign which in fact can NOT be signed in parallel.
 * If the signature breaks rules, it get filtered out of the nextsToSign array, and does not show as a option in the Next signature role filter.
 *
 * current rules enforced:
 *  -- Signatures starting with "SW" and contains "Tested" are NOT shown as "nextToSign" if there are other signatures starting with "SW" or "HMI" and contains "Prepared"
 *  -- Signatures starting with "HW" and contains "Tested" are NOT shown as "nextToSign" if there are other signatures starting with "HW" and contains "Prepared"
 *  -- caps might vary and should not effect rules.
 *
 */
export const nextToSignParallelRuleValidation = (
  nextToSign: string,
  index: number,
  nextSignatures: string[]
): boolean => {
  const nextToSignLower = nextToSign.toLocaleLowerCase();

  if (
    nextToSignLower.startsWith('sw') &&
    nextToSignLower.includes('tested') &&
    nextSignatures.filter((signature) => {
      const signatureToLower = signature.toLocaleLowerCase();
      return (
        (signatureToLower.startsWith('sw') || signatureToLower.startsWith('hmi')) &&
        signatureToLower.includes('prepared')
      );
    }).length
  )
    return false;

  if (
    nextToSignLower.startsWith('hw') &&
    nextToSignLower.includes('tested') &&
    nextSignatures.filter((signature) => {
      const signatureToLower = signature.toLocaleLowerCase();
      return signatureToLower.startsWith('hw') && signatureToLower.includes('prepared');
    }).length
  )
    return false;

  return true;
};
