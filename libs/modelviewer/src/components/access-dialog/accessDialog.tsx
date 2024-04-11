import { Button, Dialog } from '@equinor/eds-core-react';
import { usePlantContext } from '../../providers/plantProvider';

type AccessDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export const AccessDialog = (props: AccessDialogProps): JSX.Element => {
  const { isOpen, onCancel } = props;

  const { currentPlant } = usePlantContext();

  return (
    <Dialog open={isOpen} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>No access</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <p>You don't have access to any 3D Models for this plant.</p>
        <p>
          Request access in <b>Access IT</b> to apply for access. <br />
          Search for <b>Echo {' ' + currentPlant.projectDescription}</b>
        </p>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={onCancel}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AccessDialog;
