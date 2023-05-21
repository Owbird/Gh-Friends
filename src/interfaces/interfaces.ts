export interface INodeEvent {
  pointer: IPointer;
  event: Event;
  nodes?: number[] | null;
  edges?: string[] | null;
}
export interface IPointer {
  DOM: IDOMOrCanvasOrCenter;
  canvas: IDOMOrCanvasOrCenter;
}
export interface IDOMOrCanvasOrCenter {
  x: number;
  y: number;
}
export interface IEvent {
  pointers?: IPointersEntityOrChangedPointersEntityOrSrcEvent[] | null;
  changedPointers?: IPointersEntityOrChangedPointersEntityOrSrcEvent[] | null;
  pointerType: string;
  srcEvent: IPointersEntityOrChangedPointersEntityOrSrcEvent;
  isFirst: boolean;
  isFinal: boolean;
  eventType: number;
  center: IDOMOrCanvasOrCenter;
  timeStamp: number;
  deltaTime: number;
  angle: number;
  distance: number;
  deltaX: number;
  deltaY: number;
  offsetDirection: number;
  overallVelocityX: number;
  overallVelocityY: number;
  overallVelocity: number;
  scale: number;
  rotation: number;
  maxPointers: number;
  velocity: number;
  velocityX: number;
  velocityY: number;
  direction: number;
  target: ITarget;
  type: string;
  tapCount: number;
}
export interface IPointersEntityOrChangedPointersEntityOrSrcEvent {
  isTrusted: boolean;
}
export interface ITarget {}

export interface IEdge {
  from: number;
  to: number;
  color: string;
  title: string;
}

export interface INode {
  id: number;
  label: string;
  color: string;
  title: string;
}

export interface INetwork {
  user: IUser;
  following: IUser[];
  followers: IUser[];
}

export interface IUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: null;
  blog: string;
  location?: null;
  email?: null;
  hireable?: null;
  bio?: null;
  twitter_username?: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
