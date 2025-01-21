import {AggregateRoot, Handle} from "../../../../packages/tools/ddd/src";
import { IdentityChecked } from "../../../../messages/events/IdentityChecked";
import {IdentityVerified} from "../../../../messages/events/IdentityVerified";
import { IdentityCheckUpdated } from "../../../../messages/events/IdentityCheckUpdated";

export interface IdentityCheckProperties {
    id: string;
    workflowId?: string;
    applicantId?: string;
    result?: string;
    startedAt?: Date;
    endedAt?: Date;
}

export class IdentityCheck extends AggregateRoot<IdentityCheckProperties> {
    static restore(props: IdentityCheckProperties) {
        return new IdentityCheck(props);
    }

    static create(payload:{
        userId:string;
        workflowId?:string;
        applicantId?:string;
        result?:string;
        endedAt?:Date
    }) {
        const {
            userId,
            workflowId,
            applicantId,
            result,
            endedAt
        } = payload;

        const identityCheck = new IdentityCheck({
            id: userId,
            workflowId,
            applicantId,
            result,
            endedAt
        })

        identityCheck.applyChange(
            new IdentityChecked({
                id: userId,
                workflowId,
                applicantId,
                result,
                endedAt
            })
        )
        return identityCheck
    }

    verify(result: string) {
        this.applyChange(
            new IdentityVerified({
                result: result,
            })
        )
    }

    updateWorkflowId(workflowId: string){
        this.applyChange(
            new IdentityCheckUpdated({
                workflowId
            })
        )
    }

    @Handle(IdentityCheckUpdated)
    private applyIdentityCheckWorkflowUpdated(event:IdentityCheckUpdated){
        this.props.workflowId = event.props.workflowId
    }

    @Handle(IdentityVerified)
    private applyIdentityVerified(event: IdentityVerified) {
        this.props.result = event.props.result;
        this.props.endedAt = new Date();
    }

    @Handle(IdentityChecked)
    private applyIdentityChecked(event:IdentityChecked):void {
        this.props.id = event.props.id
        this.props.workflowId = event.props.workflowId
        this.props.applicantId = event.props.applicantId
        this.props.result = event.props.result
        this.props.startedAt = event.props.startedAt
        this.props.endedAt = event.props.endedAt
    }
}
