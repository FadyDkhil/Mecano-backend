import { Rate } from "../aggregates/Rate";

export interface RateRepository {
    save(rate: Rate): Promise<void>;
}