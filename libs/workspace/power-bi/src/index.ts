export * from './lib';
import { IReportEmbedConfiguration, models, Report, Embed } from 'powerbi-client';
import type { EventHandler } from 'powerbi-client-react';
type IBasicFilter = models.IBasicFilter;
export type { IReportEmbedConfiguration, IBasicFilter, Report, Embed, EventHandler };
