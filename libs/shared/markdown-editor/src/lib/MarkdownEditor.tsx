import { FC, PropsWithChildren, useCallback } from 'react';

import {
  BoldExtension,
  BulletListExtension,
  ItalicExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  HardBreakExtension,
} from 'remirror/extensions';
import {
  EditorComponent,
  Toolbar,
  Remirror,
  ThemeProvider,
  useRemirror,
  ToggleBoldButton,
  ToggleOrderedListButton,
  ToggleItalicButton,
  ToggleBulletListButton,
  useHelpers,
  OnChangeJSON,
} from '@remirror/react';

import type { CreateEditorStateProps } from 'remirror';
import type { RemirrorProps } from '@remirror/react';
import { theme } from './theme';
import { StyledContainer } from './editor.styles';

export type ReactEditorProps = Pick<CreateEditorStateProps, 'stringHandler'> &
  Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks'> & {
    placeholder?: string;
  };
export type MarkdownEditorProps = Partial<Omit<ReactEditorProps, 'stringHandler'>>;
/**
 * Markdown editor react component.
 * To access the editor's state and extract markdown, pass another react component as a child; use the helper React component
 * `OnChangeHelper`. You could also create your own react child component:
 * @example
 * ```tsx
 * const Input = ({ onChange }) => {
  const { getMarkdown } = useHelpers(true);

  return (
    <OnChangeJSON
      onChange={() => {
        onChange(getMarkdown());
      }}
    />
  );
};

const MyComponent = () => {
  const [value, setValue] = useState({description: ''});

  return (
    <MarkdownEditor>
      <Input onChange={(v) => setValue({description: v})}/>
    </MarkdownEditor>
  )
}
 * ```
 **/

export const MarkdownEditor: FC<PropsWithChildren<MarkdownEditorProps>> = ({
  placeholder,
  children,
  initialContent,
  ...rest
}) => {
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new BoldExtension(),
      new ItalicExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      new HardBreakExtension(),
    ],
    [placeholder]
  );

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  });

  return (
    <StyledContainer>
      <ThemeProvider theme={theme}>
        <Remirror manager={manager} initialContent={initialContent} {...rest}>
          <Toolbar>
            <ToggleBoldButton />
            <ToggleItalicButton />
            <ToggleOrderedListButton />
            <ToggleBulletListButton />
          </Toolbar>
          <EditorComponent />
          {children}
        </Remirror>
      </ThemeProvider>
    </StyledContainer>
  );
};

type OnChangeHelperProps = {
  onChange: (value: string) => void;
};

/**
 * Default MarkdownEditor child helper component. This component will extract markdown from the editor's state and
 * call `onChange` prop every time something changes.
 */
export const OnChangeHelper = ({ onChange }: OnChangeHelperProps) => {
  const { getMarkdown } = useHelpers(true);
  return <OnChangeJSON onChange={() => onChange(getMarkdown())} />;
};
