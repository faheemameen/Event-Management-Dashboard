export interface Event {
  _uuid: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  venue: string;
  description: string;
  headerImage: string | File;
}
