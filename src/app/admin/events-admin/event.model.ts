export interface Event {
  name: string;
  date: Date;
  id?: string;
  image?: string;
  description: string;
  attendees?: number;
  imageUrl: string;
}
