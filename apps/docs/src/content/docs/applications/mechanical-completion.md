---
title: "Mechanical completion"
description: "Documentation about mechanical completion"
---

## General
MC Construction App monitors MC package progress in a project and presents the status visually. It is used to keep track of and plan handover from construction to MC, and MC to commissioning. By using the MC Construction App all stakeholders and project personnel are easily updated on MC status, and decisions are based on the same information.

The App consists of four main parts:
* A Garden view
* A Table view
* A PBI view
* A sidesheet per MC package

## Data
The data is consumed from FAM/FAM Proxy API. An MC item has several links to other items, as seen when opening a sidesheet:
* Workorders
* Punch
* NCR

## Details

### Grouping data (garden)
It is possible to group the data based on different properties. It is also possible to switch between using the Forecast (preferred date to use, more accurate than planned because it is updated frequently) and Planned dates, and also showing the dates in a weekly or daily format. Grouping the dataset can sometimes be achieved by just using the properties that are received from the API (e.g. "Responsible", "Area", "System"), but several of them need to be resolved based on dates and statuses (e.g. "M-01 Contractor final punch", "M-02 Punch Status Accepted"). 

### Statuses (garden)
Each MC will be given a background color to indicate the package's milestone:
* RFOC Accepted/Rejected/Sent
* TAC Accepted/Sent
* RFCC Accepted/Rejected/Sent
* Punch status accepted
* Contractor final punch
* OS

A garden item will have several symbols that give information regarding the MC:
* Volume - 1,2, or 3 bars indicate if package volume is low, medium or large (based on tagVolume).
* MC Status - the package MC status (OS, PB, PA, OK)
* Commissioning status - the package commissioning status (OS, PB, PA, OK)

### Sorting (garden)
When the dataset from the API is received, the array of MC packages will be sorted based on their statuses: RFOC/TAC/RFCC/Punch accepted/Final punch/OS. Visually this means that packages with the status "RFOC" will be placed first in the column,then "TAC", then "RFCC", then "Punch Status Accepted", then "Contractor Final Punch", and lastly "OS".

## Glossary
* MC - Mechanical Completion
* OS - Outstanding
* OK
* PA - Punch list (A)
* PB - Punch list (B)
* RFOC - Ready for operation certificate
* RFCC - Ready for commissioning certificate
* TAC - Technical acceptance (record) certificate