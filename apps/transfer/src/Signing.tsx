import React, { useState } from "react"
import { StateProps } from "./main"
import { Famtag } from "./types"
import { Button, CircularProgress, Icon, Typography } from "@equinor/eds-core-react"
import { tokens } from "@equinor/eds-tokens"
import { useMutation } from "@tanstack/react-query"

export type SigningProps = {
} & StateProps


const signers = [
  "Atle Wee Førre",
  "Cato Dahl",
  "Gustav Eikaas"
]

export function Signing(props: SigningProps) {
  const [signIndex, setsignIndex] = useState(0)
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async () => {
      return new Promise((res) => setTimeout(() => res(true), 50))
    }
  })

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid grey", width: "100%" }}>
      <Typography variant="h1_bold">Signing</Typography>
      <div style={{ height: "100%", width: "200px", alignItems: "center", display: "grid", alignContent: "center", justifyContent: "center", gridTemplateColumns: "1fr auto" }}>
        {signers.map((s, i) => <>
          <Typography>{s}</Typography> {i < signIndex ? <Icon name="check_circle_outlined" color={tokens.colors.interactive.primary__resting.hex} /> : <Button onClick={() => setsignIndex(s => s + 1)} disabled={!props.isActive || i > signIndex}>Sign</Button>}</>)}
      </div>
      {isPending && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress size={32} />
          <Typography>Setting tag status to asbuilt in STID</Typography>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {isSuccess && (
          <>
            <Icon name="check_circle_outlined" color={tokens.colors.interactive.primary__resting.hex} />
            <Typography>Status updated to asbuilt in STID </Typography>
          </>
        )}
        <Button disabled={!props.isActive || isPending || signIndex !== signers.length} onClick={async () => {
          await mutateAsync()
          props.next()
        }}>Continue </Button>
      </div>

    </div>
  )
}
