import { SessionItem } from "../model/SessionItem";
import StockService from "./StockService";

export default class StockServiceImpl implements StockService {
    private baseUrl;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    async getSessionItems(identifier: string, identifierType: string, adjustmentMethod: string, includeExtended: string, period: string,
        precision: string, startTime: string, endTime: string): Promise<SessionItem[]> {
        let url = this.baseUrl;
        url+=`?Identifier=${identifier}.XNAS&IdentifierType=${identifierType}&AdjustmentMethod=${adjustmentMethod}&IncludeExtended=${includeExtended}&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}`
        const response = await fetch (url, {method: 'GET'});
        const sessions = await response.json();
        return sessions;
    
    
    }


    
}