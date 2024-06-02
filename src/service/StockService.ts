import { SessionItem } from "../model/SessionItem";

export default interface StockService {
    getSessionItems(identifier: string, identifierType: string, adjustmentMethod: string, includeExtended: string, period: string,
        precision: string, startTime: string, endTime: string): Promise<SessionItem[]>
}