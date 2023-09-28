import { Icon } from '@equinor/eds-core-react';
import { warning_outlined } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  StyledCriticalLine,
  StyledPopover,
  StyledPopoverContainer,
} from './stylesCircuitDiagram';

export const CriticalLine = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <StyledCriticalLine onMouseOver={onOpen} onMouseLeave={onClose}>
      CL
      {isOpen && (
        <div>
          <StyledPopover>Heating Critical Line</StyledPopover>
        </div>
      )}
    </StyledCriticalLine>
  );
};

export const MissingCable = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Icon name={warning_outlined.name} onMouseOver={onOpen} onMouseLeave={onClose} />
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Missing a cable</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const SpaceHeaterIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g
          clip-path="url(#varme_svg__clip0_1814_4864)"
          stroke="#132634"
          stroke-width="3.3"
        >
          <path stroke-linecap="round" d="M1.65 28.684h52.7"></path>
          <path fill="#ffffff" d="M8.65 17.65h38.7v20.7H8.65z"></path>
          <path
            stroke-linecap="round"
            d="M18.15 17.984v20.033M27.55 17.984v20.033M37.451 17.984v20.033"
          ></path>
        </g>
        <defs>
          <clipPath id="varme_svg__clip0_1814_4864">
            <path fill="#fff" d="M0 0h56v56H0z"></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Heater</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const ElectricalOutletIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g clip-path="url(#stikk_svg__clip0_1861_4830)">
          <path
            d="M29.55 26.392V6.002H5.75c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75h20.3v16.89c-12.25.9-21.95 11.15-21.95 23.63h3.5c0-11.14 9.06-20.2 20.2-20.2 11.14 0 20.2 9.06 20.2 20.2h3.5c0-12.48-9.7-22.73-21.95-23.63z"
            fill="#243746"
          ></path>
        </g>
        <defs>
          <clipPath id="stikk_svg__clip0_1861_4830">
            <path
              fill="#fff"
              transform="translate(4 6.002)"
              d="M0 0h47.5v44.02H0z"
            ></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Electrical outlet</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const PanelIcon = ({ popoverText }: { popoverText: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g clip-path="url(#kont_p_svg__clip0_1807_4876)" fill="#243746">
          <path d="M52.5 12.502v30.27h-49v-30.27h49zm3.5-3.5H0v37.27h56V9.002z"></path>
          <path d="M27.17 21.932H8.98c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75h18.19c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75zM27.17 29.382H8.98c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75h18.19c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75zM27.17 36.842H8.98c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75h18.19c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75zM36.83 35.822c-1.39-.78-2.48-1.89-3.27-3.33-.78-1.44-1.18-3.09-1.18-4.95 0-1.86.39-3.52 1.18-4.95.78-1.44 1.87-2.55 3.27-3.33 1.4-.78 2.96-1.18 4.71-1.18 1.52 0 2.82.24 3.91.72a9.47 9.47 0 012.97 2.08.455.455 0 01.02.71l-1.73 1.73c-.1.1-.21.16-.31.16-.12 0-.24-.06-.34-.18-1.29-1.38-2.8-2.07-4.52-2.07-1.11 0-2.11.27-2.98.82-.87.55-1.55 1.31-2.03 2.27-.48.97-.72 2.04-.72 3.23s.24 2.26.72 3.23c.48.97 1.15 1.73 2.03 2.27.88.54 1.87.82 2.98.82 1.03 0 1.89-.17 2.57-.51.69-.34 1.28-.83 1.77-1.48.1-.14.23-.21.37-.21.1 0 .21.05.31.16l1.73 1.41c.16.1.24.23.24.37 0 .05-.03.12-.08.21a7.95 7.95 0 01-2.86 2.37c-1.13.55-2.47.82-4.04.82-1.74 0-3.31-.39-4.71-1.18l-.01-.01z"></path>
        </g>
        <defs>
          <clipPath id="kont_p_svg__clip0_1807_4876">
            <path fill="#fff" transform="translate(0 9.002)" d="M0 0h56v37.27H0z"></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>{popoverText}</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const MotorIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <path
          d="M52 28.002c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
          fill="#FFF"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28 48.502c11.322 0 20.5-9.178 20.5-20.5s-9.178-20.5-20.5-20.5-20.5 9.178-20.5 20.5 9.178 20.5 20.5 20.5zm0 3.5c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24z"
          fill="#243746"
        ></path>
        <path
          d="M17.418 39.202c-.195 0-.348-.053-.456-.16a.557.557 0 01-.163-.416V17.378c0-.17.054-.31.163-.416.108-.107.26-.16.456-.16h2.74c.325 0 .564.15.716.448l7.141 13.216 7.14-13.216c.153-.299.392-.448.718-.448h2.739c.391 0 .587.192.587.576v21.248c0 .384-.196.576-.587.576H35.71c-.196 0-.348-.053-.456-.16a.557.557 0 01-.163-.416V25.762l-5.413 9.824c-.152.299-.391.448-.717.448h-1.924a.692.692 0 01-.685-.448l-5.412-9.92v12.96c0 .17-.055.31-.163.416-.109.107-.261.16-.457.16h-2.902z"
          fill="#000"
        ></path>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Motor</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const SwitchIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g clip-path="url(#switch_svg__clip0_1860_4833)" fill="#243746">
          <path d="M18.28 33.822H4v3.5h15.88l13.95-16.02-2.64-2.3-12.91 14.82zM49.99 33.822H36.36v3.5h13.63c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75z"></path>
        </g>
        <defs>
          <clipPath id="switch_svg__clip0_1860_4833">
            <path
              fill="#fff"
              transform="translate(4 19.002)"
              d="M0 0h47.74v18.32H0z"
            ></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Switch</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const InstrumentIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g clip-path="url(#instr_svg__clip0_1862_4855)" fill="#243746">
          <path d="M28 7.43c11.344 0 20.571 9.229 20.571 20.572 0 11.344-9.227 20.572-20.571 20.572-11.344 0-20.571-9.228-20.571-20.572C7.429 16.66 16.656 7.431 28 7.431zm0-3.428c-13.254 0-24 10.746-24 24s10.746 24 24 24 24-10.746 24-24-10.746-24-24-24z"></path>
          <path d="M26.443 33.958c-.186 0-.323-.059-.411-.176-.088-.118-.137-.274-.137-.49v-18.23a.68.68 0 01.195-.51c.138-.137.314-.195.549-.195h3.536c.206 0 .373.068.5.195a.686.686 0 01.196.51V31.94c0 .392-.196.666-.588.813l-3.536 1.127-.314.078h.01zm-.549 6.926v-3.497c0-.49.236-.735.696-.735h3.497c.46 0 .696.245.696.735v3.497c0 .47-.235.695-.696.695H26.59c-.46 0-.695-.235-.695-.695z"></path>
        </g>
        <defs>
          <clipPath id="instr_svg__clip0_1862_4855">
            <path fill="#fff" transform="translate(4 4.002)" d="M0 0h48v48H0z"></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Instrument</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const TransformerIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 56 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <g clip-path="url(#tra_1f_svg__clip0_1817_4932)">
          <path
            d="M54.51 26.412h-4.3c-.73-8.08-7.3-14.41-15.3-14.41-2.48 0-4.82.62-6.89 1.7-2.08-1.08-4.41-1.7-6.89-1.7-8.02 0-14.59 6.33-15.32 14.41H1.49c-.83 0-1.49.67-1.49 1.49s.67 1.49 1.49 1.49h4.32c.73 8.08 7.3 14.41 15.3 14.41 2.48 0 4.82-.62 6.89-1.7 2.08 1.08 4.41 1.7 6.89 1.7 8 0 14.57-6.33 15.3-14.41h4.3c.83 0 1.49-.67 1.49-1.49s-.67-1.49-1.49-1.49h.02zm-33.39 14.41c-6.83 0-12.39-5.8-12.39-12.92s5.55-12.91 12.39-12.91c1.39 0 2.71.25 3.96.69-3.39 2.92-5.55 7.31-5.55 12.23 0 4.92 2.16 9.31 5.55 12.23-1.25.44-2.57.69-3.96.69v-.01zm12.39-12.92c0 4.46-2.18 8.4-5.49 10.73-3.31-2.32-5.49-6.26-5.49-10.73 0-4.47 2.18-8.4 5.49-10.73 3.31 2.32 5.49 6.26 5.49 10.73zm1.4 12.92c-1.39 0-2.71-.25-3.96-.69 3.39-2.92 5.55-7.31 5.55-12.23 0-4.92-2.16-9.31-5.55-12.23 1.25-.44 2.57-.69 3.96-.69 6.83 0 12.39 5.8 12.39 12.92s-5.56 12.92-12.39 12.92z"
            fill="#243746"
          ></path>
        </g>
        <defs>
          <clipPath id="tra_1f_svg__clip0_1817_4932">
            <path fill="#fff" transform="translate(0 12.002)" d="M0 0h56v31.81H0z"></path>
          </clipPath>
        </defs>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Transformer</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};

export const UnknownIcon = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <svg
        width="24px"
        height="21.6px"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: '0deg' }}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      >
        <circle
          cx="15"
          cy="15"
          r="14"
          stroke="#243746"
          stroke-width="2"
          fill="transparent"
        ></circle>
        <path
          d="M15.687 17.46c.2-.08.28-.22.28-.42v-1.52l.6-.2c1.32-.46 2.42-1.64 2.42-3.58 0-2.3-1.72-3.98-4.34-3.98-1.96 0-3.92 1.1-4.62 3.06-.08.22.02.38.24.46l1.38.58c.2.1.36.04.48-.2.48-.9 1.36-1.46 2.5-1.46 1.3 0 1.98.64 1.98 1.72 0 .86-.64 1.58-2.1 1.96l-.76.2c-.22.06-.32.2-.32.42v3.24c0 .26.16.4.42.3l1.84-.58zm-.14 4.54c.24 0 .36-.14.36-.36v-1.8c0-.24-.12-.38-.36-.38h-1.8c-.24 0-.36.14-.36.38v1.8c0 .22.12.36.36.36h1.8z"
          fill="#243746"
        ></path>
      </svg>
      {isOpen && (
        <StyledPopoverContainer>
          <StyledPopover>Unknown</StyledPopover>
        </StyledPopoverContainer>
      )}
    </>
  );
};
