import {
  IAppConfigurator,
  ComponentRenderArgs,
  makeComponent,
} from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useState } from 'react';
import { Button, CircularProgress } from '@equinor/eds-core-react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

/**
 * Facades the fusion-framework render setup, used in all apps
 * @param Comp Your app React.FC
 * @param configure Configure framework callback
 * @returns default export for app bundle
 */
export function createRender(
  Comp: React.FC,
  configure: (config: IAppConfigurator, c: ComponentRenderArgs) => Promise<void>,
  appName: string = 'unknown'
) {
  return (el: HTMLElement, args: ComponentRenderArgs) => {
    const connectionString = (args.env.config?.environment as { ai?: string })?.ai;

    const teardown = (() => {
      if (connectionString) {
        console.log('application insights enabled');
        const appInsights = new ApplicationInsights({
          config: {
            connectionString: connectionString,
            enableResponseHeaderTracking: true,
          },
        });
        appInsights.loadAppInsights();
        appInsights.trackPageView();
        appInsights.addTelemetryInitializer((envelope) => {
          (envelope.tags as any)['ai.cloud.role'] = appName;
          (envelope.tags as any)['ai.cloud.roleInstance'] = appName;
        });
        Object.assign(window, { ai: appInsights });
        return () => {
          console.log('Removing application insights');
          appInsights.unload();
        };
      }
    })();

    const possiblePrNumber = (args.env.config?.environment as any)?.pr;

    let cleanup = () => {};

    if (possiblePrNumber) {
      console.log(`creating pr ${possiblePrNumber}`);
      cleanup = createPrLabel(possiblePrNumber, el);
    }

    /** Create root from provided element */
    const root = createRoot(el);

    /** Make the app component
     * First argument is the main React component
     * Second argu is the the render args (framework and env variables)
     * Third argument is the configuration callback
     */
    const AppComponent = makeComponent(<Comp />, args, configure);

    root.render(<AppComponent />);

    /** Teardown */
    return () => {
      teardown && teardown();
      root.unmount();
      cleanup();
    };
  };
}

const queryClient = new QueryClient();
function createPrLabel(prNumber: string, el: HTMLElement): VoidFunction {
  const child = document.createElement('div');
  child.id = 'PR_LABEL';
  document.body.appendChild(child);

  const root = createRoot(child);
  root.render(
    <QueryClientProvider client={queryClient}>
      <PRLabel prNumber={prNumber} />
    </QueryClientProvider>
  );

  return () => {
    root.unmount();
    child.remove();
  };
}

function PRLabel({ prNumber }: { prNumber: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const { data, isLoading, error } = useQuery<PullRequest>(
    ['pulls', prNumber],
    async () => {
      const res = await fetch(
        `https://api.github.com/repos/equinor/cc-components/pulls/${prNumber}`,
        { headers: { ['Accept']: 'application/vnd.github+json' } }
      );
      if (!res.status) {
        throw new Error('Failed to load');
      }
      return await res.json();
    },
    { suspense: false, useErrorBoundary: false }
  );
  if (!isOpen) return null;
  if (isLoading) {
    return (
      <div>
        Loading...
        <CircularProgress size={48} />
      </div>
    );
  }

  if (error || !data) {
    return <div>Failed to load pr {prNumber}</div>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '48px',
        right: `${Math.round(window.innerWidth / 2)}px`,
        fontSize: '24px',
        border: '1px solid grey',
        background: 'orange',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        zIndex: 10,
        minWidth: '200px',
        maxWidth: '1000px',
      }}
    >
      <section style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {data.assignee && (
          <img height={'40px'} width={'40px'} src={data.assignee?.avatar_url} />
        )}

        {data.state === 'open' ? <OpenPR /> : <MergedPr />}
        <a href={`https://github.com/equinor/cc-components/pull/${prNumber}`}>
          {data.title} #{prNumber}
        </a>
        <Button variant="ghost_icon" onClick={() => setIsOpen(false)}>
          X
        </Button>
      </section>
    </div>
  );
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: User;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: any;
  merged_at: any;
  merge_commit_sha: string;
  assignee: Assignee | null;
  assignees: Assignee[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: Label[];
  milestone: any;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: Head;
  base: Base;
  _links: Links;
  author_association: string;
  auto_merge: any;
  active_lock_reason: any;
  merged: boolean;
  mergeable: boolean;
  rebaseable: boolean;
  mergeable_state: string;
  merged_by: any;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Assignee {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface Head {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repo;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: any[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Base {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repo;
}

export interface Links {
  self: Self;
  html: Html;
  issue: Issue;
  comments: Comments;
  review_comments: ReviewComments;
  review_comment: ReviewComment;
  commits: Commits;
  statuses: Statuses;
}

export interface Self {
  href: string;
}

type Html = Self;
type Issue = Self;
type Comments = Self;
type ReviewComments = Self;
type ReviewComment = Self;
type Commits = Self;
type Statuses = Self;

const OpenPR = () => (
  <svg
    fill="green"
    aria-label="Open Pull Request"
    viewBox="0 0 16 16"
    version="1.1"
    width="40px"
    height="40px"
    role="img"
  >
    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
  </svg>
);

const MergedPr = () => (
  <svg
    height="40px"
    width="40px"
    fill="purple"
    viewBox="0 0 16 16"
    version="1.1"
    aria-hidden="true"
  >
    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
  </svg>
);
