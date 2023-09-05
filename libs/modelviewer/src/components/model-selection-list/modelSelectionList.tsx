import { Radio } from '@equinor/eds-core-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModelContext } from '../../providers/modelsProvider';

interface ModelSelectionListProps {
  onModelSelect: (id: number) => void;
}

const ModelSelectionList: React.FC<ModelSelectionListProps> = ({ onModelSelect }) => {
  const [selectedModelId, setSelectedModelId] = useState<number>(-1);
  const { models, currenModelMeta } = useModelContext();

  useEffect(() => {
    if (currenModelMeta) {
      setSelectedModelId(currenModelMeta.id);
    }
  }, [currenModelMeta]);

  return (
    <UnstyledList>
      {models!.map((model) => (
        <li key={model.id}>
          <Radio
            label={model.platformSectionLabel}
            name="models"
            value={model.id}
            checked={selectedModelId === model.id}
            onChange={(e) => {
              const newModelId = Number(e.target.value);
              setSelectedModelId(newModelId);
              onModelSelect(newModelId);
            }}
          />
        </li>
      ))}
    </UnstyledList>
  );
};

export default ModelSelectionList;

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
