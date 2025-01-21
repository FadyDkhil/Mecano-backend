import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import { Rate } from "../../domain/aggregates/Rate";
import { RateRepository } from "../../domain/repositories/RateRepository";


export interface RateUserInput {
    userId: string;
    mechanicId: string;
    rateNumber: number;
}

@injectable()
export class RateUser implements Usecase<RateUserInput, Rate> {
    constructor(
        @inject(Identifiers.rateRepository)
        private readonly rateRepository: RateRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request: RateUserInput): Promise<Rate> {
        const {userId, mechanicId, rateNumber } = request;
        const rate = Rate.create({
            userId, 
            mechanicId, 
            rateNumber
        });
        await this.rateRepository.save(rate);
        await this.eventDispatcher.dispatch(rate);
        return rate;
    }
}