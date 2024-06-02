import { useEffect, useState } from 'react';
import { SessionItem } from '../../model/SessionItem';
import { stockService } from '../../config/services-config';
import HeaderDataStock from '../cards/HeaderDataStock';
import moment from 'moment';
import { Apple1MonthBy1HourAllFields } from '../../config/stocks-config';
import Chart from '../charts/Chart';
import { Box, Button } from '@mui/material';
import { getRangedCloseData } from '../../util/chart-functions';

const { identifier, identifierType, adjustmentMethod, includeExtended, period, precision, startTime, endTime } = Apple1MonthBy1HourAllFields;

const OverviewChart: React.FC = () => {
    const [sessions, setSessions] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [daysArray, setDaysArray] = useState<any>([]);
    const [valuesArray, setValuesArray] = useState<any>([]);
    const rangeDays = moment(endTime, "MM/DD/YYYY").diff(moment(startTime, "MM/DD/YYYY"), 'days');
    const daysAmountArr = new Array(rangeDays).fill(0).map((_, ind) => ind + 1);
    const [actPeriod, setActPriod] = useState(rangeDays);

    useEffect(() => {
        const fetchSessionItems = async () => {
        const dataPayload = localStorage.getItem('sessions');
        if (dataPayload) {
            setSessions(JSON.parse(dataPayload));
            setLoading(false);
            setDaysArray(daysAmountArr);
            const startedData = getRangedCloseData(JSON.parse(dataPayload), daysAmountArr.length);
            setValuesArray(startedData)

        } 
             try {
const sessionsArray = await stockService.getSessionItems(identifier, identifierType,adjustmentMethod,includeExtended,
    period,precision,startTime,endTime);
                setSessions(sessionsArray);
                setLoading(false);
                setDaysArray(daysAmountArr);
                const startedData = getRangedCloseData(sessionsArray, daysAmountArr.length);
                setValuesArray(startedData)
                localStorage.setItem('sessions', JSON.stringify(sessionsArray));
            } catch (err) {
                console.error('Failed to fetch session items', err);
            }
         };
     fetchSessionItems();
        
        const interval = setInterval(fetchSessionItems, 30*60*1000);
        return () => clearInterval(interval);
    }, [identifier,
        identifierType,
        adjustmentMethod,
        includeExtended,
        period,
        precision,
        startTime,
        endTime]);


    if (loading) {
        return <div>Loading...</div>
    }


    const handlePeriodChange = (n: any) => {
        let actualSessionsFromLS = localStorage.getItem('sessions');
        let parsedActualSessionsFromLS = JSON.parse(actualSessionsFromLS!);
        let lastSessionDate = parsedActualSessionsFromLS[parsedActualSessionsFromLS.length - 1].EndDate;
        if (n == 30) {
            setActPriod(n);
            const avgVals = getRangedCloseData(parsedActualSessionsFromLS, n);
            setValuesArray(avgVals)
            setDaysArray(new Array(avgVals.length).fill(0).map((__, ind) => ind + 1));
        } else if (n == 7) {
            setActPriod(n);
            const dateWeekAgo = moment(lastSessionDate, "MM/DD/YYYY").subtract(7, 'days').format("MM/DD/YYYY");
            const closeVals = parsedActualSessionsFromLS.map((item: any) => ({
                date: moment(item.EndDate),
                close: item.Close
            }))
            let filteredSessionsBetween = closeVals.filter((data: any) => data.date.isBetween(dateWeekAgo, lastSessionDate, 'day', '[]'));
            const avgVals = getRangedCloseData(filteredSessionsBetween, n);
            setValuesArray(avgVals)
            setDaysArray(new Array(avgVals.length).fill(0).map((__, ind) => ind + 1));
         } else if (n == 1) {
            setActPriod(n);
            const vals = parsedActualSessionsFromLS.filter((item: any) => item.EndDate == lastSessionDate);
            const dayVals = vals.map((item: any) => item.Close);
            setValuesArray(dayVals);
            setDaysArray(new Array(dayVals.length).fill(0).map((__, ind) => ind + 1))

        }

 }


    return <Box>
        <HeaderDataStock identifier={identifier} currentPrice={sessions[sessions.length - 1].Close}
            priceChange={(sessions[sessions.length - 1].Close - sessions[sessions.length - 1].Open).toFixed(4)}
            percentChange={((sessions[sessions.length - 1].Close - sessions[sessions.length - 1].Open) / 100).toFixed(4)}
            lastUpdatedTimestamp={sessions[sessions.length - 1].Date} />
        <Chart days={daysArray} values={valuesArray} />
        <Box sx={{ml: '13vw' }}>
        <Button variant={actPeriod == 1 ? 'outlined' : 'text'} onClick={() => handlePeriodChange(1)}>1D</Button>
        <Button variant={actPeriod == 7 ? 'outlined' : 'text'} onClick={() => handlePeriodChange(7)}>1W</Button>
        <Button variant={actPeriod == 30 ? 'outlined' : 'text'} onClick={() => handlePeriodChange(30)}>1M</Button>
        </Box>
        
    </Box>

}

export default OverviewChart;


