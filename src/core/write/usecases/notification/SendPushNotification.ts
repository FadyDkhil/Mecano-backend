import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DeviceRepository } from '../../domain/repositories/DeviceRepository';
import {Identifiers} from "../../../Identifiers";
import {UserRepository} from "../../domain/repositories/UserRepository";
import { Usecase } from 'ddd';
import { PushNotificationGateway } from '../../domain/gateway/PushNotificationGateway';

export interface SendPushNotificationInput {
    display?: {
        title: string;
        body: string;
    }
    data?: Record<string, string>;
    userId: string;
}

@injectable()
export class SendPushNotification implements Usecase<SendPushNotificationInput, void> {

    constructor(
        @inject(Identifiers.deviceRepository)
        private readonly _deviceRepository: DeviceRepository,
        @inject(Identifiers.pushNotificationGateway)
        private readonly _pushNotificationGateway: PushNotificationGateway,
        @inject(Identifiers.userRepository)
        private readonly _userRepository: UserRepository
    ) {
    }

    async execute(input: SendPushNotificationInput): Promise<void> {
       try {
            const {userId, display, data} = input;
            const devices = await this._deviceRepository.getById(userId);
            await this._pushNotificationGateway.send({
                display,
                data,
                registrationToken: devices.props.registrationToken
            });
        }catch (e) {
            console.log('firebase FCM issue ----------------------',e)
        }
    }
}