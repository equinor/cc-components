import styled from 'styled-components';
import { Color } from 'three';
import { useSelectionContext } from '../../providers/selectionProvider';
import { TagOverlay } from '../../types/overlayTags';

const mockedTagList = [
  '30L06200A',
  '30XV6200',
  '30L06200B',
  '30L06100B',
  '30XV6100',
  '30L06100A',
];
const mockedTagColorList = [
  { tag: '30L06200A', color: new Color('#fd4444') },
  { tag: '30XV6200', color: new Color('#fd4444') },
  { tag: '30L06200B', color: new Color('#fd4444') },
  { tag: '30L06100B', color: new Color('#44fd44') },
  { tag: '30XV6100', color: new Color('#44fd44') },
  { tag: '30XV6100', color: new Color('#44fd44') },
  { tag: '30L06100A', color: new Color('#44fd44') },
];

const mockedTagListNew = [
  '56L00024A',
  '56L00027A',
  '56L00028A',
  '56L00074A',
  '56L00598A',
  '56L00600A',
  '56L00602A',
  '56L00604A',
  '56L00606A',
  '56L00608A',
  '56L00610A',
  '56L00612A',
  '56L00612A',
  '56L00616A',
  '56L00618A',
  '56L00620A',
  '56L00622A',
  '56L00624A',
  '56L00626A',
  '56L00628A',
  '56L00630A',
  '56L00670A',
  '56L00672A',
  '56L00674A',
  '56L00676A',
  '56L00678A',
  '56L00028A',
];

export const TestPanel = () => {
  const { selectNodesByTagColor, setTags } = useSelectionContext();

  return (
    <TestPanelWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          backgroundColor: '#ffffff',
        }}
      >
        <p>Selection test</p>
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '1rem' }}>
          <button
            onClick={() => {
              selectNodesByTagColor(mockedTagColorList);
            }}
            style={{ height: '25px' }}
          >
            Set Selection with color
          </button>
          <button
            onClick={() => {
              setTags(mockedTagList, { color: '#c22ac5' });
            }}
            style={{ height: '25px' }}
          >
            Set Selection with tags
          </button>
          <button
            onClick={() => {
              setTags(mockedTagListNew, { color: '#ff0000' });
            }}
            style={{ height: '25px' }}
          >
            Set A
          </button>
          <button
            onClick={() => {
              setTags(['30L06100B', '30XV6100', '30L06100A']);
            }}
            style={{ height: '25px' }}
          >
            Set B
          </button>
          <button
            onClick={() => {
              setTags(mockedTagList);
            }}
            style={{ height: '25px' }}
          >
            Set all
          </button>
          <button
            onClick={() => {
              setTags([]);
            }}
            style={{ height: '25px' }}
          >
            Clear
          </button>
        </div>
      </div>
    </TestPanelWrapper>
  );
};

export const TestPanelWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 150px;
  width: 100%;
`;
