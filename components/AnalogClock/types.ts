type ClockTime = {
    hours: number;
    minutes: number;
    seconds: number;
  };
  
  type ClockHands = {
    hourX: number;
    hourY: number;
    minuteX: number;
    minuteY: number;
    secondX: number;
    secondY: number;
  };
  
  type Marker = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

  export { ClockTime, ClockHands, Marker };