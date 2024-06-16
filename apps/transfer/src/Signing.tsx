import React, { useState } from "react"
import { StateProps } from "./main"
import { Button, CircularProgress, Icon, Typography } from "@equinor/eds-core-react"
import { tokens } from "@equinor/eds-tokens"
import { useMutation } from "@tanstack/react-query"

export type SigningProps = {
} & StateProps


const signers = [
  "Ola Nordmann",
  "Jørn Olafsen",
  "Børje Larsen",
  "Cathrine Iversen",
]

export function Signing(props: SigningProps) {
  const [signIndex, setsignIndex] = useState(0)
  const [signPending, setSignPending] = useState(false);

  const initiateSign = async () => {
    setSignPending(true)
    await new Promise((res) => {
      setTimeout(() => {
        setsignIndex(s => s + 1)
        res(false)
      }, 500)
    })
    setSignPending(false)
  }

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async () => {
      return new Promise((res) => setTimeout(() => res(true), 5000))
    }
  })

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid grey", width: "100%" }}>
      <Typography variant="h1_bold"><>{props.isCompleted && <Icon color={tokens.colors.interactive.primary__resting.hex} name="check_circle_outlined" />}</>Signing</Typography>
      <div style={{ height: "100%", width: "200px", alignItems: "center", display: "grid", alignContent: "center", justifyContent: "center", gridTemplateColumns: "1fr auto", gap: "5px", gridTemplateRows: "40px 40px 40px 40px" }}>
        {signers.map((s, i) => <>
          <Typography>{s}</Typography> {i < signIndex ? <Icon style={{width: "48px"}} name="check_circle_outlined" color={tokens.colors.interactive.primary__resting.hex} /> : <Button onClick={() => initiateSign()} disabled={!props.isActive || i > signIndex}>{(signPending && i == signIndex) ? <CircularProgress size={16} /> : "Sign"}</Button>}</>)}
      </div>
      {isPending && (
        <div style={{ display: "flex", flexDirection: "row", gap: "5px", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress size={32} />
          <Typography>Setting tag status to asbuilt in STID</Typography>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {isSuccess && (
          <div style={{ display: "flex", "alignItems": "center" }}>
            <Icon name="check_circle_outlined" color={tokens.colors.interactive.primary__resting.hex} />
            <Typography>Status updated to asbuilt in STID </Typography>
          </div>
        )}
        <Button disabled={!props.isActive || isPending || signIndex !== signers.length} onClick={async () => {
          await mutateAsync()
          props.next()
        }}>Continue </Button>
      </div>

    </div>
  )
}
