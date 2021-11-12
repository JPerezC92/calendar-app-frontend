export interface IReducer<Action, State = Record<string, unknown>> {
  (state: State, action: Action): State;
}
