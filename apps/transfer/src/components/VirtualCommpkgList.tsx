import React, { useEffect } from "react";
import { CommPkgCard } from "./CommPkgCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { HandoverPackage } from "@cc-components/handovershared";
import { Skeleton } from "@cc-components/sharedcomponents";

export type VirtualCommPkgCardsProps = {
  commPkgs: HandoverPackage[];
  selected: string | null;
  onClickCard: (value: string | null) => void;
  isLoading: boolean;
  setSelected: (value: string) => void;
  selectedPackages: string[]
}
export function VirtualCommPkgCards({ commPkgs, selected, onClickCard, setSelected, selectedPackages, isLoading }: VirtualCommPkgCardsProps) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: isLoading ? 15 : commPkgs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 170,
    paddingStart: 20,
    paddingEnd: 100,
  })

  useEffect(() => {
    if (selected && commPkgs) {
      rowVirtualizer.scrollToIndex(commPkgs.findIndex(s => s.commissioningPackageNo == selected), { align: "center", behavior: "smooth" })
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
              >
                <CommPkgCard onClick={() => onClickCard(isSelected ? null : virtualCommPkg.commissioningPackageNo)} isHighlighted={isSelected} commPkg={virtualCommPkg} setSelected={setSelected} isChecked={selectedPackages.includes(virtualCommPkg.commissioningPackageNo)} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
