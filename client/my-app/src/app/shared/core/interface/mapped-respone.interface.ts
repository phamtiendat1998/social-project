import { ApiState } from '../enum/api-state.enum';
export interface MappedResponse {
    State: ApiState;
    Data?: any;
}
