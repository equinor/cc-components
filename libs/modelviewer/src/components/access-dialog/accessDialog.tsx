import { Button, Dialog } from '@equinor/eds-core-react';
import { usePlantData } from '../../providers/plantDataProvider';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

export const AccessDialog = (props: Props): JSX.Element => {
  const { isOpen, onCancel } = props;

  const { plantData } = usePlantData();

  return (
    <Dialog open={isOpen} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>No access</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <p>You don't have access to any 3D Models for this plant.</p>
        <p>
          Request access in <b>Access IT</b> to apply for access. <br />
          Search for <b>Echo {' ' + plantData.projectDescription}</b>
        </p>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={onCancel}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AccessDialog;
