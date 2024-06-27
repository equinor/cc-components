import React, { useEffect } from "react";
import { CommPkgCard } from "./CommPkgCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { HandoverPackage } from "@cc-components/handovershared";
import { Skeleton } from "@cc-components/sharedcomponents";

export type VirtualCommPkgCardsProps = {
  commPkgs: HandoverPackage[];
  selected: string | null;
  setSelected: (value: string | null) => void;
  isLoading: boolean;
}
export function VirtualCommPkgCards({ commPkgs, selected, setSelected, isLoading }: VirtualCommPkgCardsProps) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: isLoading ? 15 : commPkgs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    paddingStart: 40,
    paddingEnd: 40,
  })

  useEffect(() => {
    if (selected && commPkgs) {
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
            if (isLoading) {
              return (<div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Skeleton width="100%" height="100%" />
              </div>)
            }
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
