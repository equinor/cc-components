import { Accordion } from '@equinor/eds-core-react'

export type AccordionSectionProps = {
  header: string;
  description: string;
}
export const AccordionSection = ({ header, description }: AccordionSectionProps) => (
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.HeaderTitle>
        {header}
      </Accordion.HeaderTitle>
    </Accordion.Header>
    <Accordion.Panel>{description}</Accordion.Panel>
  </Accordion.Item>
)
