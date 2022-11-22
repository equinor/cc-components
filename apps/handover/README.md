# Handover
Handover App monitors commissioning package progress in a project and presents the status visually. It is used to keep track of and plan handover from construction to commissioning, and commissioning to operations. By using the the App all stakeholders and project personnel are easily updated on commissioning status, and decisions are based on the same information.

The App consists of four main parts:
* A garden view
* A table view
* A PBI report
* A sidesheet per Handover item

## Data
The data is consumed from FAM/FAM Proxy API. A commissioning item has several links to other items, as seen when opening a sidesheet:
* Mechanical Completion
* Work order
* Unsigned tasks
* Unsigned actions
* Punch
* SWCR
* NCR
* Query

## Details

### Statuses (Garden)
The different background colors on each item in the garden view indicate different milestones:
* RFOC Sent/Accepted
* TAC Sent/Accepted
* RFRC Sent/Accepted
* RFCC Sent/Accepted
* DCC Sent/Accepted
* OS

A garden item will have several symbols that give information regarding the commissioning package:
* Volume: 1, 2 or 3 bars indicate if package volume is low, medium or large (based on amount of tags connecting to the commissioning package)
* Unsigned Action: Will show when the commissioning package has unsigned actions
* MC status: The package's mechanical status (OS, PB, PA, OK)
* Commissioning status: The package's commissioning status (OS, PB, PA, OK)


### Grouping data (garden)
It is possible to group the data based on different attributes. It is also possible to switch between using the Forecast (preferred date to use, more accurate than planned because it is updated frequently) and Planned dates, and also showing the dates in a weekly or daily format.
Grouping the dataset can sometimes be achieved by just using the attribute that is received from the API (e.g. "Responsible", "Area", "Phase"), but several of them need to be resolved based on dates and statuses (e.g. "RFCC", "RFOC" and "DCC").


### Sorting (garden)
When the dataset from the API is received, the array of commissioning packages will be sorted based on their statuses: RFOC/TAC/RFCC/RFRC/OS. Visually this means packages with status "OS" will be placed first in the column, and then DCC, RFRC, RFCC, TAC & RFOC.
Sorting the columns will be based on dates when the current grouping is using dates, and other sorting logic may be used depending on the grouping logic.


## Glossary
* RFOC - Ready for operation certificate
* RFCC - Ready for commissioning certificate
* RFRC - Ready for ..
* TAC - Technical acceptance (record) certificate
* DCC - 
* OS - Outstanding
* OK
* PA - Punch list (A)
* PB - Punch list (B)