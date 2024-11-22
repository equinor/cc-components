import { Slider } from '@equinor/eds-core-react';
import { PersonPosition } from '@equinor/fusion-portal-react-utils';
import { useState } from 'react';
import styled from 'styled-components';
const Styles = {
  Wrapper: styled.div`
    padding: 2rem;
    padding-top: 0rem;
  `,
};

const outputFunction = (value: number) => {
  const date = new Date(value);
  const toDay = new Date();

  if (date.toLocaleDateString() === toDay.toLocaleDateString()) {
    return 'Today';
  }
  return date.toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

const getUnixTime = (iso: string | number | Date) => {
  return new Date(iso).getTime();
};

const sortByDate = (a: PersonPosition, b: PersonPosition) => {
  if (!a.appliesFrom) return -1;
  if (!b.appliesFrom) return 0;
  return new Date(a.appliesFrom).getTime() - new Date(b.appliesFrom).getTime();
};

export const TimeSlider = ({
  positions,
  onValueChange,
}: {
  positions?: PersonPosition[];
  onValueChange(value: number): void;
}) => {
  const firstPositionDate = positions?.sort(sortByDate)[0].appliesFrom;

  const [date, setDate] = useState(new Date());
  const lastDayOfCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  if (!firstPositionDate) {
    return null;
  }
  return (
    <Styles.Wrapper>
      <Slider
        value={getUnixTime(date.getTime())}
        min={getUnixTime(new Date(firstPositionDate).getTime() || 0)}
        max={lastDayOfCurrentYear.getTime()}
        onChange={(e, values) => {
          setDate(new Date(values[0]));
          onValueChange(values[0]);
        }}
        step={60 * 60 * 24 * 1000}
        outputFunction={outputFunction}
        aria-label="hidden active track"
        hideActiveTrack
      />
    </Styles.Wrapper>
  );
};
