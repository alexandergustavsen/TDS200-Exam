export default interface IRoom {
  id?: string;
  title: string;
  description: string;
  name: string;
  floor: number;
  capacity: number;
  owner: string;
  date: number;
  isAvailable: boolean;
  bookedBy: string;
  imageUrl: string;
  location: string;
  average: number;
}