import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { ReactElement, useState } from 'react';

interface DumpsterFireDialogProps {
  title?: string;
  text: string;
  buttons?: ReactElement[];
}

export function DumpsterFireDialog({
  text,
  title = 'Ooops, this is embarassing..',
  buttons,
}: DumpsterFireDialogProps): ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog style={{ width: '600px' }} open={isOpen} isDismissable={true}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Typography variant="body_short">{text}</Typography>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <>
          {buttons?.map((comp, i) => {
            const Component = () => comp;
            return <Component key={i} />;
          })}
        </>
        <Button onClick={() => setIsOpen(false)}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
