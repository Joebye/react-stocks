import moment from "moment"

   export const Apple1MonthBy1HourAllFields = {
        identifier: "AAPL",
        identifierType: "Symbol",
        adjustmentMethod: "All",
        includeExtended: "True",
        period: "1",
        precision: "Hour",
        startTime: moment(moment()).subtract(30, 'days').format("MM/DD/YYYY").concat('%2023:59'),
        endTime: moment().format("MM/DD/YYYY").concat('%2000:00')

    }



        
