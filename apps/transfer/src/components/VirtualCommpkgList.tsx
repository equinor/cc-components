import React, { useEffect } from "react";
import { CommPkgCard } from "./CommPkgCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { HandoverPackage } from "@cc-components/handovershared";

export type VirtualCommPkgCardsProps = {
  commPkgs: HandoverPackage[];
  selected: string | null;
  setSelected: (value: string | null) => void;
}
export function VirtualCommPkgCards({ commPkgs, selected, setSelected }: VirtualCommPkgCardsProps) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: commPkgs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    paddingStart: 40,
    paddingEnd: 40,
  })

  useEffect(() => {
    if (selected) {
      rowVirtualizer.scrollToIndex(commPkgs.findIndex(s => s.commissioningPackageNo == selected), { align: "center" })
    }
  }, [selected])
  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          overflow: 'auto'
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const virtualCommPkg = commPkgs[virtualItem.index]
            const isSelected = selected == virtualCommPkg.commissioningPackageNo
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => setSelected(isSelected ? null : virtualCommPkg.commissioningPackageNo)}
              >
                <CommPkgCard isSelected={isSelected} commPkg={virtualCommPkg} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
