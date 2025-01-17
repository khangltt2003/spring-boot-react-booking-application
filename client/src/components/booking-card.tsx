import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip, Button } from "@material-tailwind/react";

export function BookingCard({ booking }) {
  return (
    <Card className="max-w-[24rem] overflow-hidden">
      <CardBody>
        <p>
          <strong>Confirmation Code:</strong> {booking.confirmationCode}
        </p>
        <p>
          <strong>Check-In:</strong> {new Date(booking.checkInTime).toLocaleString()}
        </p>
        <p>
          <strong>Check-Out:</strong> {new Date(booking.checkOutTime).toLocaleString()}
        </p>
        <p>
          <strong>Total Guests:</strong> {booking.numAdults + booking.numChildren}
        </p>
        <p>
          <strong>Room ID:</strong> {booking.room?.id || "N/A"}
        </p>
      </CardBody>
      <CardFooter className="pt-0">
        <Button size="lg" fullWidth={true}>
          Check In
        </Button>
      </CardFooter>
    </Card>
  );
}
