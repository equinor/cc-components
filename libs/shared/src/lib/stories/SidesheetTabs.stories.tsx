import { NcrTab } from '../components';

export default {
  title: 'Sidesheet tabs',
};

export const Ncr = () => (
  <NcrTab
    error={null}
    isFetching={false}
    ncrs={[
      {
        documentId: '1',
        documentNumber: '123',
        title: 'One NCR',
      },
      {
        documentId: '2',
        documentNumber: '321',
        title: 'Two NCR',
      },
    ]}
  />
);

//TODO: Add the rest of the preconfigured tables under here
