import { ContextItem } from '@equinor/fusion-framework-module-context';

const CONTEXT_TYPE_TO_ROUTE_MAP: Record<string, string> = {
  Facility: 'Facility',
  ProjectMaster: 'Project',
};

export function getContextTypeName(contextTypeId?: string | null) {
  return contextTypeId ? CONTEXT_TYPE_TO_ROUTE_MAP[contextTypeId] || '' : '';
}

export function getContextPageURL(context?: ContextItem | null) {
  if (!context) return `/`;

  if (location.pathname.includes('apps')) return `/${location.pathname}/${context.id}`;

  return `${getContextTypeName(context.type.id).toLowerCase()}/${context.id}`;
}
