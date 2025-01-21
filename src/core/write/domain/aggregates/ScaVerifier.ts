import { v4 } from 'uuid';
import { ScaErrors } from '../errors/ScaErrors';
import {AggregateRoot} from "ddd";

export interface ScaVerifierProperties {
    id: string;
    tenant?: string;
    phone?: string;
    completedAt: Date;
    code?: string;
    contextId: string;
}

export class ScaVerifier extends AggregateRoot<ScaVerifierProperties> {

    static restore(props: ScaVerifierProperties) {
        return new ScaVerifier(props);
    }

    static generate(props: { phone: string; contextId: string, tenant: string}) {
        const sca = new ScaVerifier({
            id: v4(),
            completedAt: null,
            phone: props.phone,
            contextId: props.contextId,
            tenant: props.tenant
        });
        return sca;
    }

    complete() {
        if (this.props.completedAt) {
            throw new ScaErrors.OtpInvalid();
        }
        this.props.completedAt = new Date();
    }
}