import { Autocomplete, Button, Checkbox, TextField } from '@equinor/eds-core-react';
import { useContextId, useHttpClient } from '@cc-components/shared';
import { SidesheetWrapper, createWidget } from '@cc-components/shared/sidesheet';
import { useForm } from 'react-hook-form';

import {
  SidesheetHeader,
  StyledSideSheetContainer,
} from '@cc-components/sharedcomponents';
import { useMutation } from '@tanstack/react-query';
import {
  StyledFormContent,
  StyledFormSection,
  StyledFormSubcontent,
  StyledFormWrapper,
  StyledLineSeparator,
} from './createSidesheet.styles';
import { DisciplineGuesstimate } from './DisciplineGuesstimateItem';

type FormData = {
  title: string;
  changeOrigin: string;
  originId: string;
  description: string;
  facility: string;
  project: string;
  areaCodes: string[];
  commissioningPackageNumbers: string[];
  disciplineGuesstimates: string[];
  documentNumbers: string[];
  mcPackageNumbers: string[];
  punchListItemIds: string[];
  systemIds: string[];
  tagNumbers: string[];
  workflowId: string;
  phaseId: string;
};

export const CreateScopeChangeSidesheet = createWidget<undefined>((props) => {
  return <CreateSidesheet close={props.props.closeSidesheet} />;
}).Component;

const CreateSidesheet = (props: { close: VoidFunction }) => {
  const client = useHttpClient();

  const contextId = useContextId();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      facility: 'JCA',
      project: 'L.O532C.002',
      areaCodes: [],
      commissioningPackageNumbers: [],
      disciplineGuesstimates: [],
      documentNumbers: [],
      mcPackageNumbers: [],
      punchListItemIds: [],
      systemIds: [],
      tagNumbers: [],
      workflowId: '5303a90b-44b3-4463-d7a5-08dbd48acb6d',
      phaseId: '60fdc8e5-6aed-4246-3fe7-08dbd06eba37',
    },
  });
  const onSubmit = handleSubmit((data) => mutation.mutateAsync(data));
  // TODO: Hent ut project og facility i fra backend

  const mutation = useMutation<Response, unknown, FormData>({
    mutationFn: async (args) => {
      const res = await client.fetch(`/api/scope-change-requests/`, {
        headers: {
          'x-fusion-context-id': contextId,
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(args),
      });
      if (!res.ok) {
        alert('Unable to make');
      }
      alert('Successfully created!');
      return res.json();
    },
  });

  return (
    <SidesheetWrapper closeSidesheet={props.close}>
      <StyledSideSheetContainer>
        <SidesheetHeader
          title={'Create new SCR!'}
          applicationTitle={'Scope Change Request'}
          onClose={props.close}
        />
        <form onSubmit={onSubmit}>
          <StyledFormWrapper>
            <StyledFormSection>
              <h3>Request</h3>
              <StyledFormContent>
                <TextField label="Title(Required)" id="txtTitle" {...register('title')} />
                <StyledFormSubcontent>
                  <Autocomplete
                    options={[null, 'NCR', 'Punch', 'Query', 'Not Applicable', 'DCR']}
                    label="Change Origin"
                    id="changeOrigin"
                    {...register('changeOrigin')}
                  ></Autocomplete>
                  <Autocomplete
                    options={['ORIGIN 1', 'ORIGIN 2', 'ORIGIN 3']}
                    label="Origin ID"
                    id="originId"
                    {...register('originId')}
                  ></Autocomplete>
                </StyledFormSubcontent>
                <TextField
                  label="Description(Required)"
                  id="description"
                  multiline
                  {...register('description')}
                />
                <Checkbox label="Potential Warranty Case" />
                <h3>Disciplines and guesstimates</h3>
                <StyledFormContent>
                  <Checkbox label="Potential ATS scope" />
                  <DisciplineGuesstimate />
                  <TextField label="Material note" id="txtMats" multiline />
                </StyledFormContent>
              </StyledFormContent>
            </StyledFormSection>
            <StyledFormSection>
              <h3>References</h3>
              <Autocomplete
                options={[
                  'document',
                  'area',
                  'commpkg',
                  'tag',
                  'system',
                  'punch',
                  'mcpkg',
                  null,
                ]}
                label="Reference type"
                id="cmbRefTypes"
              ></Autocomplete>
            </StyledFormSection>
          </StyledFormWrapper>
          <StyledLineSeparator>
            <Button
              type="submit"
              style={{ float: 'right' }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Creating...' : 'Create'}
            </Button>
          </StyledLineSeparator>
        </form>
      </StyledSideSheetContainer>
    </SidesheetWrapper>
  );
};
