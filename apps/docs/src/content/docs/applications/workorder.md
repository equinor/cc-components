---
title: "Workorder"
description: "Documentation about workorder"
---
## General
The Work Order App visualises “live” work package status in a project/modification, based on ProCoSys input. The App presents some key information about the work orders and their progress.

The App consists of four main parts:
* A garden view
* A table view
* A PBI report
* A sidesheet per each Work order item

## Data
The data is consumed from FAM/FAM Proxy API. A work order item has several links to other items, as seen when opening a sidesheet:
* Material
* MCCR

## Details

### Grouping data (garden)
It is possible to group the data based on different properties. Grouping the dataset can sometimes be achieved by just using the properties that are received from the API (e.g. "Responsible", "Discipline", "Area"), but several of them need to be resolved based on dates and statuses (e.g. "Workorder production", "Hours ready for execution at site" and "Finalizing of workorder at site").
When grouping by "Workorder production", we will use a different way of sorting and resolving the different groups. 

* Workorder production - shows status for work order production, per week. This view shows work order production upstream construction/offshore with workorders sorted by planned installation start-up date. The purpose of this view is to see if work preparation manages to maintain progress and a buffer against contruction/offshore installation.

* Hours ready for execution at site - show available hours depending on job vard and material status, per wekk. This view shows construction status at site sorted by planned installation startu-up date and can be used to monitor week numbers (counting work hours from WOs with job card electronically available and material available at base/storage). NB: The number displayed for the current week is summarised by the current week's ready hours and the remaining unfinished hours from previous weeks' work orders.

* Finalizing of workorders at site - show status for work orders that are not closed, per week. This view shows work orders sorted by the scheduled finish date and can be used to monitor completion of work according to plan.

### Statuses (garden)
Each workorder will be given a background color according to work order progress, job status and material status. NB: When grouping by "Work order production", the status colour system is different. For every other grouping, we will use this logic:
* Is the work order's progress 100%? --> WO Finished
* Does the work order have material status = M12 || M13 || MN and does the work order have job status = W04 || W05 || W06 || W07 || W08 || W08 || W09 || W10 --> Material and WorkOrder OK
* Does the work order have material status = M7 || M9 || M11 || M12 || MN and does the work order have job status = W03 || W05 || W06 || W07 || W08 || W08 || W09 || W10 --> Material and WorkOrder Available
* If none above --> Material and/or Workorder not Available

When grouping by "Work order production" we will only look at the work order's job status (W01..W10). If job status is undefined for any reason, we will look at the W01..W01 actual dates, and if there are no actual dates, the work order will get "No Status".

A garden item will have several symbols that give information regarding the work order:
* Volume - indicates work order size depending on estimated manhours. The volume bar's size range are calculated automatically per project.
* Flag - Will appear on any work orders that have a hold status.
* Material status - OK (M10, M11, M12, MN), PA (M2, M3, M4), PB (M5, M6, M7, M9), OS (No status)
* MCCR status - OK (All MCCRs for tag scope linked to the WO is signed with status OK), PA (One er more tags linked to the WO have a critical punch that must be cleared before handover), PB (One or more tags linked to the WO have a non-critical punch that can be cleared after handover), OS

## Glossary
* WO - Work order
* MC - Mechanical completion
* MCCR - Mechanical completion check record
* W01 - WO prepared
* W02 - WO to MC
* W03 - MC docs prepared
* W04 - WO to field
* W05 - WO from field
* W06 - WO completed by MC
* W07 - WO cancelled
* W08 - WO sent Document Control (DC)
* W09 - As built completed
* W10 - WO sent to planning
* NS - No status
* MN - No material required
* M02 - Material linked to work order
* M03 - MTO linked to requisition
* M04 - Extra material
* M05 - Material in  contractor storage
* M06 - Material partly delivered warehouse
* M07 - Material fully delivered warehouse
* M09 - Material returned to warehouse
* M10 - Material requested to job site
* M11 - Material fully shipped to job site
* M12 - Material received on job site
* ENG - Engineering
* EWP - Engineering Work Package
* MAT - Material
* MATB - Material at base ready for shipment
* PRE - Prefab
* JLL - Job card on land
* OFF - Offshore