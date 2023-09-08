import styled from 'styled-components';
import { useSelectionContext } from '../../providers/selectionProvider';
import { Color } from 'three';

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

export const TestPanel = ({ setTags }: { setTags: (tags: string[]) => void }) => {
  const { selectNodesByTags, selectNodesByTagColor, toggleOrbit } = useSelectionContext();
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
            Set Selection
          </button>
          <button
            onClick={() => {
              setTags(['30L06200A', '30XV6200', '30L06200B']);
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
              toggleOrbit();
            }}
            style={{ height: '25px' }}
          >
            Orbit
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
