import React from "react"
import { StateProps } from "./main"
import { Accordion, Button, Icon, Typography } from "@equinor/eds-core-react"
import { AccordionSection } from "./Accordion"
import { tokens } from "@equinor/eds-tokens"

type MaintenanceHistoryProps = {
} & StateProps

export function MaintenanceHistory(props: MaintenanceHistoryProps) {

  return (
    <div style={{ height: "100%", width: "100%", border: "2px solid grey", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant="h1_bold"><>{props.isCompleted && <Icon color={tokens.colors.interactive.primary__resting.hex} name="check_circle_outlined" />}</>Maintenance History</Typography>
      <Accordion>
        <AccordionSection header='ATEX inspection dates' description='ATEX inspection dates on a tag indicate the schedule for mandatory safety checks of equipment used in explosive atmospheres. These dates ensure compliance with the ATEX directive by verifying that the equipment maintains its integrity and protective features. Regular adherence to these dates is essential for the prevention of accidents in hazardous zones.' />
        <AccordionSection header='Insulation Resistance (IR) test results' description='Insulation Resistance (IR) test results on a tag provide a snapshot of the electrical insulations integrity between conductive parts. These values, measured in megohms, indicate the effectiveness of the insulation in preventing leakage currents and potential equipment failures. Regular IR testing is crucial for predictive maintenance and ensuring electrical safety standards are met.' />
        <AccordionSection header='Resistance Test results' description='Resistance Test results on a tag reflect the measured electrical resistance of components, such as grounding connections or continuity paths, ensuring they meet specified parameters. These results are critical for verifying that the electrical system can safely conduct current and maintain proper function. Regular testing helps to identify potential issues before they lead to equipment malfunction or safety hazards.' />
        <AccordionSection header='Pressure safety valve calibration' description='Pressure Safety Valve (PSV) calibration results on a tag confirm the valves set pressure and blowdown characteristics, ensuring it operates correctly to prevent overpressure conditions. These calibration records are vital for maintaining system safety and compliance with regulatory standards. Regular checks and recalibration are necessary to guarantee the valves reliability and protective performance.' />
        <AccordionSection header='SIF/SIL shutdown open/close times' description='SIF/SIL shutdown open/close times on a tag document the response times for Safety Instrumented Functions/Systems to reach a safe state, either by opening or closing. These timings are critical for validating that the system meets the Safety Integrity Level requirements, ensuring rapid protective actions during hazardous events. Regular verification of these times is essential for maintaining operational safety and system effectiveness.' />
      </Accordion>
      <Typography variant="body_long">
        Please confirm that the maintenance history for the tags has been handed over to operations.
      </Typography>
      <Button disabled={!props.isActive} onClick={() => {
        props.next()
      }}>Continue</Button>
    </div>

  )
}


