declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"docs": {
"applications/handover.md": {
  id: "applications/handover.md",
  slug: "applications/handover",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"applications/mechanical-completion.md": {
  id: "applications/mechanical-completion.md",
  slug: "applications/mechanical-completion",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"applications/workorder.md": {
  id: "applications/workorder.md",
  slug: "applications/workorder",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"development/creating-an-app.md": {
  id: "development/creating-an-app.md",
  slug: "development/creating-an-app",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"development/getting-started.md": {
  id: "development/getting-started.md",
  slug: "development/getting-started",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"introduction.md": {
  id: "introduction.md",
  slug: "introduction",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
"overview/structure.md": {
  id: "overview/structure.md",
  slug: "overview/structure",
  body: string,
  collection: "docs",
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
