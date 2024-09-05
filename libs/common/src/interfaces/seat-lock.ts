
export interface SeatLock {
  cartId: string;
  seasonTicketId: string;
  ticketId: string;
  matchId: string;
  isGroupTicket: boolean;
  stadiumId: string;
  grandstandId: string;
  quantity: number;
  price: number;
  seat: any;
  isSpecialSeat: boolean;
  keyClub: string;
  eventName: string
}

export interface UnSeatLock {
  ticketTemporaryId: string;
  cartId: string;
  keyClub: string;
  eventName: string
}

