import { Autocomplete, TextField, Button, Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { useState } from 'react';

Icon.add({ close });

export const DisciplineGuesstimate = () => {
  const [totalEntities, setTotalEntities] = useState([Math.random()]);
  return (
    <>
      {totalEntities.map((x, i) => (
        <div
          key={x}
          style={{
            display: 'flex',
            flex: 'flex-grow',
            gap: '1em',
            flexDirection: 'row',
          }}
        >
          <Autocomplete
            options={['Dis 1', 'Disc 2', 'Disc 3']}
            label="Disciplines"
            id="disciplines"
            defaultValue="Disc default"
          ></Autocomplete>

          <TextField label="Guesstimate Mhrs" id="guesstimates" type="number"></TextField>
          <Icon
            size={24}
            name={close.name}
            cursor="pointer"
            onClick={() =>
              setTotalEntities((y) => y.filter((value, index) => value !== x))
            }
          ></Icon>
        </div>
      ))}
      <Button onClick={() => setTotalEntities((y) => [...y, Math.random()])}>Add!</Button>
    </>
  );
};
